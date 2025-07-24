# material-datatables

A beautiful, simple, and customizable Material UI Data Table component based on MUI DataGrid v7+. This package provides a pre-configured, flexible, and accessible data table for React projects, with all the power of MUI's DataGrid and sensible defaults for rapid development.

---

## ✨ Features
- **Dynamic columns and rows** via props
- **Pagination** with selectable page sizes
- **Column sorting, filtering, and management**
- **Responsive design** and style overrides via `containerSx`
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

## 🛠️ Usage Example

```tsx
import { MuiDataTable } from 'material-datatables';
import type { GridColDef, GridValidRowModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'fullName', headerName: 'Full name', width: 160, valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}` },
];

const rows: GridValidRowModel[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

<MuiDataTable
  title="User List"
  columns={columns}
  rows={rows}
  containerSx={{ height: 400, width: '100%' }}
/>
```

---

## 📑 Props API

| Prop           | Type                | Description                              |
|----------------|---------------------|------------------------------------------|
| `columns`      | `GridColDef[]`      | Column definitions (required)            |
| `rows`         | `GridValidRowModel[]`| Row data (required)                      |
| `title`        | `string`            | Optional table title                     |
| `containerSx`  | `object`            | Custom styles for the outer Box container|
| ...rest        | All DataGridProps   | All other DataGrid props are supported   |

---

## 🎨 Customization
- **Styling:** Use the `containerSx` prop for theme-aware styles on the outer container.
- **Theme:** Wrap your app in a MUI `<ThemeProvider>` to apply custom themes.
- **Event Handling:** Use DataGrid's built-in props for row clicks, sorting, etc.

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
