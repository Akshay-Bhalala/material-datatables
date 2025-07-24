<<<<<<< HEAD
# material-datatables

A fully functional and customizable Material UI Data Table component based on MUI DataGrid v7+. This package provides a pre-configured, flexible, and accessible data table for React projects, with all the power of MUI's DataGrid and sensible defaults for rapid development.

---

## ✨ Features
- **Dynamic columns and rows** via props
- **Pagination** with selectable page sizes
- **Column sorting, filtering, visibility toggle, and management**
- **Row selection** with checkboxes
- **Customizable toolbar** (use your own or the default)
- **Responsive design** and style overrides via `sx` or `className`
- **Event callbacks** for row click, sort model change, and more
- **ARIA accessibility** and virtualization for large data sets
- **Theme overrides** supported

---

## 🚀 Installation

```bash
npm install material-datatables
```

### Peer Dependencies
You must also have these installed in your project:
- `react` >= 18.0.0
- `@mui/material` >= 7.2.0
- `@mui/x-data-grid` >= 7.2.0

---

## 🛠️ Usage

```tsx
import { MuiDataTable } from 'material-datatables';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'fullName', headerName: 'Full name', width: 160, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
];

const rows: GridRowsProp = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

<MuiDataTable
  columns={columns}
  rows={rows}
  initialState={{
    pagination: { paginationModel: { pageSize: 5, page: 0 } },
  }}
  pageSizeOptions={[5, 10, 25]}
  checkboxSelection
  sx={{ height: 400, width: '100%' }}
  onRowClick={(params) => console.log('Row clicked:', params)}
  onSortModelChange={(model) => console.log('Sort model:', model)}
/>
```

---

## 📑 Props API

All [MUI DataGrid props](https://mui.com/x/api/data-grid/data-grid-props/) are supported, plus these customizations:

| Prop                        | Type                        | Description |
|-----------------------------|-----------------------------|-------------|
| `columns`                   | `GridColDef[]`              | Column definitions (required) |
| `rows`                      | `GridRowsProp`              | Row data (required) |
| `sx`                        | `SxProps<Theme>`            | Custom styles (optional) |
| `className`                 | `string`                    | Custom class name (optional) |
| `toolbar`                   | `ReactNode`                 | Custom toolbar (optional) |
| `initialState`              | `GridInitialState`          | Initial state for DataGrid (pagination, sorting, etc.) |
| `pageSizeOptions`           | `number[]`                  | Page size options for pagination |
| `checkboxSelection`         | `boolean`                   | Enable/disable row selection checkboxes |
| `disableRowSelectionOnClick`| `boolean`                   | Disable row selection on click |
| `onRowClick`                | `function`                  | Row click event callback |
| `onSortModelChange`         | `function`                  | Sort model change event callback |

---

## 🎨 Customization
- **Styling:** Use the `sx` prop for inline theme-aware styles, or `className` for CSS classes.
- **Toolbar:** Pass a custom React node to the `toolbar` prop to override the default toolbar.
- **Theme:** Wrap your app in a MUI `<ThemeProvider>` to apply custom themes.
- **Event Handling:** Use the provided callbacks for row clicks, sorting, etc.

---

## 🧩 Advanced Usage
- **Virtualization:** Out-of-the-box for large data sets (thanks to MUI DataGrid).
- **Accessibility:** ARIA attributes and keyboard navigation are handled by MUI DataGrid.
- **Column Management:** Users can show/hide columns, sort, and filter using the built-in toolbar.

---

## 📝 License
MIT

---

## 👤 Author
Akshay Bhalala

---

## 🏷️ Keywords
material-ui, mui, datagrid, datatable, react, table, component, typescript 

---


## 🤝 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

---

## 📚 Resources
- [Material UI DataGrid Docs](https://mui.com/x/react-data-grid/)
- [Material UI Theming](https://mui.com/material-ui/customization/theming/)
- [MUI DataGrid API Reference](https://mui.com/x/api/data-grid/data-grid/) 
