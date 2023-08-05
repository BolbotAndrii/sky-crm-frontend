import React, { useEffect, useState, useMemo } from 'react'

import { Tooltip } from 'antd'

import { Table } from 'components/Table/Table'

import { PaginationConfig } from 'antd/lib/pagination'

import { SorterResult } from 'antd/lib/table/interface'

import { ColumnProps } from 'antd/lib/table'
import { toggleLoading } from 'store/ui/UISlice'
import { useDispatch } from 'react-redux'

const linkStyle = {
  color: '#1890ff',
  textDecoration: 'underline',
  cursor: 'pointer',
}

const renderTitle = name => (
  <Tooltip placement='topLeft' title={name}>
    {name}
  </Tooltip>
)

export const LeadsTable = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState<[]>([])
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 25,
    total: 10,
  })

  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkedRows, setCheckedRows] = useState([])

  const fetchList = async (params?: object) => {
    setLoading(true)
    try {
      // const { clients, meta } = await getClientsList(params)
      // setData(
      //   clients?.map((item: IClient, index: number) => ({
      //     ...item,
      //     key: index,
      //   })),
      // )
      // setPagination(meta)
    } catch ({ response }) {
      console.error(response)
    } finally {
      setTimeout(() => dispatch(toggleLoading(false)), 2000)
      setLoading(false)
    }
  }

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Partial<Record<keyof object, string[]>>,
    sorter: SorterResult<object>,
  ) => {
    fetchList({
      page: pagination.current,
      sort_field: sorter.order ? sorter.field : null,
      order:
        sorter.order === 'ascend'
          ? 'asc'
          : sorter.order === 'descend'
          ? 'desc'
          : null,
      per_page: pagination.pageSize,
      ...filters,
    })
  }

  const columns: ColumnProps<any> = useMemo(
    () => [
      {
        title: renderTitle('Column#1'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#2'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#3'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#4'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#5'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#6'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#7'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#8'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#9'),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: renderTitle('Column#10'),
        dataIndex: 'name',
        sorter: true,
      },
    ],
    [clickedRowIndex],
  )

  const onRow = (record: any, rowIndex: number) => ({
    onClick: () => {
      setClickedRowIndex(rowIndex)
    },
  })

  const rowSelection = {
    selectedRowKeys,
    columnWidth: 30,
    onChange: (
      selectedRowKeys: React.SetStateAction<never[]>,
      selectedRows: {
        map: (arg0: (row: any) => any) => React.SetStateAction<never[]>
      },
    ) => {
      setCheckedRows(
        selectedRows.map(row => ({ ...row, display_info: row.name })),
      )
      setSelectedRowKeys(selectedRowKeys)
    },
    getCheckboxProps: (record: object) => ({
      name: record.dataIndex,
    }),
  }

  useEffect(() => {
    fetchList({
      page: 1,
      per_page: pagination.per_page,
    })
  }, [])

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={onRow}
        rowSelection={rowSelection}
      />
    </>
  )
}
