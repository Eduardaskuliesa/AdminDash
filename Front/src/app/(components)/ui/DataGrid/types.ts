export interface Column<T> {
  field: keyof T | "rowNumber" | "checkbox" | "actions";
  headerName: string;
  width?: number;
  renderCell?: (value: any, row: T, index: number) => React.ReactNode;
}

export type SortDirection = "asc" | "desc" | null;

export interface DataGridProps<T> {
  columns: Column<T>[];
  rows: T[];
  pageSize?: number;
  withCheckbox?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}
