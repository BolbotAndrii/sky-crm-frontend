import React, { useEffect, useState, useMemo } from 'react'

import { Tooltip, message, Button } from 'antd'

import { Table } from 'components/Table/Table'

import { PaginationConfig } from 'antd/lib/pagination'

import { SorterResult } from 'antd/lib/table/interface'

import { ColumnProps } from 'antd/lib/table'
import { toggleLoading } from 'store/ui/UISlice'
import { useDispatch } from 'react-redux'
import { getUsersList, deleteUser } from 'api/users'
import { IUser } from 'types/User'
import moment from 'moment-timezone'
import { DATE_FORMAT } from 'constants/dateFormat'
import { Avatar } from 'components/Avatar/Avatar'
import { renderUserStatus, renderUserRole, renderUserColor } from 'helpers/user'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from 'routes/types'
import { TableActions } from 'components/TableActions/TableActions'

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

export const UsersTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState<IUser[]>([])
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 25,
    total: 10,
  })

  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)

  const fetchList = async (params?: object) => {
    setLoading(true)
    try {
      const { data, meta } = await getUsersList(params)

      setData(data)
      setPagination(meta)
    } catch ({ response }) {
      console.error(response)
    } finally {
      setTimeout(() => dispatch(toggleLoading(false)), 2000)
      setLoading(false)
    }
  }

  const handleDeleteUser = async userId => {
    try {
      await deleteUser({ userId })
      setData(prev => prev.filter(user => user.id !== userId))
      message.success('User was deleted!')
    } catch (error) {
      console.error(error)
    }
  }

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Partial<Record<keyof IUser, string[]>>,
    sorter: SorterResult<IUser>,
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

  const tableActionProps = (record: IUser) => ({
    todos: ['delete', 'edit'],
    callbacks: [
      () => handleDeleteUser(record.id),
      () => navigate(`${RoutesPath.TEAM}/${record.id}`),
    ],

    disabled: [false, false, true],
    tooltips: ['Remove this user?', 'Open this lead in the new tab?'],
    popConfirms: ['Are you sure that you want to delete this user?'],
  })

  const columns: ColumnProps<IUser>[] = useMemo(
    () => [
      {
        title: renderTitle('Logo'),
        dataIndex: 'user_logo',
        sorter: false,
        align: 'center',
        width: 70,
        render: (avatar, record) => (
          <Avatar color={'#1668dc'}>
            {record.first_name + ' ' + record.last_name}
          </Avatar>
        ),
      },
      {
        title: renderTitle('First Name'),
        dataIndex: 'first_name',
        filterSearch: true,
        align: 'center',
        width: 200,
        sorter: true,
      },
      {
        title: renderTitle('Last Name'),
        dataIndex: 'last_name',
        filterSearch: true,
        align: 'center',
        width: 200,
        sorter: true,
      },
      {
        title: renderTitle('Role'),
        dataIndex: 'role_id',
        sorter: true,
        align: 'center',
        width: 100,
        render: role => renderUserRole(role),
      },
      {
        title: renderTitle('Title'),
        dataIndex: 'title',
        align: 'center',
        width: 200,
        sorter: true,
        render: title => title || '-',
      },
      {
        title: renderTitle('User Identifier'),
        dataIndex: 'user_identifier',
        align: 'center',
        width: 70,
        sorter: true,
        render: title => title || '-',
      },
      {
        title: renderTitle('Status'),
        dataIndex: 'status',
        sorter: true,
        width: 100,
        align: 'center',
        render: status => renderUserStatus(status),
      },
      {
        title: renderTitle('Email'),
        dataIndex: 'email',
        sorter: true,
        width: 200,
        align: 'center',
      },
      {
        title: renderTitle('Color'),
        dataIndex: 'background_color',
        sorter: true,
        width: 50,
        align: 'center',
        render: color => renderUserColor(color),
      },
      {
        title: renderTitle('Notes'),
        dataIndex: 'notes',
        align: 'center',
        width: 200,
        sorter: true,
        render: title => title || '-',
      },
      {
        title: renderTitle('Created_at'),
        dataIndex: 'created_at',
        sorter: true,
        width: 200,
        render: data => moment(data).format(DATE_FORMAT),
      },
      {
        title: renderTitle('Updated at'),
        dataIndex: 'updated_at',
        sorter: true,
        width: 200,
        render: data => moment(data).format(DATE_FORMAT),
      },
      {
        title: renderTitle('Actions'),
        name: 'Actions',
        dataIndex: 'actions',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (value, record) => (
          <TableActions {...tableActionProps(record)} />
        ),
      },
    ],
    [clickedRowIndex],
  )

  const onRow = (record: IUser, rowIndex: number) => ({
    onClick: () => {
      setClickedRowIndex(rowIndex)
      navigate(`${RoutesPath.TEAM}/${record.id}`)
    },
  })

  useEffect(() => {
    fetchList({
      page: 1,
      per_page: 25,
    })
  }, [])

  return (
    <>
      <Button
        style={{ marginBottom: '10px' }}
        onClick={() => navigate(`${RoutesPath.TEAM}/new`)}
      >
        Create New
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleTableChange}
        onRow={onRow}
      />
    </>
  )
}
