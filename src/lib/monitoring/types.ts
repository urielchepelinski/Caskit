export interface MonitoringContext {
  component?: string
  action?: string
  userId?: string
  metadata?: Record<string, unknown>
}

export interface MonitoringUser {
  id: string
  email?: string
  username?: string
}

export type SeverityLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log'
