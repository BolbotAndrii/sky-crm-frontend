import React, { useState, useEffect } from 'react'
import { FormInstance } from 'antd/es/form'
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  ColorPicker,
  message,
} from 'antd'
import styled from 'styled-components'
import { IUser, UserRole, UserStatus } from 'types/User'
import { initialUser } from '../constants'
import { createUser, getUserById, updateUser } from 'api/users'
import { useNavigate, useParams } from 'react-router-dom'
import { RoutesPath } from 'routes/types'

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

const prefixSelector = (
  <Form.Item name='prefix' noStyle>
    <Select defaultValue={'3'} style={{ width: 70 }}>
      <Option value='3'>+3</Option>
    </Select>
  </Form.Item>
)

export const UserForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const formRef = React.useRef<FormInstance>(null)
  const [form] = Form.useForm()
  const [user, setUser] = useState(initialUser)

  const onFinish = async (values: IUser) => {
    try {
      if (user?.id) {
        await updateUser(values, { userId: user?.id })
        message.success('Was updated succesfully!')
        return
      }
      await createUser(values)
      message.success('Was created succesfully!')
      navigate(RoutesPath.TEAM)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCheckboxChange = (e, key) => {
    const { checked } = e.target

    const modules = { ...form.getFieldValue('modules'), [key]: checked }
    setUser(prevUser => ({
      ...prevUser,
      modules,
    }))

    form.setFieldsValue({
      modules,
    })
  }

  useEffect(() => {
    const fettchUserById = async () => {
      try {
        const user = await getUserById({ userId: id })
        form.setFieldsValue(user)
        setUser(user)
      } catch (error) {
        console.error(error)
      }
    }
    if (id !== 'new') fettchUserById()
  }, [id])

  return (
    <Wrapper>
      <Form
        {...formItemLayout}
        ref={formRef}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={user}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name='background_color'
          label='User Color'
          rules={[{ required: false }]}
        >
          <ColorPicker />
        </Form.Item>
        <Form.Item
          name='role_id'
          label='User Role'
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select placeholder='select user role'>
            <Option value={UserRole.SUPER_ADMIN}>Super Admin</Option>
            <Option value={UserRole.OWNER}>Owner</Option>
            <Option value={UserRole.ADMIN}>Admin</Option>
            <Option value={UserRole.MANAGER}>Manager</Option>
            <Option value={UserRole.ACCOUNTANT}>Accountant</Option>
            <Option value={UserRole.BAYER}>Bayer</Option>
            <Option value={UserRole.HELPER}>Helper</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='status'
          label='User Status'
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select placeholder='select user status'>
            <Option value={UserStatus.ACTIVE}>Active</Option>
            <Option value={UserStatus.INACTIVE}>Inactive</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='first_name'
          label='First Name'
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
          name='phone'
          label='Phone Number'
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='title'
          label='Title (Nickname)'
          rules={[
            {
              required: false,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='notes'
          label='Notes'
          rules={[{ required: false, message: 'Please input notes' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        {!user?.id && (
          <>
            {' '}
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: !user?.id,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: !user?.id,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!',
                      ),
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        <Form.Item
          name='user_identifier'
          label='User identifier'
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
        <Form.Item label='Modules'>
          <Row gutter={[10, 10]}>
            <Col span={8}>
              <Form.Item name={['modules', 'dashboard']}>
                <Checkbox
                  onChange={e => handleCheckboxChange(e, 'dashboard')}
                  checked={user.modules.dashboard}
                  value='dashboard'
                >
                  Dashboard
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['modules', 'leads']}>
                <Checkbox
                  onChange={e => handleCheckboxChange(e, 'leads')}
                  checked={user.modules.leads}
                  value='leads'
                >
                  Leads
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['modules', 'trash']}>
                <Checkbox
                  onChange={e => handleCheckboxChange(e, 'trash')}
                  checked={user.modules.trash}
                  value='trash'
                >
                  Trash
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['modules', 'users']}>
                <Checkbox
                  onChange={e => handleCheckboxChange(e, 'users')}
                  checked={user.modules.users}
                  value='users'
                >
                  Users
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={['modules', 'offices']}>
                <Checkbox
                  onChange={e => handleCheckboxChange(e, 'offices')}
                  checked={user.modules.offices}
                  value='offices'
                >
                  Offices
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            {user?.id ? 'Update' : 'Register'}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div``
