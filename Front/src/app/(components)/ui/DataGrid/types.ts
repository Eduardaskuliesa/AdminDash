import { Product } from "@/state/productApi";

export interface Column<T> {
  field: keyof T | 'checkbox' | 'rowNumber' | 'actions';
  headerName: string;
  width?: number;
  renderCell?: (value: any, row: T, index: number) => React.ReactNode;
}

export type SortDirection = "asc" | "desc" | null;

export interface DataGridProps<T extends Record<string, any>> {
  columns: Column<T>[];
  rows: T[];
  pageSize?: number;
  onEdit?: (id: string, updatedData: Partial<Product>) => void;
  onDelete?: (id: string | number) => void;
  withCheckbox?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
}
