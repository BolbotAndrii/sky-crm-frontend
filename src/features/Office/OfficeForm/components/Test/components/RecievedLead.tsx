import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Select, message } from 'antd'
import { generateVariables } from 'features/Office/utils'
import { createPublicLead } from 'api/leads'

const variables = generateVariables()

const arrayToObj = arr => {
  const result = {}
  arr.forEach(item => {
    result[item.key] = item.value
  })
  return result
}

export const RecievedLead = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      const res = await createPublicLead(arrayToObj(values.lead))
      message.success('Lead created!')
    } catch (error) {
      message.error(error?.response?.data?.message)
    }
  }
  return (
    <Form
      name='recieved-lead'
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete='off'
      form={form}
    >
      <Form.List name='lead'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align='baseline'
              >
                <Form.Item
                  {...restField}
                  name={[name, 'key']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Select style={{ width: '200px' }} options={variables} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'value']}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder='Value' />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
