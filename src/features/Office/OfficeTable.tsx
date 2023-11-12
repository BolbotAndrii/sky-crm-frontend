import React, { useEffect, useState, useMemo } from 'react'

import { Tooltip, Button } from 'antd'

import { Table } from 'components/Table/Table'

import { PaginationConfig } from 'antd/lib/pagination'

import { SorterResult } from 'antd/lib/table/interface'

import { ColumnProps } from 'antd/lib/table'
import { toggleLoading } from 'store/ui/UISlice'
import { useDispatch } from 'react-redux'
import { IOffice } from 'types/Office'
import { getOfficeList, deleteOfficeById } from 'api/office'
import moment from 'moment-timezone'
import { TableActions } from 'components/TableActions/TableActions'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const renderTitle = name => (
  <Tooltip placement='topLeft' title={name}>
    {name}
  </Tooltip>
)

export const OfficeTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState<IOffice[]>([])
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
      const { data, meta } = await getOfficeList(params)
      setData(data)
      setPagination(meta)
    } catch ({ response }) {
      console.error(response)
    } finally {
      setLoading(false)
      setTimeout(() => dispatch(toggleLoading(false)), 2000)
    }
  }

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Partial<Record<keyof IOffice, string[]>>,
    sorter: SorterResult<IOffice>,
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

  const handleDeleteOffice = async id => {
    try {
      await deleteOfficeById({ id })
      setData(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const tableActionProps = (record: IOffice) => ({
    todos: ['delete', 'edit'],
    callbacks: [
      () => handleDeleteOffice(record.id),
      () => navigate(`/offices/${record.id}`),
    ],

    disabled: [false, false, true],
    tooltips: ['Remove this office?', 'Open this office in the new tab?'],
    popConfirms: ['Are you sure that you want to delete this office?'],
  })

  const columns: ColumnProps<IOffice[]> = useMemo(
    () => [
      {
        title: renderTitle('Status'),
        dataIndex: 'status',
        sorter: true,
        render: value => <p>{value === 1 ? 'Active' : 'Inactive'}</p>,
        width: 100,
      },
      {
        title: renderTitle('Title'),
        dataIndex: 'title',
        sorter: true,
        width: 200,
      },
      {
        title: renderTitle('Description'),
        dataIndex: 'description',
        sorter: true,
        width: 200,
      },
      {
        title: renderTitle('GEO'),
        dataIndex: 'geos',
        sorter: true,
        width: 100,
      },
      {
        title: renderTitle('Priority'),
        dataIndex: 'priority',
        sorter: true,
        width: 100,
      },
      {
        title: renderTitle('Status'),
        dataIndex: 'status',
        sorter: true,
        width: 200,
      },
      {
        title: renderTitle('Time of Work'),
        dataIndex: 'time_cards',
        sorter: true,
        render: time => (
          <p>{`${moment(time.time_start).format('HH:MM')}-${moment(
            time.time_end,
          ).format('HH:mm')}`}</p>
        ),
        width: 200,
      },
      {
        title: renderTitle('Created at'),
        dataIndex: 'created_at',
        sorter: true,
        width: 150,
        render: data => moment(data).format('DD/MM/YYYY HH:mm'),
        width: 200,
      },
      {
        title: renderTitle('Updated_at'),
        dataIndex: 'updated_at',
        sorter: true,
        width: 150,
        render: data => moment(data).format('DD/MM/YYYY HH:mm'),
        width: 200,
      },
      {
        title: renderTitle('Actions'),
        dataIndex: 'actions',
        align: 'center',

        fixed: 'right',
        render: (value, record) => (
          <TableActions {...tableActionProps(record)} />
        ),
        width: 80,
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
    <Wrapper>
      <Button
        onClick={() => navigate('/offices/new')}
        style={{ marginBottom: '10px' }}
      >
        Create New Office
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={onRow}
        rowSelection={rowSelection}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div``
