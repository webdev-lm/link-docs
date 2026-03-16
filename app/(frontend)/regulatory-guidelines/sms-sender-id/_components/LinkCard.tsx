import Link from 'next/link'
import type { NavLink } from '@/config/sidebar/types'

export interface LinkCardProps {
  item: NavLink
  className?: string
}

/**
 * Single link card for use in overview grids.
 * Reusable so styling can be iterated in one place.
 */
export function LinkCard({ item, className }: LinkCardProps) {
  return (
    <Link
      href={item.url}
      className={
        className ??
        'block rounded-lg border border-border bg-card p-3 text-card-foreground shadow-sm transition-colors hover:bg-secondary'
      }
    >
      <span className="font-medium">{item.title}</span>
    </Link>
  )
}
