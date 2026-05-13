'use client'

import { Component, type ReactNode } from 'react'
import { captureError } from '@/lib/monitoring'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    captureError(error, {
      component: 'ErrorBoundary',
      metadata: { componentStack: errorInfo.componentStack },
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl bg-surface p-8">
          <div className="text-center">
            <h2 className="mb-2 text-lg font-semibold text-text-primary">
              Something went wrong
            </h2>
            <p className="text-sm text-text-muted">
              An unexpected error occurred. Please try again.
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="rounded-lg bg-[#C8974C] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
