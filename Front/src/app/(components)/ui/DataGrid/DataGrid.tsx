import React, { useState, useMemo, useEffect, useCallback } from "react";
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
  onSelectionChange = (selectedIds: (string | number)[]) => {},
}: DataGridProps<T>) {
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<keyof T | "">("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortField) return rows;

    return [...rows].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      if (
        sortField === "price" &&
        typeof aValue === "string" &&
        typeof bValue === "string"
      ) {
        const aPrice = parseFloat(aValue);
        const bPrice = parseFloat(bValue);
        if (isNaN(aPrice) || isNaN(bPrice)) return 0;
        return sortDirection === "asc" ? aPrice - bPrice : bPrice - aPrice;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortField, sortDirection]);

  const paginatedRows = useMemo(() => {
    return sortedRows.slice(page * pageSize, (page + 1) * pageSize);
  }, [sortedRows, page, pageSize]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedRows = event.target.checked
      ? new Set(paginatedRows.map((row) => row.id))
      : new Set<string | number>();
    setSelectedRows(newSelectedRows);
    onSelectionChange(Array.from(newSelectedRows));
  };

  const checkboxColumn: Column<T> = {
    field: "checkbox",
    headerName: "",
    width: 50,
    renderCell: (_, row: T) => (
      <input
        id={row.id}
        name={row.id}
        type="checkbox"
        checked={selectedRows.has(row.id)}
        onChange={() => handleSelectRow(row.id)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
    ),
  };

  const handleSelectRow = (id: string | number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
    onSelectionChange(Array.from(newSelectedRows));
  };

  if (selectedRows.size > 0) {
    const validIds = new Set(rows.map((row) => row.id));
    const newSelectedRows = new Set(
      Array.from(selectedRows).filter((id) => validIds.has(id))
    );
    if (newSelectedRows.size !== selectedRows.size) {
      setSelectedRows(newSelectedRows);
      onSelectionChange(Array.from(newSelectedRows));
    }
  }

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

  const actionsColumn: Column<T> = {
    field: "actions",
    headerName: "Actions",
    width: 50,
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
                    id="checkbox"
                    name="checkbox"
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.size === paginatedRows.length}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                ) : (
                  <div className="flex items-center">
                    <span className="mr-2">{column.headerName}</span>
                    {(column.field === "price" ||
                      column.field === "inventory") && (
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
              key={row.id || index}
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
