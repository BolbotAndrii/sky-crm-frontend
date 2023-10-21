import React, { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Select,
  InputNumber,
  notification,
  Spin,
} from 'antd'
import { countryCodes } from 'utils/countryCodes'
import { createGeo, deleteGeoUnit } from 'api/geo'
import { useGeo } from 'hooks/useGeo'

const { Option } = Select

const inintValue = {
  country: ['UA'],
  offer: 'offer',
  priority: 1,
  limits: 50,
  current_count: 0,
}

interface IProps {
  companyId: string
}
export const LeadSetupForm: FC<IProps> = ({ companyId }) => {
  const [form] = Form.useForm()
  const { geo, loading, error } = useGeo(companyId)
  const onSubmit = async () => {
    try {
      const data = form.getFieldsValue()
      await form.validateFields()

      const res = await createGeo({ office_id: companyId, ...data })

      form.setFieldsValue(res)
      notification.success({ message: 'GEO was created successfully!' })
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Something went wrong!' })
    }
  }

  const handleDeleteGeoUnit = async key => {
    try {
      const array = form.getFieldsValue()?.items
      const geoId = array?.[key]?._id

      if (geoId) {
        await deleteGeoUnit({ officeId: companyId, geoId })
        notification.success({ message: 'GEO was deleted successfully!' })
      }
    } catch (error) {
      console.error(error)
      notification.error({ message: 'Something went wrong!' })
    }
  }

  useEffect(() => {
    if (geo?.id) {
      form.setFieldsValue(geo)
    }
  }, [geo])
  return (
    <Spin spinning={loading}>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name='geos'
        style={{ maxWidth: 600 }}
        autoComplete='off'
        initialValues={{ items: [inintValue] }}
        onFinish={onSubmit}
      >
        <Form.List name='items'>
          {(fields, { add, remove }) => (
            <div
              style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}
            >
              {fields.map(field => (
                <Card
                  size='small'
                  title={`GEO ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        handleDeleteGeoUnit(field.key)
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
                    <Select
                      mode='multiple'
                      showSearch
                      style={{ width: '100%' }}
                    >
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
                    name={[field.name, 'limits']}
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
        <Button style={{ marginTop: '20px' }} onClick={onSubmit} block>
          Create
        </Button>
      </Form>
    </Spin>
  )
}
