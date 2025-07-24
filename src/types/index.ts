import { DataGridProps, GridColDef, GridRowsProp, GridInitialState } from '@mui/x-data-grid';
import { SxProps, Theme } from '@mui/material/styles';
import { ReactNode } from 'react';

/**
 * Props for the MuiDataTable component.
 */
export interface MuiDataTableProps extends Omit<DataGridProps, 'columns' | 'rows'> {
  /** Column definitions for the table */
  columns: GridColDef[];
  /** Row data for the table */
  rows: GridRowsProp;
  /** Custom styles using MUI's sx prop */
  sx?: SxProps<Theme>;
  /** Custom className for the root element */
  className?: string;
  /** Custom toolbar React node (replaces default) */
  toolbar?: ReactNode;
  /** Initial state for DataGrid (pagination, sorting, etc.) */
  initialState?: GridInitialState;
  /** Page size options for pagination */
  pageSizeOptions?: number[];
  /** Enable/disable checkbox selection */
  checkboxSelection?: boolean;
  /** Disable row selection on click */
  disableRowSelectionOnClick?: boolean;
  /** Event callback for row click */
  onRowClick?: DataGridProps['onRowClick'];
  /** Event callback for sort model change */
  onSortModelChange?: DataGridProps['onSortModelChange'];
  // Add more custom props as needed
} 