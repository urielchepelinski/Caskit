import { NextRequest, NextResponse } from 'next/server'
import { getStripeClient } from '@/lib/payments/stripe'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    const stripe = getStripeClient()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (userId) {
        await db.update(users).set({
          subscriptionTier: 'premium',
          stripeCustomerId: session.customer as string,
          updatedAt: new Date(),
        }).where(eq(users.id, userId))
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata?.userId
      if (userId) {
        await db.update(users).set({
          subscriptionTier: 'free',
          updatedAt: new Date(),
        }).where(eq(users.id, userId))
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
