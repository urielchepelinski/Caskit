import { NextResponse } from 'next/server'
import { db } from '@/db'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT 1 as ok`)
    return NextResponse.json({ status: 'ok', db: 'connected' })
  } catch (err: any) {
    return NextResponse.json({ status: 'error', db: err.message }, { status: 500 })
  }
}
