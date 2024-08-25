import React, { useState, useMemo } from "react";
import { Column, DataGridProps, SortDirection } from "./types";
import SortIcon from "./SortIcon";
import ActionsDropdown from "./ActionDrowpdown";

function DataGrid<T extends Record<string, any>>({
  columns,
  rows,
  pageSize = 10,
  onEdit = () => {},
  onDelete = () => {},
  withCheckbox = false,
}: DataGridProps<T>) {
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<keyof T | "">("");
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const sortedRows = useMemo(() => {
    if (!sortField || sortDirection === null) return rows;
    return [...rows].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortField, sortDirection]);

  const paginatedRows = sortedRows.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection((prev) => {
        if (prev === "desc") return null;
        if (prev === "asc") return "desc";
        return "asc";
      });
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedRows(
        new Set(
          paginatedRows.map((_: any, index: number) => page * pageSize + index)
        )
      );
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const renderCell = (column: Column<T>, row: T, index: number) => {
    if (column.field === "actions") {
      return (
        <ActionsDropdown
          onDelete={() => onDelete(row.id)}
          onEdit={onEdit}
          rowId={`row-${row.id || index}`}
          row={row}
        />
      );
    }
    if (column.renderCell) {
      return column.renderCell(row[column.field], row, index);
    }
    return row[column.field];
  };

  const checkboxColumn: Column<T> = {
    field: "checkbox",
    headerName: "",
    width: 50,
    renderCell: (_: any, __: any, index: number) => (
      <input
        type="checkbox"
        checked={selectedRows.has(page * pageSize + index)}
        onChange={() => handleSelectRow(page * pageSize + index)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
    ),
  };

  const actionsColumn: Column<T> = {
    field: "actions",
    headerName: "Actions",
    width: 100,
  };

  const allColumns = [
    ...(withCheckbox ? [checkboxColumn] : []),

    ...columns,
    actionsColumn,
  ];

  return (
    <div className="overflow-x-auto pb-10 text-sm">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {allColumns.map((column) => (
              <th
                key={column.field as string}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b border-r"
                style={{ width: column.width }}
              >
                {column.field === "checkbox" ? (
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.size === paginatedRows.length}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">{column.headerName}</span>
                    {column.field !== "rowNumber" &&
                      column.field !== "actions" && (
                        <button
                          onClick={() => handleSort(column.field as keyof T)}
                          className="p-1 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                          <SortIcon
                            direction={
                              sortField === column.field ? sortDirection : null
                            }
                          />
                        </button>
                      )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row: T, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              {allColumns.map((column) => (
                <td
                  key={column.field as string}
                  className="px-4 py-2 whitespace-nowrap border-b border-r"
                >
                  {renderCell(column, row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {page * pageSize + 1} to{" "}
          {Math.min((page + 1) * pageSize, rows.length)} of {rows.length}{" "}
          entries
        </div>
        <div>
          <button
            className="px-4 py-2 border rounded mr-2"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 border rounded"
            onClick={() =>
              setPage((p) =>
                Math.min(Math.ceil(rows.length / pageSize) - 1, p + 1)
              )
            }
            disabled={(page + 1) * pageSize >= rows.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataGrid;
