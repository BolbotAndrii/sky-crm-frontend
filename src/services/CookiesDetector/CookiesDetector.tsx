import React from 'react'
import styled from 'styled-components'

interface CookiesDetectorProps {
  children: React.ReactNode
}

const CookiesDetector = ({ children }: CookiesDetectorProps) => {
  if (!navigator.cookieEnabled)
    return (
      <Wrapper>
        <Content>
          <div className='logo' />
          <h5>Cookies are disabled</h5>

          <p>
            Your browser has cookies disabled. Make sure your cookies are
            enabled and try again.
          </p>
        </Content>
      </Wrapper>
    )

  return children
}

export default CookiesDetector

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 350px;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  padding: 20px;
  border-radius: 11px;
`
