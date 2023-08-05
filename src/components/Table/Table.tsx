import React, { FC } from 'react'
import { Table as AntdTable, TableProps } from 'antd'

export const Table: FC<TableProps<any>> = ({
  columns,
  dataSource,
  onChange,
  pagination,
  ...rest
}) => {
  return (
    <AntdTable
      columns={columns}
      dataSource={dataSource}
      onChange={onChange}
      rowKey='id'
      showSorterTooltip={false}
      tableLayout='fixed'
      pagination={
        pagination
          ? {
              position: ['bottomRight'],
              showSizeChanger: true,
              pageSizeOptions: ['25', '50', '100', '250', '500'],
              total: pagination?.total ?? 25,
              pageSize: pagination.page_size,
              size: 'small',
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }
          : false
      }
      {...rest}
    />
  )
}
