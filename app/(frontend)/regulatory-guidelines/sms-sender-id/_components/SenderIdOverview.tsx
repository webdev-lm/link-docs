import regulatoryConfig from '@/config/sidebar/regulatory-guidelines.json'
import type { GenericSidebarConfig, NavItemWithChildren } from '@/config/sidebar/types'
import { RegionGrid } from './RegionGrid'

const config = regulatoryConfig as GenericSidebarConfig

const SENDER_ID_NAV_ID = 'sms-sender-id'

/**
 * Overview for the Sender ID index page: reads regulatory-guidelines.json,
 * selects the nav child with id = "sender-id", and renders each region
 * as a 4×N grid of links. Uses reusable LinkCard and RegionGrid for styling iteration.
 */
export function SenderIdOverview() {
  const senderIdNav = config.nav.find((group) => group.id === SENDER_ID_NAV_ID)
  if (!senderIdNav?.items?.length) {
    return null
  }

  const regions = senderIdNav.items as NavItemWithChildren[]

  return (
    <div className="space-y-10">
      {regions.map((region) => (
        <RegionGrid
          key={region.title}
          regionTitle={region.title}
          items={region.items}
        />
      ))}
    </div>
  )
}
