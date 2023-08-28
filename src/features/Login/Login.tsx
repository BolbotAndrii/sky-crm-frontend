import React, { ChangeEvent, useState } from 'react'
import { Form } from './components/Form'
import { TitleBox } from './components/Title'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { RoutesPath } from 'routes/types'
import { lastModuleVisited } from 'utils/lastModuleVisit'
import { useDispatch } from 'react-redux'
import { loginUser } from './authSlice'

// import { setToken } from 'store/auth/authSlice'

const inintialState = {
  email: '',
  password: '',
  remember: true,
}
const inintialError = {
  email: '',
  password: '',
}

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const redirectTo = lastModuleVisited('get')
  const [state, setState] = useState(inintialState)
  const [error, setError] = useState(inintialState)
  const [loading, setLoading] = useState(false)

  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleValidation = () => {
    const newErrors = {
      email: '',
      password: '',
    }

    if (!state.email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(state.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!state.password) {
      newErrors.password = 'Password is required'
    } else if (state.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setError(newErrors)
    return Object.values(newErrors).every(error => error === '')
  }

  const handleSubmit = () => {
    const isValid = handleValidation()

    if (!isValid) {
      console.log('Not Valid')
    }
    setLoading(true)
    try {
      dispatch(loginUser({ email: state.email, password: state.password }))
      // dispatch(setToken('example token'))
      // navigate(redirectTo || RoutesPath.DASHBOARD)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setError(inintialError)
    setState(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Wrapper>
      <Form
        state={state}
        error={error}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
      />
      <TitleBox />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 350px;
`
