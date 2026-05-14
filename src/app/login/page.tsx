import { Suspense } from 'react'
import { availableProviders } from '@/lib/auth'
import { LoginForm } from './login-form'

export default function LoginPage() {
  const hasAny = Object.values(availableProviders).some(Boolean)

  return (
    <Suspense>
      <LoginForm available={availableProviders} hasAny={hasAny} />
    </Suspense>
  )
}
