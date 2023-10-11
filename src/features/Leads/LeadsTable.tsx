import React, { useEffect, useState, useMemo } from 'react'

import { Tooltip, Modal } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import { Table } from 'components/Table/Table'

import { PaginationConfig } from 'antd/lib/pagination'

import { SorterResult } from 'antd/lib/table/interface'

import { ColumnProps } from 'antd/lib/table'
import { toggleLoading } from 'store/ui/UISlice'
import { useDispatch } from 'react-redux'
import { getLeadsList, deleteLead, updateLead } from 'api/leads'
import { ILead } from 'types/Lead'
import moment from 'moment-timezone'
import { STATUS_TITLE, STATUS_COLOR, STATUS } from './types'
import styled from 'styled-components'
import { TableActions } from 'components/TableActions/TableActions'
import { LeadForm } from './LeadForm/LeadForm'
import { SearchFilter } from 'components/Table/components/SearchFilter'
import { DateRangeFilter } from 'components/Table/components/DateRangeFilter'
import { useOffice } from 'hooks/useOffices'

const linkStyle = {
  color: '#1890ff',
  textDecoration: 'underline',
  cursor: 'pointer',
}

const statusFilter = [
  {
    text: 'NEW',
    value: STATUS.NEW,
  },
  {
    text: 'DUPLICATE',
    value: STATUS.DUPLICATE,
  },
  {
    text: 'NOT SENT',
    value: STATUS.NOT_SEND,
  },
  {
    text: 'SUCCESS',
    value: STATUS.SUCCESS,
  },
  {
    text: 'TRASH',
    value: STATUS.TRASH,
  },
]

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  country: '',
  password: '',
  lead_password: '',
  offer: '',
  domain: '',
  click_id: '',
  comment: '',
  ip: '',
  office_id: '',
  status: '',
}

const renderTitle = name => (
  <Tooltip placement='topLeft' title={name}>
    {name}
  </Tooltip>
)

const renderStatus = statusObj => {
  if (typeof statusObj === 'number') {
    return (
      <StatusWrapper color={STATUS_COLOR[statusObj]}>
        {STATUS_TITLE[statusObj]}
      </StatusWrapper>
    )
  }
  const lastStatus = statusObj?.statuses?.[0]?.status

  if (!lastStatus) return '-'

  return (
    <Tooltip
      title={statusObj?.statuses.map((item, idx) => (
        <p key={idx}>
          <span>{STATUS_TITLE[item.status]}</span>
          <span>-</span>
          <span>{moment(item?.created_at).format('DD/MM/YYYY HH:mm')}</span>
        </p>
      ))}
    >
      <StatusWrapper color={STATUS_COLOR[lastStatus]}>
        {STATUS_TITLE[lastStatus]}
      </StatusWrapper>
    </Tooltip>
  )
}

export const LeadsTable = () => {
  const dispatch = useDispatch()
  const { office } = useOffice()
  const [data, setData] = useState<ILead[]>([])
  const [lead, setLead] = useState<ILead>(initialState)
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 25,
    total: 10,
  })

  const [clickedRowIndex, setClickedRowIndex] = useState<number | null>(null)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [checkedRows, setCheckedRows] = useState([])

  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = (lead: ILead) => {
    setOpenModal(true)
    setLead(lead)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const fetchList = async (params?: object) => {
    setLoading(true)
    try {
      const { data, meta } = await getLeadsList(params)
      setData(data)
      setPagination(meta)
    } catch ({ response }) {
      console.error(response)
    } finally {
      setTimeout(() => dispatch(toggleLoading(false)), 2000)
      setLoading(false)
    }
  }

  const handleDeleteLead = async (leadId: ILead['id']) => {
    try {
      await deleteLead(leadId)
      setData(prev => prev.filter(item => item.id !== leadId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateLead = async (leadId: ILead['id'], data: ILead) => {
    try {
      await updateLead(leadId, data)
      handleCloseModal()
      await fetchList({
        page: 1,
        per_page: pagination.per_page,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Partial<Record<keyof ILead, string[]>>,
    sorter: SorterResult<ILead>,
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

  const tableActionProps = (record: ILead) => ({
    todos: ['delete', 'edit'],
    callbacks: [
      () => handleDeleteLead(record.id),
      () => handleOpenModal(record),
    ],

    disabled: [false, false, true],
    tooltips: ['Remove this lead?', 'Open this lead in the new tab?'],
    popConfirms: ['Are you sure that you want to delete this lead?'],
  })

  const columns: ColumnProps<ILead> = useMemo(
    () => [
      {
        title: renderTitle('First Name'),
        dataIndex: 'first_name',
        sorter: true,
        width: 200,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='First Name' {...props} />
        ),
      },
      {
        title: renderTitle('Last Name'),
        dataIndex: 'last_name',
        sorter: true,
        width: 200,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='Last Name' {...props} />
        ),
      },
      {
        title: renderTitle('Phone'),
        dataIndex: 'phone',
        sorter: true,
        width: 200,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='Phone' {...props} />
        ),
      },
      {
        title: renderTitle('Phone Code'),
        dataIndex: 'phone_code',
        sorter: true,
        width: 200,
      },
      {
        title: renderTitle('Email'),
        dataIndex: 'email',
        sorter: true,
        width: 200,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='Email' {...props} />
        ),
      },
      {
        title: renderTitle('Country'),
        dataIndex: 'country',
        sorter: true,
        width: 80,
      },
      {
        title: renderTitle('Country Code'),
        dataIndex: 'country_code',
        sorter: true,
        width: 120,
      },
      {
        title: renderTitle('Domain'),
        dataIndex: 'domain',
        sorter: true,
        width: 200,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='Email' {...props} />
        ),
      },
      {
        title: renderTitle('Language'),
        dataIndex: 'language',
        sorter: true,
        width: 200,
      },
      {
        title: renderTitle('Password'),
        dataIndex: 'lead_password',
        sorter: true,
        width: 200,
      },
      {
        title: renderTitle('Offer'),
        dataIndex: 'offer',
        sorter: true,
        width: 200,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='Email' {...props} />
        ),
      },
      {
        title: renderTitle('Affilate'),
        dataIndex: 'affilate',
        sorter: true,
        width: 200,
        filters: office?.map(item => ({ value: item.id, text: item.title })),
      },

      {
        title: renderTitle('Status'),
        dataIndex: 'current_status',
        sorter: true,
        width: 150,
        render: renderStatus,
        filters: statusFilter,
      },

      {
        title: renderTitle('Click ID'),
        dataIndex: 'click_id',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Comment'),
        dataIndex: 'comment',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Buyer'),
        dataIndex: 'buyer',
        sorter: true,
        width: 150,
        filterDropdown: (props: FilterDropdownProps) => (
          <SearchFilter title='Email' {...props} />
        ),
      },
      {
        title: renderTitle('Account'),
        dataIndex: 'account',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('IP'),
        dataIndex: 'ip',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Param 1'),
        dataIndex: 'param_1',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Param 2'),
        dataIndex: 'param_2',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Param 3'),
        dataIndex: 'param_3',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Param 4'),
        dataIndex: 'param_4',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Param 5'),
        dataIndex: 'param_5',
        sorter: true,
        width: 150,
      },

      {
        title: renderTitle('Param 6'),
        dataIndex: 'param_6',
        sorter: true,
        width: 150,
      },
      {
        title: renderTitle('Created at'),
        dataIndex: 'created_at',
        sorter: true,
        width: 150,
        render: data => moment(data).format('DD/MM/YYYY HH:mm'),
        filterDropdown: (props: FilterDropdownProps) => (
          <DateRangeFilter {...props} />
        ),
      },
      {
        title: renderTitle('Updated_at'),
        dataIndex: 'updated_at',
        sorter: true,
        width: 150,
        render: data => moment(data).format('DD/MM/YYYY HH:mm'),
        filterDropdown: (props: FilterDropdownProps) => (
          <DateRangeFilter {...props} />
        ),
      },
      {
        title: renderTitle('Actions'),
        dataIndex: 'actions',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (value, record) => (
          <TableActions {...tableActionProps(record)} />
        ),
      },
    ],
    [clickedRowIndex, office],
  )

  console.log(office, 'office')

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

      <Modal
        centered
        destroyOnClose
        title='Lead'
        open={openModal}
        onCancel={handleCloseModal}
        footer={[]}
      >
        <LeadForm lead={lead} handleUpdateLead={handleUpdateLead} />
      </Modal>
    </>
  )
}

interface StyleProps {
  color: string
}
const StatusWrapper = styled.div<StyleProps>`
  padding: 4px 10px;
  background-color: ${props => props.color};
  text-align: center;
  border-radius: 5px;
  font-weight: bold;
`
