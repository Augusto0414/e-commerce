import DataTable, { TableColumn } from 'react-data-table-component'

interface TableViewProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const TableView = <T,>({ data, columns }: TableViewProps<T>) => {
  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        pagination
        fixedHeader
      />
    </div>
  )
}

export default TableView
