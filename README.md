# material-datatables

A fully-featured, customizable Material UI Data Table React component with sorting, filtering, pagination, selection, column management, and more. Built for flexibility, performance, and beautiful UI.

---

## ✨ Features
- Dynamic columns and rows
- Pagination with selectable page sizes
- Column sorting (ASC/DESC)
- Per-column and global filtering
- Column visibility toggle and management
- Row selection (checkboxes, select all)
- Responsive design
- Customizable styles via `sx`, `themeOverrides`, and props
- Custom toolbar actions, search, and CSV download
- Accessibility (ARIA attributes)
- Virtualization-ready for large data sets
- TypeScript support

---

## 🚀 Installation

```bash
npm install material-datatables
```

or

```bash
yarn add material-datatables
```

---

## 🛠️ Usage

```tsx
import React from 'react';
import { MuiDataTable } from 'material-datatables';
import { Add, Refresh } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', filterable: true },
  { field: 'email', headerName: 'Email', filterable: true },
];

const rows = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  // ...
];

const actions = [
  {
    icon: <Add />,
    label: 'Add',
    onClick: () => alert('Add clicked!'),
  },
  {
    icon: <Refresh />,
    label: 'Refresh',
    onClick: () => alert('Refresh clicked!'),
  },
];

export default function DemoTable() {
  return (
    <MuiDataTable
      columns={columns}
      rows={rows}
      showSearch
      showDownload
      toolbarActions={actions}
      checkboxSelection
      pagination={{ page: 0, pageSize: 10, pageSizeOptions: [5, 10, 25] }}
      tableColor="#fff"
      tableTextColor="#222"
      rowHeight={48}
      sx={{ borderRadius: 8, boxShadow: '0 2px 8px #eee' }}
    />
  );
}
```

---

## 📑 Props API

| Prop                    | Type                        | Description |
|-------------------------|-----------------------------|-------------|
| `columns`               | `MuiDataTableColumn[]`      | Column definitions |
| `rows`                  | `MuiDataTableRow[]`         | Table data rows |
| `loading`               | `boolean`                   | Show loading overlay |
| `pagination`            | `object`                    | Pagination state |
| `onPaginationChange`    | `(pagination) => void`      | Pagination callback |
| `sortModel`             | `object`                    | Sorting state |
| `onSortModelChange`     | `(sortModel) => void`       | Sorting callback |
| `filterModel`           | `object`                    | Filtering state |
| `onFilterModelChange`   | `(filterModel) => void`     | Filtering callback |
| `onRowClick`            | `(row, rowIndex) => void`   | Row click handler |
| `onSelectionChange`     | `(selectedRows) => void`    | Row selection callback |
| `checkboxSelection`     | `boolean`                   | Enable row selection |
| `disableSelectionOnClick`| `boolean`                  | Disable row click selection |
| `columnVisibilityModel` | `object`                    | Column visibility state |
| `onColumnVisibilityChange`| `(model) => void`          | Column visibility callback |
| `toolbarActions`        | `MuiDataTableToolbarAction[]`| Custom toolbar actions |
| `showSearch`            | `boolean`                   | Show global search |
| `showDownload`          | `boolean`                   | Show CSV download |
| `sx`                    | `object`                    | Custom styles |
| `className`             | `string`                    | Custom class name |
| `style`                 | `object`                    | Inline styles |
| `themeOverrides`        | `object`                    | Theme/style overrides |
| `virtualization`        | `boolean`                   | Enable virtualization |
| `rowHeight`             | `number`                    | Row height (px) |
| `tableColor`            | `string`                    | Table background color |
| `tableTextColor`        | `string`                    | Table text color |
| `ariaLabel`             | `string`                    | ARIA label for accessibility |

---

## 🎨 Customization
- **Styling:** Use `sx`, `className`, `style`, or `themeOverrides` for custom styles.
- **Toolbar:** Add custom actions, search, and download.
- **Columns:** Use `renderCell` for custom cell rendering.
- **Accessibility:** ARIA attributes included by default.

---

## 👤 Author
**Akshay Bhalala**  
[akshaybhalala@gmail.com](mailto:akshaybhalala@gmail.com)

---

## 🔑 Keywords
react, material-ui, data-table, table, mui, datatable, component, typescript

---

## 📄 License
MIT

---

## 💡 Contributing
Pull requests and issues are welcome! Please open an issue or PR on [GitHub](https://github.com/yourusername/material-datatables).
