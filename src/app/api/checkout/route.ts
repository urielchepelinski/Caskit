import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/payments'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await request.json()
  if (!['monthly', 'yearly'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }
  if (!process.env.STRIPE_PRICE_MONTHLY || !process.env.STRIPE_PRICE_YEARLY) {
    return NextResponse.json({ error: 'Stripe prices not configured' }, { status: 500 })
  }

  try {
    const url = await createCheckoutSession(session.user.id, session.user.email, plan)
    if (!url) {
      return NextResponse.json({ error: 'No checkout URL returned' }, { status: 500 })
    }
    return NextResponse.json({ url })
  } catch (error: any) {
    console.error('Checkout session creation failed:', error)
    return NextResponse.json({ error: error.message || 'Checkout failed' }, { status: 500 })
  }
}
