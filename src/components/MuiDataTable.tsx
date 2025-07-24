import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MuiDataTableProps } from '../types';

/**
 * A fully featured Material UI Data Table component.
 */
const MuiDataTable: React.FC<MuiDataTableProps> = ({
  columns,
  rows,
  sx,
  className,
  toolbar,
  initialState,
  pageSizeOptions = [5, 10, 25, 50, 100],
  checkboxSelection = true,
  disableRowSelectionOnClick = false,
  ...rest
}) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      sx={sx}
      className={className}
      autoHeight
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      initialState={initialState}
      pageSizeOptions={pageSizeOptions}
      slots={{
        toolbar: toolbar ? () => <>{toolbar}</> : GridToolbar,
      }}
      {...rest}
    />
  );
};

export default MuiDataTable; 