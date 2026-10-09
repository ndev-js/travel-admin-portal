import {
  BarChart3,
  Building2,
  CreditCard,
  Eye,
  Flag,
  Gauge,
  Globe,
  KeyRound,
  LayoutGrid,
  ListTree,
  Puzzle,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { PATHS } from './routes/paths'

export type PageId =
  | 'tenants'
  | 'users'
  | 'subscriptions'
  | 'logs'
  | 'analytics'
  | 'performance'
  | 'observability'
  | 'security'
  | 'infrastructure'
  | 'flags'
  | 'domains'
  | 'api-keys'
  | 'integrations'

export interface NavItem {
  id: PageId
  label: string
  icon: LucideIcon
  /** Shows a trailing chevron, like Vercel's expandable sections */
  expandable?: boolean
}

export const primaryNav: NavItem[] = [
  { id: 'tenants', label: 'Tenants', icon: LayoutGrid },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
  { id: 'logs', label: 'Logs', icon: ListTree, expandable: true },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'performance', label: 'Performance', icon: Gauge },
  { id: 'observability', label: 'Observability', icon: Eye, expandable: true },
  { id: 'security', label: 'Security', icon: ShieldCheck, expandable: true },
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2 },
]

export const secondaryNav: NavItem[] = [
  { id: 'flags', label: 'Feature Flags', icon: Flag },
  { id: 'domains', label: 'Domains', icon: Globe },
  { id: 'api-keys', label: 'API Keys', icon: KeyRound },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
]

export const pageLabel: Record<PageId, string> = Object.fromEntries(
  [...primaryNav, ...secondaryNav].map((item) => [item.id, item.label]),
) as Record<PageId, string>

export const pagePath = (id: PageId) => PATHS[id]

/** The nav page a URL belongs to, or undefined for URLs outside the nav (e.g. not found) */
export function pageFromPath(pathname: string): PageId | undefined {
  const root = `/${pathname.split('/')[1]}`
  return (Object.keys(pageLabel) as PageId[]).find((id) => PATHS[id] === root)
}
