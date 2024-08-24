import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/productApi";
import { TrendingUp } from "lucide-react";

import React from "react";
import { Pie, ResponsiveContainer, PieChart, Cell } from "recharts";

const colors = ["#00C49F", "#0088FE", "#FFBB28"];
type ExpenseSummery = {
  [category: string]: number;
};

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = dashboardMetrics?.expenseSummary?.length > 0 ? dashboardMetrics.expenseSummary[0] : null;

  const expenseByCategorySummary =
    dashboardMetrics?.expenseByCategorySummary || [];

  const expenseSum = expenseByCategorySummary.reduce(
    (acc: ExpenseSummery, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const expenseCategories = Object.entries(expenseSum).map(([name, value]) => ({
    name,
    value,
  }));

  const totalExpenses = expenseCategories.reduce(
    (acc, curr: { value: number }) => acc + curr.value,
    0
  );

  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      ></Cell>
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                  ${formattedTotalExpenses}
                </span>
              </div>
            </div>
            {/* LABELS */}
            <ul className="flex flex-col justify-around items-center xl:items-center py-5 gap3">
              {expenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p>
                    Average: {""}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                 <span className="flex items-center mt-2">
                    <TrendingUp className="mr-2 text-green-500">30%</TrendingUp>
                 </span>
                <div />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
