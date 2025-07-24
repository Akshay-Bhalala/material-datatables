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
  {
    field: 'fullName',
    headerName: 'Full name',
    width: 160,
    valueGetter: (params: any) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    sortable: false,
    filterable: false,
  },
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
  containerSx={{ height: 500, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', borderRadius: 12, background: '#fff', margin: '0 auto' }}
  bgColor="#22223b" // Custom background color
  textColor="#f2e9e4" // Custom text color
  filterColor="#9a8c98" // Custom filter option color
  pageSizeOptions={[5, 10, 25, 100]}
  checkboxSelection
  disableRowSelectionOnClick
  onRowClick={(params) => console.log('Row clicked:', params)}
  sortingOrder={['asc', 'desc']}
/>
```

---

## 🧩 Advanced Usage & Tips

- **Sorting, Filtering, Pagination:** All built-in DataGrid features are supported via props.
- **Styling:** Use `containerSx` for the outer container, or `className` for custom CSS.
- **Color Customization:** Use `bgColor`, `textColor`, and `filterColor` props to control the background, text, and filter UI colors.
- **Event Handling:** Use any DataGrid event prop (e.g., `onRowClick`, `onSortModelChange`).
- **Custom Columns:** Use `valueGetter`, `renderCell`, etc. for advanced column logic.
- **Row Selection:** Enable with `checkboxSelection`.
- **Page Size Options:** Use `pageSizeOptions` to control pagination.
- **Full DataGrid API:** Pass any [DataGrid prop](https://mui.com/x/api/data-grid/data-grid-props/) directly to `<MuiDataTable />`.

---

**Example:**
```tsx
<MuiDataTable
  columns={columns}
  rows={rows}
  checkboxSelection
  pageSizeOptions={[5, 10, 25]}
  bgColor="#232323"
  textColor="#fff"
  filterColor="#1976d2"
  onRowClick={(params) => alert(`Clicked row ID: ${params.id}`)}
  containerSx={{ maxWidth: 900, margin: '2rem auto', background: '#fff' }}
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
| `bgColor`      | `string`            | Custom background color for the table    |
| `textColor`    | `string`            | Custom text color for the table          |
| `filterColor`  | `string`            | Custom color for filter UI elements      |
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
