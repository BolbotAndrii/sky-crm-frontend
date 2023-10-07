import React, { useState, FC } from 'react'
import { ILead } from 'types/Lead'

import { countryCodes } from 'utils/countryCodes'
import { AutoComplete, Form, Input, Select, Button } from 'antd'
import { STATUS, STATUS_TITLE } from '../types'

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
  lead: ILead
  handleUpdateLead: (leadId: ILead['id'], data: ILead) => Promise<ILead>
}

export const LeadForm: FC<IProps> = ({ lead, handleUpdateLead }) => {
  const [form] = Form.useForm()
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([])

  const onFinish = (values: any) => {
    handleUpdateLead(lead.id, values)
    console.log('Received values of form: ', values)
  }

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([])
    } else {
      setAutoCompleteResult(
        ['.com', '.org', '.net'].map(domain => `${value}${domain}`),
      )
    }
  }

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }))

  return (
    <Form
      {...formItemLayout}
      form={form}
      name='register'
      onFinish={onFinish}
      initialValues={lead}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name='current_status'
        label='Status'
        rules={[{ required: true, message: 'Please select status!' }]}
      >
        <Select placeholder='Select your status'>
          <Option value={STATUS.NEW}>{STATUS_TITLE[STATUS.NEW]}</Option>
          <Option value={STATUS.DUPLICATE}>
            {STATUS_TITLE[STATUS.DUPLICATE]}
          </Option>
          <Option value={STATUS.NOT_SEND}>
            {STATUS_TITLE[STATUS.NOT_SEND]}
          </Option>
          <Option value={STATUS.SUCCESS}>{STATUS_TITLE[STATUS.SUCCESS]}</Option>
          <Option value={STATUS.TRASH}>{STATUS_TITLE[STATUS.TRASH]}</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='affilate'
        label='Affilate'
        rules={[{ required: false, message: 'Please select affilate!' }]}
      >
        <Select placeholder='Select your affilate'>
          {/* <Option value={STATUS.NEW}>{STATUS_TITLE[STATUS.NEW]}</Option>
          <Option value={STATUS.DUPLICATE}>
            {STATUS_TITLE[STATUS.DUPLICATE]}
          </Option>
          <Option value={STATUS.NOT_SEND}>
            {STATUS_TITLE[STATUS.NOT_SEND]}
          </Option>
          <Option value={STATUS.SUCCESS}>{STATUS_TITLE[STATUS.SUCCESS]}</Option>
          <Option value={STATUS.TRASH}>{STATUS_TITLE[STATUS.TRASH]}</Option> */}
        </Select>
      </Form.Item>
      <Form.Item
        name='first_name'
        label='First Name'
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='last_name'
        label='Last Name'
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='email'
        label='E-mail'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='phone_code'
        label='Phone Code'
        rules={[{ required: true, message: 'Please input your phone code!' }]}
      >
        <Select showSearch style={{ width: '100%' }}>
          {countryCodes.map(country => (
            <Option key={country.dial_code} value={country.dial_code}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span>{country.dial_code}</span>
                <span>{country.emoji}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='phone'
        label='Phone'
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name='country'
        label='Country'
        rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <Select showSearch style={{ width: '100%' }}>
          {countryCodes.map(country => (
            <Option key={country.dial_code} value={country.name}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span>{country.name}</span>
                <span>{country.emoji}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='country_code'
        label='Country Code'
        rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <Select showSearch style={{ width: '100%' }}>
          {countryCodes.map(country => (
            <Option key={country.dial_code} value={country.code}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span>{country.code}</span>
                <span>{country.emoji}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='geo'
        label='Geo'
        rules={[{ required: true, message: 'Please input your geo!' }]}
      >
        <Select showSearch style={{ width: '100%' }}>
          {countryCodes.map(country => (
            <Option key={country.dial_code} value={country.code}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span>{`${country.code} ${country.name}`}</span>
                <span>{country.emoji}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='language'
        label='Lang'
        rules={[{ required: true, message: 'Please input your lang!' }]}
      >
        <Select showSearch style={{ width: '100%' }}>
          {countryCodes.map(country => (
            <Option key={country.dial_code} value={country.code}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span>{country.code}</span>
                <span>{country.emoji}</span>
              </div>
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name='lead_password'
        label='Password'
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='offer'
        label='Offer'
        rules={[{ required: true, message: 'Please input offer name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='domain'
        label='Domain'
        rules={[{ required: true, message: 'Please input domain !' }]}
      >
        <AutoComplete
          options={websiteOptions}
          onChange={onWebsiteChange}
          placeholder='Domain'
        >
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name='ip'
        label='IP'
        rules={[
          {
            required: true,
            message: 'Please input your IP',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='buyer'
        label='Buyer'
        rules={[
          {
            required: true,
            message: 'Please input your buyer',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='click_id'
        label='Click_ID'
        rules={[
          {
            required: true,
            message: 'Please input your click_id',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='account'
        label='Account'
        rules={[
          {
            required: true,
            message: 'Please input your account',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='comment'
        label='Comment'
        rules={[{ required: false, message: 'Please input comment' }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type='primary' htmlType='submit'>
          Update
        </Button>
      </Form.Item>
    </Form>
  )
}
