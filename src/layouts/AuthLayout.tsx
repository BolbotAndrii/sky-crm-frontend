import React from 'react'
import styled from 'styled-components'
import bg from '../images/bg.png'

export const AuthLayout = ({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode => {
  return <AuthWrapper>{children}</AuthWrapper>
}
const AuthWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`
