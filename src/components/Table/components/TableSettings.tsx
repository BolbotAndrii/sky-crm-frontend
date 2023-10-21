import React, { FC } from 'react'
import { Drawer, DrawerProps, Checkbox } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

import styled from 'styled-components'

interface Props extends DrawerProps {
  onChange: (e: CheckboxValueType[]) => void
  columns: ColumnProps<any>
  value: string[]
}

export const TableSettings: FC<Props> = ({
  onClose,
  open,
  onChange,
  columns,
  value,
  ...rest
}) => {
  return (
    <Drawer
      title='Settings'
      placement='right'
      onClose={onClose}
      open={open}
      {...rest}
    >
      <Items>
        <Checkbox.Group
          className='settings-checkbox'
          options={columns?.map(column => ({
            label: column.name,
            value: column.dataIndex,
          }))}
          value={value}
          onChange={onChange}
        />
      </Items>
    </Drawer>
  )
}

const Items = styled.div`
  & .settings-checkbox {
    display: flex;
    flex-direction: column;
  }
`
