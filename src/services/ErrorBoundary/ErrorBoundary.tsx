import React from 'react'
import Fallback from './FallBack'
import './ErrorBoundary.scss'

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <>
          <Fallback />
          <p>Ooops! Something went wrong</p>
        </>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
