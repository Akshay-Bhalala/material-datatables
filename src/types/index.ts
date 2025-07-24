import { DataGridProps, GridColDef, GridValidRowModel } from '@mui/x-data-grid';

/**
 * Props for the MuiDataTable component.
 */
export interface MuiDataTableProps extends Omit<DataGridProps, 'columns' | 'rows'> {
  /** Column definitions for the table */
  columns: GridColDef[];
  /** Row data for the table */
  rows: GridValidRowModel[];
  /** Optional title for the table */
  title?: string;
  /** Custom styles for the outer Box container */
  containerSx?: object;
} 