import * as React from "react";
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import { Box, Typography, useTheme } from "@mui/material";

export interface MuiDataTableProps
  extends Omit<DataGridProps, "columns" | "rows"> {
  columns: GridColDef[];
  rows: GridValidRowModel[];
  title?: string;
  containerSx?: object;
  bgColor?: string;
  textColor?: string;
  filterColor?: string;
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
  const resolvedBgColor =
    bgColor ||
    (theme.palette.mode === "dark" ? theme.palette.background.default : "#fff");
  const resolvedTextColor =
    textColor || (theme.palette.mode === "dark" ? "#fff" : "#232323");
  const resolvedFilterColor = filterColor || theme.palette.primary.main;

  // Ensure a default height if not provided
  const mergedContainerSx = {
    minHeight: 300,
    ...containerSx,
  };

  // Warn if columns or rows are empty
  if (!columns?.length || !rows?.length) {
    return (
      <Box sx={{ p: 2, textAlign: "center", color: "red" }}>
        <Typography variant="h6">No data to display</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: resolvedBgColor,
        color: resolvedTextColor,
        p: 2,
        width: "100%",
        ...mergedContainerSx,
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
        disableRowSelectionOnClick
        {...dataGridProps}
        sx={{
          border: 0,
          fontSize: 15,
          color: resolvedTextColor,
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: resolvedBgColor,
            color: resolvedTextColor,
            fontWeight: "bold",
          },
          "& .MuiDataGrid-toolbarContainer": {
            bgcolor: resolvedBgColor,
            color: resolvedTextColor,
          },
          "& .MuiDataGrid-filterForm": {
            bgcolor: resolvedBgColor,
            color: resolvedFilterColor,
          },
          "& .MuiDataGrid-panelFooter": {
            bgcolor: resolvedBgColor,
            color: resolvedTextColor,
          },
          "& .MuiDataGrid-menu": {
            bgcolor: resolvedBgColor,
            color: resolvedFilterColor,
          },
          "& .MuiDataGrid-row, & .MuiDataGrid-cell": {
            color: resolvedTextColor,
          },
          // Filter chip color (when filter is applied)
          "& .MuiDataGrid-filteredChip, & .MuiChip-root": {
            bgcolor: resolvedFilterColor,
            color: theme.palette.getContrastText(resolvedFilterColor),
            fontWeight: 600,
          },
        }}
        style={{
          border: 0,
          fontSize: 15,
        }}
      />
    </Box>
  );
};

export default MuiDataTable;
