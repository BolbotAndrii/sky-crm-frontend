import React, { FC, useEffect, useState } from 'react'
import { createOffice, updateOffice } from 'api/office'
import { Button, Form, Input, Select } from 'antd'
import TimePicker from 'components/TimePicker/TimePicker'
import styled from 'styled-components'
import { useOffice } from 'features/Office/hooks/useOffice'
import { useNavigate } from 'react-router-dom'
import moment from 'moment-timezone'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

interface IProps {
  companyId: string
}

export const MainForm: FC<IProps> = ({ companyId }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { office, error, loading } = useOffice(companyId)

  const [data, setData] = useState({})

  const onFinish = async (values: any) => {
    try {
      await form.validateFields()
      if (office.id) {
        const res = await updateOffice(values, { officeId: office.id })
        setData(res)
        return
      }

      const res = await createOffice(values)
      setData(res)
      navigate(`/offices/${res.id}`)
    } catch (errorInfo) {
      return false
    }
  }

  useEffect(() => {
    if (office?.id) {
      const data = {
        ...office,
        time_cards: {
          time_end: moment(office.time_cards?.time_end || moment()),
          time_start: moment(office.time_cards?.time_start || moment()),
        },
      }
      form.setFieldsValue(data)
      setData(data)
    }
  }, [office])

  return (
    <Wrapper>
      {' '}
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        initialValues={data}
      >
        <Form.Item
          name='status'
          label='Status'
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select placeholder='select your status'>
            <Option value={1}>Active</Option>
            <Option value={2}>Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='title'
          label='Title'
          tooltip='What do you want others to call you?'
          rules={[
            {
              required: true,
              message: 'Please input your title!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='priority'
          label='Priority'
          rules={[{ required: true, message: 'Please select priority!' }]}
        >
          <Select placeholder='select your priority'>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={['time_cards', 'time_start']}
          label='Work Time Start'
          rules={[
            {
              required: true,
              message: 'Please select your time start!',
            },
          ]}
        >
          <TimePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name={['time_cards', 'time_end']}
          label='Work Time End'
          rules={[
            {
              required: true,
              message: 'Please select your time start!',
            },
          ]}
        >
          <TimePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input description' }]}
        >
          <Input.TextArea showCount maxLength={1000} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            {companyId === 'new' ? 'Create' : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}
const Wrapper = styled.div``
