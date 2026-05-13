import type { MonitoringContext, MonitoringUser, SeverityLevel } from './types'

let sentryModule: typeof import('@sentry/nextjs') | null = null
let initialized = false

export async function initSentry() {
  if (initialized) return

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
  if (!dsn) return

  try {
    const Sentry = await import('@sentry/nextjs')
    Sentry.init({
      dsn,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      environment: process.env.NODE_ENV || 'development',
      enabled: !!dsn,
    })
    sentryModule = Sentry
    initialized = true
  } catch {
    // Sentry not available — graceful no-op
  }
}

export function captureError(error: unknown, context?: MonitoringContext) {
  if (!sentryModule) {
    console.error('[monitoring]', error, context)
    return
  }

  sentryModule.withScope((scope) => {
    if (context?.component) scope.setTag('component', context.component)
    if (context?.action) scope.setTag('action', context.action)
    if (context?.userId) scope.setUser({ id: context.userId })
    if (context?.metadata) scope.setExtras(context.metadata)

    if (error instanceof Error) {
      sentryModule!.captureException(error)
    } else {
      sentryModule!.captureException(new Error(String(error)))
    }
  })
}

export function captureMessage(msg: string, level?: SeverityLevel) {
  if (!sentryModule) {
    console.log(`[monitoring:${level || 'info'}]`, msg)
    return
  }

  sentryModule.captureMessage(msg, level || 'info')
}

export function setUser(user: MonitoringUser | null) {
  if (!sentryModule) return

  if (user) {
    sentryModule.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    })
  } else {
    sentryModule.setUser(null)
  }
}

export type { MonitoringContext, MonitoringUser, SeverityLevel } from './types'
