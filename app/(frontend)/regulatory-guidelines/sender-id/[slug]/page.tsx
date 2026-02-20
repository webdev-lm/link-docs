import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface Guideline {
  title: string
  slug: string
}

export default async function GuidelineSlugPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({
    config: configPromise,
  })

  const result = await payload.find({
    collection: 'guidelines' as any,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      slug: true,
    },
    limit: 1,
  })

  if (!result.docs || result.docs.length === 0) {
    notFound()
  }

  const guideline = result.docs[0] as Guideline

  return (
    <div>
      <h1>{guideline.title}</h1>
      <p>Slug: {guideline.slug}</p>
    </div>
  )
}

