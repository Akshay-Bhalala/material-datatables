import * as React from 'react';
// Column definition type
export interface MuiDataTableColumn {
  field: string; // key in row data
  headerName: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  align?: 'left' | 'center' | 'right';
  renderCell?: (value: any, row: MuiDataTableRow, rowIndex: number) => React.ReactNode;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'custom';
  filterComponent?: React.ReactNode;
  sx?: object;
  className?: string;
}

// Row data type (generic)
export type MuiDataTableRow = Record<string, any> & { id?: string | number };

// Pagination options
type MuiDataTablePagination = {
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];
};

// Sorting model
export type MuiDataTableSortModel = {
  field: string;
  direction: 'asc' | 'desc';
};

// Filtering model
export type MuiDataTableFilterModel = Record<string, any>;

// Toolbar action type
export interface MuiDataTableToolbarAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

// Main component props
export interface MuiDataTableProps {
  columns: MuiDataTableColumn[];
  rows: MuiDataTableRow[];
  loading?: boolean;
  pagination?: MuiDataTablePagination;
  onPaginationChange?: (pagination: MuiDataTablePagination) => void;
  sortModel?: MuiDataTableSortModel;
  onSortModelChange?: (sortModel: MuiDataTableSortModel) => void;
  filterModel?: MuiDataTableFilterModel;
  onFilterModelChange?: (filterModel: MuiDataTableFilterModel) => void;
  onRowClick?: (row: MuiDataTableRow, rowIndex: number) => void;
  onSelectionChange?: (selectedRows: MuiDataTableRow[]) => void;
  checkboxSelection?: boolean;
  disableSelectionOnClick?: boolean;
  columnVisibilityModel?: Record<string, boolean>;
  onColumnVisibilityChange?: (model: Record<string, boolean>) => void;
  toolbarActions?: MuiDataTableToolbarAction[];
  showSearch?: boolean;
  showDownload?: boolean;
  sx?: object;
  className?: string;
  style?: React.CSSProperties;
  themeOverrides?: object;
  virtualization?: boolean;
  rowHeight?: number;
  tableColor?: string;
  tableTextColor?: string;
  ariaLabel?: string;
}
