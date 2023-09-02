import {
  UserStatusColors,
  UserStatusStr,
  UserRoleStr,
  UserRoleColors,
} from 'types/User'
import styled from 'styled-components'

export const renderUserStatus = (status: number) => {
  return (
    <Wrapper color={UserStatusColors[status]}>
      <p>{UserStatusStr[status]}</p>
    </Wrapper>
  )
}

export const renderUserRole = (status: number) => {
  return (
    <Wrapper color={UserRoleColors[status]}>
      <p>{UserRoleStr[status]}</p>
    </Wrapper>
  )
}

export const renderUserColor = (color: string) => {
  return (
    <Wrapper color={color}>
      <p style={{ width: '20px', height: '20px', padding: 10 }}></p>
    </Wrapper>
  )
}

interface StyleProps {
  color: string
}

const Wrapper = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color};
  padding: 2px;
  border-radius: 5px;
  & p {
    text-align: center;
  }
`
