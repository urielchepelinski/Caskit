import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { expressions, bottles, distilleries, awardScores } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface Props {
  params: Promise<{ slug: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
  const { slug } = await params

  const result = await db.select({
    expression: expressions,
    bottle: bottles,
    distillery: distilleries,
  })
    .from(expressions)
    .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
    .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
    .where(eq(expressions.slug, slug))
    .limit(1)

  if (!result[0]) {
    return NextResponse.json({ error: 'Expression not found' }, { status: 404 })
  }

  const { expression, bottle, distillery } = result[0]

  const awards = await db.select()
    .from(awardScores)
    .where(eq(awardScores.expressionId, expression.id))

  return NextResponse.json({
    ...expression,
    bottle: { name: bottle.name, type: bottle.type, category: bottle.category },
    distillery: { name: distillery.name, country: distillery.country, region: distillery.region },
    awards,
  })
}
