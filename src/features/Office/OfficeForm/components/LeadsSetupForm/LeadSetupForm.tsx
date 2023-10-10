import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, Space, Select, InputNumber } from 'antd'
import { countryCodes } from 'utils/countryCodes'

const { Option } = Select

interface IProps {
  companyId: string
}
export const LeadSetupForm: FC<IProps> = ({ companyId }) => {
  const [form] = Form.useForm()
  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name='dynamic_form_complex'
      style={{ maxWidth: 600 }}
      autoComplete='off'
      initialValues={{ geos: [{}] }}
    >
      <Form.List name='items'>
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map(field => (
              <Card
                size='small'
                title={`GEO ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                  />
                }
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please input value!',
                    },
                  ]}
                  label='Country'
                  name={[field.name, 'country']}
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
                  rules={[
                    {
                      required: true,
                      message: 'Please input value!',
                    },
                  ]}
                  label='Offer'
                  name={[field.name, 'offer']}
                >
                  <Input placeholder='Offer' />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please select value!',
                    },
                  ]}
                  label='Priority'
                  name={[field.name, 'priority']}
                >
                  <Select showSearch style={{ width: '100%' }}>
                    <Option key={'1'} value={1}>
                      1
                    </Option>
                    <Option key={'2'} value={2}>
                      2
                    </Option>
                    <Option key={'3'} value={3}>
                      2
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name='limit'
                  label='Leads Limit Per Day'
                  rules={[
                    {
                      required: true,
                      message: 'Please input value!',
                    },
                  ]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Card>
            ))}

            <Button type='dashed' onClick={() => add()} block>
              + Add GEO
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  )
}
