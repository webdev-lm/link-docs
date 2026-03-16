import type { NavLink } from '@/config/sidebar/types'
import { LinkCard } from './LinkCard'

export interface RegionGridProps {
  regionTitle: string
  items: NavLink[]
  /** Optional class for the section wrapper */
  className?: string
  /** Optional class for the grid container */
  gridClassName?: string
  /** Optional class for each LinkCard (overrides default) */
  linkCardClassName?: string
}

/**
 * Renders one region as a 4-column grid of links.
 * Reusable so layout and styling can be iterated.
 */
export function RegionGrid({
  regionTitle,
  items,
  className,
  gridClassName,
  linkCardClassName,
}: RegionGridProps) {
  return (
    <section className={className ?? 'space-y-3'}>
      <h2 className="text-lg font-semibold text-foreground">{regionTitle}</h2>
      <div
        className={
          gridClassName ??
          'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4'
        }
      >
        {items.map((item) => (
          <LinkCard
            key={item.url}
            item={item}
            className={linkCardClassName}
          />
        ))}
      </div>
    </section>
  )
}
