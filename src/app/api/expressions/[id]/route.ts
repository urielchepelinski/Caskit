import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { expressions, bottles, distilleries } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
  const { id } = await params
  const expressionId = parseInt(id, 10)

  if (isNaN(expressionId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const result = await db.select({
    expression: expressions,
    bottle: bottles,
    distillery: distilleries,
  })
    .from(expressions)
    .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
    .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
    .where(eq(expressions.id, expressionId))
    .limit(1)

  if (!result[0]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const { expression, bottle, distillery } = result[0]

  return NextResponse.json({
    ...expression,
    bottle: { name: bottle.name, type: bottle.type, category: bottle.category },
    distillery: { name: distillery.name, country: distillery.country, region: distillery.region },
  })
}
