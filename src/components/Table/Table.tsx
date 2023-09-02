import React, { FC } from 'react'
import { Table as AntdTable, TableProps } from 'antd'
import styled from 'styled-components'

interface CustomTableProps<T> extends TableProps<T> {
  ellipsisStyle?: React.CSSProperties
}

export const Table: FC<CustomTableProps<any>> = ({
  columns,
  dataSource,
  onChange,
  pagination,
  ...rest
}) => {
  return (
    <TableWrapper>
      <AntdTable
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        rowKey='id'
        showSorterTooltip={false}
        tableLayout='fixed'
        scroll={{ x: '100vw' }}
        size='small'
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
    </TableWrapper>
  )
}
export const ellipsisStyle = {
  style: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}

const TableWrapper = styled.div`
  thead th.ant-table-cell {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  :where(.css-dev-only-do-not-override-1xb5ddc).ant-table-wrapper
    .ant-table-tbody
    > tr
    > td {
    padding: 4px !important;
  }
  /* .ant-table-fixed {
    table-layout: fixed;
  }

  .ant-table-tbody > tr > td {
    word-wrap: break-word;
    word-break: break-all;
  } */
`
