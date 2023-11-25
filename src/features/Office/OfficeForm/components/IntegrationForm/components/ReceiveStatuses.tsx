import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { CodeEditor } from './CodeEditor'
import {
  MinusCircleOutlined,
  PlusOutlined,
  DragOutlined,
} from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Space,
  Select,
  Divider,
  notification,
  Checkbox,
} from 'antd'
import { generateVariables, arrayToObject } from 'features/Office/utils'

import { createRequestStatus, updateRequestStatus } from 'api/status'

import { useStatuses } from 'hooks/useStatuses'

const onFinish = (values: any) => {
  console.log('Received values of form:', values)
}

interface IProps {
  companyId: string
}

export const ReceiveStatuses: FC<IProps> = ({ companyId }) => {
  const { statuses } = useStatuses(companyId)
  const [headerForm] = Form.useForm()
  const [bodyForm] = Form.useForm()
  const [responceForm] = Form.useForm()
  const [options, setOptions] = useState({
    url: '',
    method: '',
    content_type: '',
  })
  const [cron_task_data, setCron_task_data] = useState({
    active: true,
    interval: 10,
  })

  const [additional, setAdditional] = useState({
    date_format: '',
    date_interval: '',
  })

  const [responce, setResponce] = useState({
    autologin: '',
    ext_status: '',
    lead_id: '',
  })
  const [header, setHeader] = useState({})
  const [body, setBody] = useState({})
  const [inputType, setInputType] = useState('select')
  const [draggedItem, setDraggedItem] = useState(null)

  const handleChangeInputType = (type: 'select' | 'input') => {
    setInputType(type)
  }

  const handleChangeOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOptions(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleChangeHeader = () => {
    setHeader(headerForm.getFieldsValue()?.header)
  }
  const handleChangeBody = e => {
    setBody(bodyForm.getFieldsValue()?.body)
  }

  const handleChangeResponce = () => {
    setResponce(responceForm.getFieldsValue()?.responce)
  }

  const handleDrop = data => {
    setBody(currentCode => {
      const droppedItem = JSON.parse(data)

      const updatedCode = {
        ...currentCode,
        [droppedItem.label]: droppedItem.value,
      }

      return updatedCode
    })
  }

  const onSubmit = async () => {
    const office_data = {
      office_id: companyId,
      active: true,
    }

    const headers = header
    const template = body
    const response = responce

    const data = {
      office_data,
      options: options,
      headers,
      template,
      response,
      cron_task_data,
      ...additional,
    }

    try {
      await createRequestStatus(data)
      notification.success({ message: 'Statuses was created successfully!' })
    } catch (error) {
      notification.error({ message: 'Something went wrong!' })
      console.log(error)
    }
  }

  const onUpdate = async () => {
    const office_data = {
      office_id: companyId,
      active: true,
    }

    const headers = arrayToObject(header)
    const template = arrayToObject(body)
    const response = arrayToObject(responce)
    const headerOptions = arrayToObject(options)

    const data = {
      office_data,
      options: headerOptions,
      headers,
      template,
      response,
      cron_task_data,
      ...additional,
    }

    try {
      await updateRequestStatus(data, { statusesId: statuses.id })
      notification.success({ message: 'Statuses was update successfully!' })
    } catch (error) {
      notification.error({ message: 'Something went wrong!' })
      console.log(error)
    }
  }

  function transformDataForForm(inputData) {
    const data = Object.keys(inputData).map(key => ({
      name: key,
      value: inputData[key],
    }))
    return data
  }

  useEffect(() => {
    if (statuses?.id) {
      setOptions(statuses?.options)
      setHeader(statuses?.headers)
      setBody(statuses?.template)
      setResponce(statuses?.response)
      setCron_task_data(statuses.cron_task_data)
      setAdditional({
        date_format: statuses?.date_format,
        date_interval: statuses?.date_interval,
      })
      headerForm.setFieldsValue({
        header: statuses?.headers
          ? transformDataForForm(statuses?.headers)
          : [],
      })
      responceForm.setFieldsValue({
        responce: statuses?.response
          ? transformDataForForm(statuses?.response)
          : [],
      })
      bodyForm.setFieldsValue({
        template: statuses?.template
          ? transformDataForForm(statuses?.template)
          : [],
      })
    }
  }, [statuses?.id])

  return (
    <Wrapper>
      <Block>
        <BlockTitle>Getting Options</BlockTitle>
        <BlockInner
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'start',
            marginBottom: '20px',
          }}
        >
          <Checkbox
            onChange={e => {
              setCron_task_data(prev => ({ ...prev, active: e.target.checked }))
            }}
            checked={cron_task_data.active}
          >
            {' '}
            getting status automatically{' '}
          </Checkbox>
          <Select
            style={{ maxWidth: '200px' }}
            onChange={value => {
              setCron_task_data(prev => ({ ...prev, interval: value }))
            }}
            value={cron_task_data.interval}
            placeholder='Select interval'
          >
            <Select.Option value={1}>1 min.</Select.Option>
            <Select.Option value={2}>2 min.</Select.Option>
            <Select.Option value={5}>5 min.</Select.Option>
            <Select.Option value={10}>10 min.</Select.Option>
            <Select.Option value={30}>30 min.</Select.Option>
            <Select.Option value={60}>1 hrs.</Select.Option>
            <Select.Option value={120}>2 hrs.</Select.Option>
            <Select.Option value={180}>3 hrs.</Select.Option>
            <Select.Option value={360}>6 hrs.</Select.Option>
            <Select.Option value={720}>12 hrs.</Select.Option>
            <Select.Option value={1440}>24 hrs.</Select.Option>
          </Select>
        </BlockInner>
      </Block>
      <Block>
        <BlockTitle>Request Options</BlockTitle>
        <BlockInner>
          <div>
            {' '}
            <Input
              onChange={handleChangeOptions}
              name='url'
              style={{ marginBottom: '20px' }}
              placeholder='URL'
              value={options.url}
            />
            <Select
              onChange={value =>
                handleChangeOptions({ target: { value, name: 'method' } })
              }
              placeholder='Request method'
              options={[
                { label: 'POST', value: 'post' },
                { label: 'PUT', value: 'put' },
                { label: 'GET', value: 'get' },
              ]}
              style={{ marginBottom: '20px' }}
              value={options.method}
            />
            <Select
              onChange={value =>
                handleChangeOptions({ target: { value, name: 'content_type' } })
              }
              placeholder='Content-Type'
              value={options.content_type}
              options={[
                { label: 'form-data', value: 'form-data' },
                {
                  label: 'x-www-form-urlencoded',
                  value: 'x-www-form-urlencoded',
                },
                { label: 'raw', value: 'raw' },
                { label: 'params', value: 'params' },
              ]}
            />
          </div>
          <div>
            <CodeEditor disabled={true} code={options} onChange={() => null} />
          </div>
        </BlockInner>
      </Block>
      <Divider />
      <Block>
        <BlockTitle>Request Header</BlockTitle>
        <BlockInner>
          <div>
            {' '}
            <Form
              name='header_status'
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              autoComplete='off'
              form={headerForm}
              onFieldsChange={handleChangeHeader}
            >
              <Form.List name='header'>
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
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder='Key' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          <Input placeholder='Value' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}

                    <Button
                      type='dashed'
                      onClick={() => {
                        add()

                        handleChangeInputType('input')
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add input field
                    </Button>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          <div>
            <CodeEditor
              disabled={true}
              code={arrayToObject(header)}
              onChange={() => null}
            />
          </div>
        </BlockInner>
      </Block>
      <Divider />
      <Block>
        <BlockTitle>Request Params</BlockTitle>
        <div style={{ marginBottom: '20px' }}>
          <div>Interval</div>
          <div>
            <Select
              placeholder='Interval'
              style={{ width: '100%' }}
              value={additional.date_interval}
              onChange={value =>
                setAdditional(prev => ({
                  ...prev,
                  date_interval: value,
                }))
              }
              options={[
                { label: '1 day', value: 1 },
                { label: '2 day', value: 2 },
                { label: '3 day', value: 3 },
                { label: '4 day', value: 4 },
                { label: '5 day', value: 5 },
                { label: '6 day', value: 6 },
                { label: '7 day', value: 7 },
                { label: '14 day', value: 14 },
                { label: '21 day', value: 21 },
                { label: '28 day', value: 28 },
              ]}
            />
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div>Date Format</div>
          <div>
            <Input
              value={additional.date_format}
              onChange={e =>
                setAdditional(prev => ({
                  ...prev,
                  date_format: e.target.value,
                }))
              }
              style={{ width: '100%' }}
              placeholder='MM/DD/YYYY'
            />
          </div>
        </div>
        <BlockInner>
          <div>
            <Form
              name='body'
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              autoComplete='off'
              form={bodyForm}
              onFieldsChange={handleChangeBody}
            >
              <Form.List name='template'>
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
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder='Key' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          <Input placeholder='Value' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add()

                          handleChangeInputType('input')
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add input field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>

          <div>
            <CodeEditor
              code={arrayToObject(body)}
              onChange={handleChangeBody}
              onDrop={handleDrop}
              draggedItem={draggedItem}
            />
          </div>
        </BlockInner>
      </Block>
      <Divider />
      <Block>
        <BlockTitle>Responce Body</BlockTitle>
        <BlockInner>
          <div>
            {' '}
            <Form
              name='responce-status'
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              autoComplete='off'
              onFieldsChange={handleChangeResponce}
              form={responceForm}
            >
              <Form.List name='responce'>
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
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder='Key' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          <Input placeholder='Value' />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        onClick={() => {
                          add()

                          handleChangeInputType('input')
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add input field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          <div>
            <CodeEditor
              disabled={true}
              code={arrayToObject(responce)}
              onChange={() => null}
            />
          </div>
        </BlockInner>
      </Block>
      {!statuses?.id ? (
        <Button onClick={onSubmit}>Create</Button>
      ) : (
        <Button onClick={onUpdate}>Update</Button>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div``
const Block = styled.div``
const BlockInner = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  & div {
    width: 100%;
  }
`
const BlockTitle = styled.h2`
  margin-bottom: 20px;
`

const VariableList = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`
const VariableItem = styled.div``
