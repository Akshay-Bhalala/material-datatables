import React, { useState, useMemo, ChangeEvent } from 'react';
import { MuiDataTableProps, MuiDataTableRow, MuiDataTableColumn, MuiDataTableSortModel, MuiDataTableFilterModel, MuiDataTableToolbarAction } from '../types';
import styles from './MuiDataTable.module.css';

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

const MuiDataTable: React.FC<MuiDataTableProps> = (props: MuiDataTableProps) => {
  const {
    columns,
    rows,
    loading = false,
    pagination,
    onPaginationChange,
    sortModel: controlledSortModel,
    onSortModelChange,
    filterModel: controlledFilterModel,
    onFilterModelChange,
    onRowClick,
    onSelectionChange,
    checkboxSelection,
    disableSelectionOnClick,
    columnVisibilityModel: controlledColumnVisibilityModel,
    onColumnVisibilityChange,
    toolbarActions,
    showSearch,
    showDownload,
    sx,
    className,
    style,
    themeOverrides,
    virtualization,
    rowHeight,
    tableColor,
    tableTextColor,
    ariaLabel,
  } = props;

  // Controlled/uncontrolled pagination state
  const isPaginationControlled = !!pagination && !!onPaginationChange;
  const [internalPage, setInternalPage] = useState<number>(0);
  const [internalPageSize, setInternalPageSize] = useState<number>(
    pagination?.pageSize || DEFAULT_PAGE_SIZE_OPTIONS[0]
  );

  const page = isPaginationControlled ? pagination!.page : internalPage;
  const pageSize = isPaginationControlled ? pagination!.pageSize : internalPageSize;
  const pageSizeOptions: number[] = pagination?.pageSizeOptions || DEFAULT_PAGE_SIZE_OPTIONS;

  // Sorting state (controlled/uncontrolled)
  const isSortControlled = !!controlledSortModel && !!onSortModelChange;
  const [internalSortModel, setInternalSortModel] = useState<MuiDataTableSortModel | undefined>(undefined);
  const sortModel: MuiDataTableSortModel | undefined = isSortControlled ? controlledSortModel : internalSortModel;

  // Filtering state (controlled/uncontrolled)
  const isFilterControlled = !!controlledFilterModel && !!onFilterModelChange;
  const [internalFilterModel, setInternalFilterModel] = useState<MuiDataTableFilterModel>({});
  const filterModel: MuiDataTableFilterModel = isFilterControlled ? controlledFilterModel! : internalFilterModel;

  // Column visibility state (controlled/uncontrolled)
  const isColumnVisibilityControlled = !!controlledColumnVisibilityModel && !!onColumnVisibilityChange;
  const defaultVisibility = Object.fromEntries(columns.map(col => [col.field, col.visible !== false]));
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<Record<string, boolean>>(defaultVisibility);
  const columnVisibilityModel: Record<string, boolean> = isColumnVisibilityControlled
    ? controlledColumnVisibilityModel!
    : internalColumnVisibility;

  // Only show columns that are visible
  const visibleColumns = columns.filter((col: MuiDataTableColumn) => columnVisibilityModel[col.field] !== false);

  // Row selection state (uncontrolled)
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string | number>>(new Set());

  // Helper to get row ID
  const getRowId = (row: MuiDataTableRow, rowIndex: number) => row.id ?? rowIndex;

  // Handle row checkbox change
  const handleRowCheckboxChange = (row: MuiDataTableRow, rowIndex: number) => {
    const rowId = getRowId(row, rowIndex);
    const newSelected = new Set(selectedRowIds);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRowIds(newSelected);
    if (onSelectionChange) {
      const selectedRows = paginatedRows.filter((r, i) => newSelected.has(getRowId(r, i)));
      onSelectionChange(selectedRows);
    }
  };

  // Handle select all checkbox
  const handleSelectAllChange = () => {
    const allIds = paginatedRows.map(getRowId);
    const allSelected = allIds.every(id => selectedRowIds.has(id));
    let newSelected: Set<string | number>;
    if (allSelected) {
      // Deselect all
      newSelected = new Set(selectedRowIds);
      allIds.forEach(id => newSelected.delete(id));
    } else {
      // Select all
      newSelected = new Set(selectedRowIds);
      allIds.forEach(id => newSelected.add(id));
    }
    setSelectedRowIds(newSelected);
    if (onSelectionChange) {
      const selectedRows = paginatedRows.filter((r, i) => newSelected.has(getRowId(r, i)));
      onSelectionChange(selectedRows);
    }
  };

  // Sorting handler
  const handleSort = (field: string) => {
    const col = columns.find((c: MuiDataTableColumn) => c.field === field);
    if (!col || !col.sortable) return;
    let direction: 'asc' | 'desc' = 'asc';
    if (sortModel && sortModel.field === field) {
      direction = sortModel.direction === 'asc' ? 'desc' : 'asc';
    }
    const newSortModel: MuiDataTableSortModel = { field, direction };
    if (isSortControlled) {
      onSortModelChange!(newSortModel);
    } else {
      setInternalSortModel(newSortModel);
    }
  };

  // Filtering handler
  const handleFilterChange = (field: string, value: string) => {
    const newFilterModel = { ...filterModel, [field]: value };
    if (isFilterControlled) {
      onFilterModelChange!(newFilterModel);
    } else {
      setInternalFilterModel(newFilterModel);
    }
    // Reset to first page on filter change
    if (isPaginationControlled) {
      onPaginationChange!({
        page: 0,
        pageSize,
        pageSizeOptions,
      });
    } else {
      setInternalPage(0);
    }
  };

  // Toolbar: global search state
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Toolbar: CSV download handler
  const handleDownloadCSV = () => {
    // Use visible columns for CSV
    const headers = visibleColumns.map(col => col.headerName);
    const fields = visibleColumns.map(col => col.field);
    const csvRows = [headers.join(',')];
    sortedRows.forEach(row => {
      const rowData = fields.map(field => {
        let value = row[field];
        if (typeof value === 'string') {
          // Escape quotes
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        return value;
      });
      csvRows.push(rowData.join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Apply global search before column filtering
  const globallySearchedRows = useMemo(() => {
    if (!globalSearch) return rows;
    const search = globalSearch.toLowerCase();
    return rows.filter(row =>
      visibleColumns.some(col => {
        const value = row[col.field];
        return String(value ?? '').toLowerCase().includes(search);
      })
    );
  }, [rows, visibleColumns, globalSearch]);

  // Filter rows (global search + column filters)
  const filteredRows = useMemo(() => {
    return globallySearchedRows.filter((row: MuiDataTableRow) => {
      return columns.every((col: MuiDataTableColumn) => {
        if (!col.filterable || !filterModel[col.field]) return true;
        const cellValue = row[col.field];
        const filterValue = filterModel[col.field];
        return String(cellValue ?? '').toLowerCase().includes(String(filterValue).toLowerCase());
      });
    });
  }, [globallySearchedRows, columns, filterModel]);

  // Sort rows after filtering
  const sortedRows = useMemo(() => {
    if (!sortModel || !sortModel.field) return filteredRows;
    const col = columns.find((c: MuiDataTableColumn) => c.field === sortModel.field);
    if (!col) return filteredRows;
    const sorted = [...filteredRows].sort((a: MuiDataTableRow, b: MuiDataTableRow) => {
      const aValue = a[sortModel.field];
      const bValue = b[sortModel.field];
      if (aValue === bValue) return 0;
      if (sortModel.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return sorted;
  }, [filteredRows, sortModel, columns]);

  // Calculate paginated rows
  const paginatedRows = useMemo(() => {
    const start = page * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page, pageSize]);

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    if (isPaginationControlled) {
      onPaginationChange!({
        page: newPage,
        pageSize,
        pageSizeOptions,
      });
    } else {
      setInternalPage(newPage);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    if (isPaginationControlled) {
      onPaginationChange!({
        page: 0,
        pageSize: newSize,
        pageSizeOptions,
      });
    } else {
      setInternalPage(0);
      setInternalPageSize(newSize);
    }
  };

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  // Only show columns that are visible
  // (already defined as visibleColumns)

  // Helper: is all rows on page selected?
  const allPageRowsSelected = paginatedRows.length > 0 && paginatedRows.every((row, i) => selectedRowIds.has(getRowId(row, i)));

  return (
    <div className="mui-datatable-outer">
      <div className="mui-datatable-header">User List</div>
      <div className="mui-datatable-card">
        <div className="mui-datatable-toolbar">
          <div className="mui-datatable-toolbar-left">
            {/* Column selector */}
            <label>Columns:</label>
            <select
              multiple
              value={visibleColumns.map(col => col.field)}
              onChange={e => {
                const options = Array.from(e.target.options);
                const selectedFields = options.filter(o => o.selected).map(o => o.value);
                const newModel: Record<string, boolean> = {};
                columns.forEach(col => {
                  newModel[col.field] = selectedFields.includes(col.field);
                });
                if (isColumnVisibilityControlled) {
                  onColumnVisibilityChange!(newModel);
                } else {
                  setInternalColumnVisibility(newModel);
                }
              }}
              disabled={loading}
            >
              {columns.map(col => (
                <option key={col.field} value={col.field}>
                  {col.headerName}
                </option>
              ))}
            </select>
          </div>
          <div className="mui-datatable-toolbar-center">
            {/* Search */}
            {showSearch && (
              <input
                className={styles['mui-datatable-search']}
                type="text"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Search..."
                disabled={loading}
              />
            )}
          </div>
          <div className="mui-datatable-toolbar-right">
            {/* Download, custom actions */}
            {showDownload && (
              <button className={styles['mui-datatable-download']} onClick={handleDownloadCSV} disabled={loading}>
                Download CSV
              </button>
            )}
            {/* Toolbar: custom actions */}
            {toolbarActions && toolbarActions.length > 0 && (
              <div className={styles['mui-datatable-actions']}>
                {toolbarActions.map((action, idx) => (
                  <button key={idx} onClick={action.onClick} disabled={loading} title={action.label} className={styles['mui-datatable-action-btn']}>
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mui-datatable-table-wrapper">
          {/* Table */}
          <table
            className={styles['mui-datatable-table']}
            style={{
              width: '100%',
              background: tableColor,
              color: tableTextColor,
              opacity: loading ? 0.5 : 1,
              ...((themeOverrides && typeof themeOverrides === 'object' && 'table' in themeOverrides)
                ? (themeOverrides.table as React.CSSProperties)
                : {}),
            }}
          >
            <thead>
              <tr>
                {checkboxSelection && (
                  <th>
                    <input
                      type="checkbox"
                      checked={allPageRowsSelected}
                      onChange={handleSelectAllChange}
                      aria-label="Select all rows"
                      disabled={loading}
                    />
                  </th>
                )}
                {visibleColumns.map((col: MuiDataTableColumn) => (
                  <th
                    key={col.field}
                    style={col.sx as React.CSSProperties}
                    className={col.className}
                    onClick={() => !loading && col.sortable && handleSort(col.field)}
                  >
                    {col.headerName}
                    {col.sortable && (
                      <span className={styles['mui-datatable-sort-icon']}>
                        {sortModel && sortModel.field === col.field
                          ? sortModel.direction === 'asc' ? '▲' : '▼'
                          : '↕'}
                      </span>
                    )}
                    {/* Filtering controls */}
                    {col.filterable && (
                      <div className={styles['mui-datatable-filter']}>
                        <input
                          type="text"
                          value={filterModel[col.field] || ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilterChange(col.field, e.target.value)}
                          placeholder={`Filter...`}
                          disabled={loading}
                        />
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={visibleColumns.length + (checkboxSelection ? 1 : 0)} className={styles['mui-datatable-loading-cell']}>
                    <span>Loading...</span>
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row: MuiDataTableRow, rowIndex: number) => {
                  const rowId = getRowId(row, rowIndex + page * pageSize);
                  const isSelected = selectedRowIds.has(rowId);
                  return (
                    <tr
                      key={row.id ?? rowIndex}
                      onClick={() => {
                        if (!checkboxSelection && onRowClick) {
                          onRowClick(row, rowIndex + page * pageSize);
                        } else if (checkboxSelection && !disableSelectionOnClick) {
                          handleRowCheckboxChange(row, rowIndex + page * pageSize);
                        }
                      }}
                      className={isSelected ? styles['mui-datatable-row-selected'] : ''}
                      style={rowHeight ? { height: rowHeight } : {}}
                    >
                      {checkboxSelection && (
                        <td>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={e => {
                              e.stopPropagation();
                              handleRowCheckboxChange(row, rowIndex + page * pageSize);
                            }}
                            aria-label={`Select row ${rowIndex + 1}`}
                            disabled={loading}
                          />
                        </td>
                      )}
                      {visibleColumns.map((col: MuiDataTableColumn) => (
                        <td key={col.field} style={col.sx as React.CSSProperties} className={col.className}>
                          {col.renderCell ? col.renderCell(row[col.field], row, rowIndex + page * pageSize) : row[col.field]}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {loading && (
            <div className={styles['mui-datatable-loading-overlay']}>
              <span>Loading...</span>
            </div>
          )}
        </div>
        <div className="mui-datatable-pagination">
          {/* Pagination */}
          <span>Rows per page: </span>
          <select value={pageSize} onChange={handlePageSizeChange} disabled={loading}>
            {pageSizeOptions.map((size: number) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <span>
            {filteredRows.length === 0
              ? '0'
              : `${page * pageSize + 1}-${Math.min((page + 1) * pageSize, filteredRows.length)} of ${filteredRows.length}`}
          </span>
          <button onClick={() => handlePageChange(Math.max(0, page - 1))} disabled={page === 0 || loading}>
            {'<'}
          </button>
          <button onClick={() => handlePageChange(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1 || loading}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MuiDataTable;
