import { NextResponse } from 'next/server'
import { z } from 'zod'

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
})

const waitlist: Set<string> = new Set()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = waitlistSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { email } = result.data
    const normalizedEmail = email.toLowerCase().trim()

    if (waitlist.has(normalizedEmail)) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      )
    }

    waitlist.add(normalizedEmail)

    return NextResponse.json(
      { message: 'Successfully joined the waitlist' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
