import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Label } from '@/components/ui/label'
import LocaleSummary from './_components/LocaleSummary'
import OperatorTable from './_components/OperatorTable'
import AvailableShortcodes from './_components/AvailableShortcodes'
import SenderIdRegulations from './_components/SenderIdRegulations'
import UpdateTimestamp from './_components/UpdateTimestamp'
import { RichText } from '@/_components/_atoms/_richtext/RichText'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface Guideline {
  title: string
  slug: string
  localeSummary: {
    locale: string
    countryISO: string
    dialingCode: number
    countryCode: number
  }
  localOperators: {
    operator: string
    mnc: number
    numericId: boolean
    alphaId: boolean
    shortCode: boolean
  }[]
  features: {
    dedicatedShortcodes: boolean
    sharedShortcodes: boolean
    longnumbers: boolean
  } 
  regulatoryRequirements: {
    requirementsSelection: string
  }
  description: string
  updatedAt: string
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
      localeSummary:true,
      localOperators:true,
      features:true,
      regulatoryRequirements:true,
      description:true,
      createdAt:true,
      updatedAt:true,
    },
    limit: 1,
  })

  if (!result.docs || result.docs.length === 0) {
    notFound()
  }

  const guideline = result.docs[0] as Guideline
  return (
    <div className='typo-app max-w-screen-lg mx-auto space-y-8'>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1>{guideline.title}</h1>
        <UpdateTimestamp updatedAt={guideline.updatedAt} />
      </div>
      <LocaleSummary localeSummary={guideline.localeSummary as any} />
      <SenderIdRegulations regulatoryRequirements={guideline.regulatoryRequirements as any} />
      <RichText data={guideline.description as any} />
      <OperatorTable localOperators={guideline.localOperators as any} />
      <AvailableShortcodes features={guideline.features as any} />
    </div>
  )
}

