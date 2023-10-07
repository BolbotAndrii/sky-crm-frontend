import React from 'react'
import { Popconfirm, Tooltip, Spin } from 'antd'
import {
  LoadingOutlined,
  DeleteOutlined,
  EditOutlined,
  CopyOutlined,
  CloseOutlined,
  FolderViewOutlined,
  FolderAddOutlined,
} from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />

export const Button = ({
  type,
  action,
  preloader,
  tooltip,
  popConfirm,
  tooltipPlacement = 'top',
  disabled,
  getPopupContainer,
  popConfirmPosition,
}) => {
  let buttonColor = ''
  let icon = ''
  switch (type) {
    case 'delete': {
      icon = <DeleteOutlined />
      break
    }
    case 'view': {
      icon = <FolderViewOutlined />
      break
    }

    case 'close': {
      icon = <CloseOutlined />
      break
    }
    case 'add': {
      icon = <FolderAddOutlined />

      break
    }
    case 'edit': {
      icon = <EditOutlined />
      break
    }
    case 'copy': {
      icon = <CopyOutlined />
      break
    }

    default: {
      break
    }
  }
  const onCancelConfirm = () => {}
  const onClickWhenPopConfirm = e => e.preventDefault()

  return !preloader ? (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <Popconfirm
        placement={popConfirmPosition ? popConfirmPosition : 'rightTop'}
        title={
          /\?$/.test(popConfirm)
            ? popConfirm
            : `Are you sure you want to ${type} ${popConfirm}?`
        }
        onConfirm={action}
        onCancel={onCancelConfirm}
        okText='Yes'
        cancelText='No'
        disabled={!popConfirm || disabled}
        getPopupContainer={getPopupContainer ? getPopupContainer : undefined}
      >
        <button
          className={`btn btn-light ${type}${disabled ? ' disabled' : ''}`}
          onClick={!popConfirm ? action : onClickWhenPopConfirm}
          disabled={!!preloader || disabled}
        >
          {icon}
        </button>
      </Popconfirm>
    </Tooltip>
  ) : (
    <button className={`btn btn-light ${type}`}>
      {<Spin indicator={antIcon} />}
    </button>
  )
}
