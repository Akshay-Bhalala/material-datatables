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
}

const MuiDataTable: React.FC<MuiDataTableProps> = ({
  columns,
  rows,
  title,
  containerSx,
  ...dataGridProps
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: theme.palette.mode === "dark" ? "background.default" : "#fff",
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
          sx={{ mb: 2, fontWeight: 600 }}
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
