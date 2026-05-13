import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { expressions, reviews } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ReviewForm } from '@/components/reviews/review-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ReviewPage({ params }: Props) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { slug } = await params
  const [expression] = await db.select()
    .from(expressions)
    .where(eq(expressions.slug, slug))
    .limit(1)

  if (!expression) return notFound()

  const [existingReview] = await db.select()
    .from(reviews)
    .where(and(
      eq(reviews.userId, session.user.id!),
      eq(reviews.expressionId, expression.id)
    ))

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-border">
        <Link href={`/bottle/${slug}`}>
          <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
        </Link>
        <div>
          <h1 className="text-sm font-bold">Rate This Whiskey</h1>
          <p className="text-xs text-text-secondary">{expression.name}</p>
        </div>
      </header>

      <div className="px-5 pt-6">
        <ReviewForm
          expressionId={expression.id}
          expressionName={expression.name}
          existingReview={existingReview ? {
            score: existingReview.score,
            nose: existingReview.nose,
            palate: existingReview.palate,
            finish: existingReview.finish,
            liked: existingReview.liked,
          } : undefined}
        />
      </div>
    </div>
  )
}
