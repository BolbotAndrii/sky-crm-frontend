import React, { FC, useState } from 'react'

import { Button, Form, Input, Select, TimePicker } from 'antd'
import styled from 'styled-components'

const { Option } = Select

interface DataNodeType {
  value: string
  label: string
  children?: DataNodeType[]
}

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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

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
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input description' }]}
        >
          <Input.TextArea showCount maxLength={1000} />
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
