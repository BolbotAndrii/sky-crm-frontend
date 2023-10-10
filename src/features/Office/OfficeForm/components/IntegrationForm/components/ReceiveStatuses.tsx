import React, { ChangeEvent, FC, useState } from 'react'
import styled from 'styled-components'

import { CodeEditor } from './CodeEditor'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Select, Divider } from 'antd'
import { generateVariables, arrayToObject } from 'features/Office/utils'
import jsonFormat from 'json-format'

const onFinish = (values: any) => {
  console.log('Received values of form:', values)
}

interface IProps {
  companyId: string
}

const selectOptions = generateVariables()

export const ReceiveStatuses: FC<IProps> = ({ companyId }) => {
  const [headerForm] = Form.useForm()
  const [bodyForm] = Form.useForm()
  const [responceForm] = Form.useForm()
  const [options, setOptions] = useState({
    options: {
      url: '',
      method: '',
    },
  })
  const [responce, setResponce] = useState({ responce: {} })
  const [header, setHeader] = useState({ header: {} })
  const [body, setBody] = useState({ body: {} })
  const [inputType, setInputType] = useState('select')

  const handleChangeInputType = (type: 'select' | 'input') => {
    setInputType(type)
  }

  const handleChangeOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOptions(prev => ({
      ...prev,
      options: { ...prev.options, [name]: value },
    }))
  }
  const handleChangeHeader = () => {
    setHeader(headerForm.getFieldsValue())
  }
  const handleChangeBody = () => {
    setBody(bodyForm.getFieldsValue())
  }

  const handleChangeResponce = () => {
    setResponce(responceForm.getFieldsValue())
  }

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
            />
          </div>
          <div>
            {' '}
            <CodeEditor
              code={jsonFormat(
                { options: options.options },
                {
                  type: 'space',
                  size: 2,
                },
              )}
              onChange={() => null}
            />
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
                          name={[name, 'key']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder='Key' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          {inputType === 'select' ? (
                            <Select
                              placeholder='Value'
                              options={selectOptions}
                            />
                          ) : (
                            <Input placeholder='Value' />
                          )}
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Button
                      type='dashed'
                      style={{ marginBottom: '10px' }}
                      onClick={() => {
                        add()
                        handleChangeInputType('select')
                      }}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add select field
                    </Button>
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
              code={jsonFormat(
                { headers: arrayToObject(header.header) },
                {
                  type: 'space',
                  size: 2,
                },
              )}
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
            {' '}
            <Form
              name='body'
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              autoComplete='off'
              onFieldsChange={handleChangeBody}
              form={bodyForm}
            >
              <Form.List name='body'>
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
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder='Key' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          {inputType === 'select' ? (
                            <Select
                              placeholder='Value'
                              options={selectOptions}
                            />
                          ) : (
                            <Input placeholder='Value' />
                          )}
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        style={{ marginBottom: '10px' }}
                        onClick={() => {
                          add()
                          handleChangeInputType('select')
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add select field
                      </Button>
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
              {/* <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </div>
          <div>
            <CodeEditor
              code={jsonFormat(
                { body: arrayToObject(body.body) },
                {
                  type: 'space',
                  size: 2,
                },
              )}
              onChange={() => null}
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
                          name={[name, 'key']}
                          rules={[{ required: true, message: 'Missing key' }]}
                        >
                          <Input placeholder='Key' />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Missing value' }]}
                        >
                          {inputType === 'select' ? (
                            <Select
                              placeholder='Value'
                              options={selectOptions}
                            />
                          ) : (
                            <Input placeholder='Value' />
                          )}
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type='dashed'
                        style={{ marginBottom: '10px' }}
                        onClick={() => {
                          add()
                          handleChangeInputType('select')
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add select field
                      </Button>
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
              code={jsonFormat(
                { responce: arrayToObject(responce.responce) },
                {
                  type: 'space',
                  size: 2,
                },
              )}
              onChange={() => null}
            />
          </div>
        </BlockInner>
      </Block>
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
