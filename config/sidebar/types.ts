/**
 * Types for GenericSidebar configuration.
 * Used by regulatory-guidelines and other sidebar layouts.
 */

export interface NavLink {
  title: string
  url: string
}

export interface NavItemWithChildren {
  title: string
  url: string
  isActive?: boolean
  items: NavLink[]
}

export interface NavGroup {
  groupLabel: string
  id?: string
  items: NavItemWithChildren[]
}

export interface GenericSidebarConfig {
  header: string
  nav: NavGroup[]
}
