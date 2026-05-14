import type { MonitoringContext, MonitoringUser, SeverityLevel } from './types'

export async function initSentry() {
  // Sentry removed — no-op
}

export function captureError(error: unknown, context?: MonitoringContext) {
  console.error('[monitoring]', error, context)
}

export function captureMessage(msg: string, level?: SeverityLevel) {
  console.log(`[monitoring:${level || 'info'}]`, msg)
}

export function setUser(_user: MonitoringUser | null) {
  // no-op
}

export type { MonitoringContext, MonitoringUser, SeverityLevel } from './types'
