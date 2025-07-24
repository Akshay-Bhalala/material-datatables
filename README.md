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


## 🖼️ Screenshot

Below is an example screenshot of the MuiDataTable in action:

![MuiDataTable Example](./public/mui-datatable-screenshot.png)

---

## 🛠️ Full Working Example (App.tsx)

```tsx
import { MuiDataTable } from "material-datatables";
import type { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import "./App.css";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    width: 160,
    sortable: false,
    filterable: false,
  },
];

const rows: GridValidRowModel[] = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, fullName: "Jon Snow" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, fullName: "Cersei Lannister" },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, fullName: "Jaime Lannister" },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, fullName: "Arya Stark" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 34, fullName: "Daenerys Targaryen" },
];

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <MuiDataTable
        title="User List"
        columns={columns}
        rows={rows}
        containerSx={{
          height: 500,
          width: "100%",
          boxShadow: "0 8px 32px rgba(255, 0, 0, 0.18)",
          borderRadius: 12,
          background: "#fff",
          margin: "0 auto",
        }}
        bgColor="white" // Custom background color
        textColor="black" // Custom text color
        filterColor="blue" // Custom filter option color
        pageSizeOptions={[5, 10, 25, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowClick={(params) => console.log("Row clicked:", params)}
        sortingOrder={["asc", "desc"]}
      />
    </div>
  );
}

export default App;
```

---

## 🧩 Advanced Usage & Tips

- **Sorting, Filtering, Pagination:** All built-in DataGrid features are supported via props.
- **Styling:** Use `containerSx` for the outer container, or `className` for custom CSS.
- **Color Customization:** Use `bgColor`, `textColor`, and `filterColor` props to control the background, text, and filter UI colors. 
  - **Accessibility:** The filter panel always uses a white background and readable text color, so filter options are always visible. The `filterColor` prop customizes highlights (checkboxes, focus) in the filter panel.
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
// Note: The filter panel always uses a white background and readable text color for accessibility, regardless of table background/text color. The filterColor prop still customizes highlights (checkboxes, focus) in the filter panel.
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
| `filterColor`  | `string`            | Custom color for filter UI highlights    |
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
