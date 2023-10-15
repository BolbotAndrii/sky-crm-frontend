import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { CodeEditor } from './CodeEditor'
import {
  MinusCircleOutlined,
  PlusOutlined,
  DragOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Space, Select, Divider, notification } from 'antd'
import { generateVariables, arrayToObject } from 'features/Office/utils'
import { createOfficeItegration, updateOfficeItegration } from 'api/office'
import { useIntegration } from 'hooks/useIntegration'

const Variable = ({ label, value, onDragStart }) => {
  return (
    <Button
      draggable='true'
      style={{ cursor: 'pointer' }}
      onDragStart={onDragStart}
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
      icon={<DragOutlined />}
    >{`[${label}]`}</Button>
  )
}

const onFinish = (values: any) => {
  console.log('Received values of form:', values)
}

interface IProps {
  companyId: string
}

const selectOptions = generateVariables()

export const ReceiveStatuses: FC<IProps> = ({ companyId }) => {
  const { integration } = useIntegration(companyId)
  const [headerForm] = Form.useForm()

  const [responceForm] = Form.useForm()
  const [options, setOptions] = useState({
    url: '',
    method: '',
    content_type: '',
  })
  const [responce, setResponce] = useState({})
  const [header, setHeader] = useState({})
  const [body, setBody] = useState({})
  const [inputType, setInputType] = useState('select')
  const [draggedItem, setDraggedItem] = useState(null)

  const handleDragStart = (e, item) => {
    e.stopPropagation()
    e.dataTransfer.setData('text/plain', JSON.stringify(item))
    setDraggedItem(item)
  }

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
    setBody(JSON.parse(e.target.value))
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
    const options = options

    const data = {
      office_data,
      options,
      headers,
      template,
      response,
    }

    try {
      await createOfficeItegration(data)
      notification.success({ message: 'Integration was created successfully!' })
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
    const template = body
    const response = arrayToObject(responce)
    const headerOptions = arrayToObject(options)

    const data = {
      office_data,
      options: headerOptions,
      headers,
      template,
      response,
    }

    try {
      await updateOfficeItegration(data, { integrationId: integration.id })
      notification.success({ message: 'Integration was update successfully!' })
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
    if (integration?.id) {
      setOptions(integration.options)
      setHeader(integration.headers)
      setBody(integration.template)
      setResponce(integration.response)
      headerForm.setFieldsValue({
        header: transformDataForForm(integration.headers),
      })
      responceForm.setFieldsValue({
        responce: transformDataForForm(integration.response),
      })
    }
  }, [integration?.id])

  return (
    <Wrapper>
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
              name='header'
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
        <BlockTitle>Request Body</BlockTitle>
        <BlockInner>
          <div>
            <VariableList>
              {selectOptions.map(item => (
                <Variable
                  key={item.label}
                  onDragStart={e => handleDragStart(e, item)}
                  {...item}
                />
              ))}
            </VariableList>
          </div>
          <div>
            <CodeEditor
              code={body}
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
              name='responce'
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
      {!integration?.id ? (
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
