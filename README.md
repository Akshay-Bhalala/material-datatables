# material-datatables

A fully-featured, customizable Material UI Data Table React component with sorting, filtering, pagination, selection, column management, and more. Built for flexibility, performance, and a beautiful, professional UI.

---

## ✨ Features
- Dynamic columns and rows
- Pagination with selectable page sizes
- Column sorting (ASC/DESC)
- Per-column and global filtering
- Column visibility toggle and management
- Row selection (checkboxes, select all)
- **Modern, responsive, and attractive UI**
- **Large, white, rounded card layout with shadow**
- **Customizable, bold, centered table title inside the card**
- **Toolbar with aligned controls (column selector, search, download, actions)**
- **Dark background with light table for high contrast**
- **CSS module-based styling for easy customization**
- Responsive design
- Customizable styles via `sx`, `themeOverrides`, and props
- Custom toolbar actions, search, and CSV download
- Accessibility (ARIA attributes)
- Virtualization-ready for large data sets
- TypeScript support

---

## 🖼️ Screenshot

![mui-datatable-screenshot](public/mui-datatable-screenshot.png)

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
import { MuiDataTable } from 'material-datatables';

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

export default function DemoTable() {
  return (
    <MuiDataTable
      title="User List"
      columns={columns}
      rows={rows}
      showSearch
      showDownload
      checkboxSelection
      pagination={{ page: 0, pageSize: 10, pageSizeOptions: [5, 10, 25] }}
      tableColor="#fff"
      tableTextColor="#222"
      rowHeight={48}
      sx={{ borderRadius: 8, boxShadow: '0 2px 8px #eee' }}
      // You can also use className or themeOverrides for further customization
    />
  );
}
```

---

## 🧩 UI Structure

- The table is displayed inside a **large, white, rounded card** with a subtle shadow, centered on a dark background.
- The **title** appears as a bold, centered heading at the top of the card, customizable via the `title` prop.
- The **toolbar** sits below the title, with all controls (column selector, search, download, custom actions) aligned in a single row and visually separated by a border.
- The **table** is full-width, with clear headers, zebra striping, hover and selected row effects, and responsive design.
- **Pagination** controls are aligned to the bottom right of the card.
- All controls are accessible and visually organized for a professional, MUI-like appearance.

---

## 📑 Props API

| Prop                    | Type                        | Description |
|-------------------------|-----------------------------|-------------|
| `title`                 | `string`                    | Table title, shown as a bold, centered heading inside the card |
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
- **Styling:**
  - The table uses a CSS module (`MuiDataTable.module.css`) for all layout and visual styles, including the card, title, toolbar, table, and pagination.
  - You can override styles by providing your own CSS module or by using the `className`, `sx`, or `themeOverrides` props.
  - The default look is a dark background with a large, white, rounded card, a bold, centered title, and a modern, MUI-like toolbar and table.
- **Title:** Use the `title` prop to set a custom table title, which appears as a bold, centered heading inside the card.
- **Toolbar:** Add custom actions, search, and download. All controls are aligned and visually separated for clarity.
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
