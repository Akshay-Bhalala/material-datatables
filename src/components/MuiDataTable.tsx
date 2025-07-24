import * as React from "react";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";

export interface MuiDataTableProps extends Omit<DataGridProps, "columns" | "rows"> {
  columns: GridColDef[];
  rows: GridValidRowModel[];
  title?: string;
  containerSx?: object; // custom style for outer Box
  bgColor?: string; // custom background color
  textColor?: string; // custom text color
  filterColor?: string; // custom filter option color
}

const MuiDataTable: React.FC<MuiDataTableProps> = ({
  columns,
  rows,
  title,
  containerSx,
  bgColor,
  textColor,
  filterColor,
  ...dataGridProps
}) => {
  const theme = useTheme();

  // Fallbacks for colors
  const resolvedBgColor = bgColor || (theme.palette.mode === "dark" ? theme.palette.background.default : "#fff");
  const resolvedTextColor = textColor || (theme.palette.mode === "dark" ? "#fff" : "#232323");
  const resolvedFilterColor = filterColor || theme.palette.primary.main;

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: resolvedBgColor,
        color: resolvedTextColor,
        p: 2,
        width: "100%",
        height: "100%",
        ...containerSx,
      }}
    >
      {title && (
        <Typography
          variant="h6"
          component="div"
          sx={{ mb: 2, fontWeight: 600, color: resolvedTextColor }}
        >
          {title}
        </Typography>
      )}

      <DataGrid
        columns={columns}
        rows={rows}
        autoHeight
        showToolbar
        disableRowSelectionOnClick
        {...dataGridProps}
        sx={{
          border: 0,
          fontSize: 15,
          color: resolvedTextColor,
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: resolvedBgColor,
            color: resolvedTextColor,
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-toolbarContainer': {
            bgcolor: resolvedBgColor,
            color: resolvedTextColor,
          },
          '& .MuiDataGrid-filterForm': {
            bgcolor: resolvedBgColor,
            color: resolvedFilterColor,
          },
          '& .MuiDataGrid-panelFooter': {
            bgcolor: resolvedBgColor,
            color: resolvedTextColor,
          },
          '& .MuiDataGrid-menu': {
            bgcolor: resolvedBgColor,
            color: resolvedFilterColor,
          },
          '& .MuiDataGrid-row, & .MuiDataGrid-cell': {
            color: resolvedTextColor,
          },
        }}
        // Inline styles here (not passed as sx)
        style={{
          border: 0,
          fontSize: 15,
        }}
        // Internal class styling via classes or CSS is best for full control
      />
    </Box>
  );
};

export default MuiDataTable;
