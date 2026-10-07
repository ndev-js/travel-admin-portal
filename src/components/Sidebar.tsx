import { useEffect, useMemo, useRef, useState } from 'react'
import { Bell, ChevronRight, ChevronsUpDown, MoreHorizontal, Search, TriangleAlert } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import { useFocusHotkey } from '../hooks/useFocusHotkey'
import type { Theme } from '../hooks/useTheme'
import { primaryNav, secondaryNav, type NavItem, type PageId } from '../nav'

interface Props {
  active: PageId
  onNavigate: (id: PageId) => void
  /** Mobile drawer state; the sidebar is always visible from `lg` up */
  open: boolean
  onClose: () => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

type Environment = 'production' | 'staging'

function NavButton({ item, active, onClick }: { item: NavItem; active: boolean; onClick: () => void }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex h-9 w-full items-center gap-3 rounded-lg px-3 text-sm text-foreground/80 transition-colors outline-none hover:bg-foreground/5 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50',
        active && 'bg-foreground/[0.08] font-medium text-foreground hover:bg-foreground/[0.08]',
      )}
    >
      <Icon className={cn('size-4 shrink-0 text-muted-foreground group-hover:text-foreground', active && 'text-foreground')} />
      <span className="flex-1 truncate text-left">{item.label}</span>
      {item.expandable && <ChevronRight className="size-4 shrink-0 text-subtle-foreground" />}
    </button>
  )
}

export function Sidebar({ active, onNavigate, open, onClose, theme, onThemeChange }: Props) {
  const [query, setQuery] = useState('')
  const [env, setEnv] = useState<Environment>('production')
  const findRef = useRef<HTMLInputElement>(null)
  useFocusHotkey('f', findRef)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const { primary, secondary } = useMemo(() => {
    const q = query.trim().toLowerCase()
    const match = (items: NavItem[]) => (q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items)
    return { primary: match(primaryNav), secondary: match(secondaryNav) }
  }, [query])

  const go = (id: PageId) => {
    onNavigate(id)
    onClose()
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} aria-hidden="true" />}

      <aside
        aria-label="Sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-[transform,visibility] duration-200',
          'lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full max-lg:invisible',
        )}
      >
        <div className="flex flex-col gap-3 p-3 pb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-full justify-start gap-2 px-2 font-medium">
                <span
                  aria-hidden="true"
                  className="size-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#6db4ff,#0a58d6_60%,#06307a)]"
                />
                <span className="truncate">Travel CRM</span>
                <Badge variant="secondary" className="shrink-0">
                  Admin
                </Badge>
                <ChevronsUpDown className="ml-auto size-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 shadow-menu">
              <DropdownMenuLabel>Environment</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={env} onValueChange={(v) => setEnv(v as Environment)}>
                <DropdownMenuRadioItem value="production">Production</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="staging">Staging</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-subtle-foreground" />
            <Input
              ref={findRef}
              type="search"
              placeholder="Find…"
              aria-label="Find"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 rounded-lg bg-card pr-10 pl-9 shadow-none [&::-webkit-search-cancel-button]:hidden"
            />
            <Kbd className="absolute right-2 bg-muted shadow-[inset_0_0_0_1px_var(--border)]">F</Kbd>
          </label>
        </div>

        <nav aria-label="Main" className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-1">
          {primary.length > 0 && (
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {primary.map((item) => (
                <li key={item.id}>
                  <NavButton item={item} active={active === item.id} onClick={() => go(item.id)} />
                </li>
              ))}
            </ul>
          )}

          {primary.length > 0 && secondary.length > 0 && <hr className="my-3 border-border" />}

          {secondary.length > 0 && (
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {secondary.map((item) => (
                <li key={item.id}>
                  <NavButton item={item} active={active === item.id} onClick={() => go(item.id)} />
                </li>
              ))}
            </ul>
          )}

          {primary.length === 0 && secondary.length === 0 && (
            <p className="px-3 py-4 text-sm text-muted-foreground">No results for “{query}”.</p>
          )}
        </nav>

        <div className="flex flex-col gap-3 p-3">
          <section
            aria-labelledby="action-required-title"
            className="rounded-lg border border-warning/50 bg-warning/[0.06] p-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 id="action-required-title" className="text-sm font-semibold">
                Action Required
              </h2>
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-warning text-black" aria-hidden="true">
                <TriangleAlert className="size-3.5" />
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground">
              3 tenants have failed payments. Their accounts will be suspended starting October 10, 2026.
            </p>
            <Button variant="outline" className="mt-3 w-full" onClick={() => go('subscriptions')}>
              Review billing
            </Button>
          </section>

          <div className="flex items-center gap-2 px-1">
            <Avatar className="size-6" aria-hidden="true">
              <AvatarFallback className="bg-[linear-gradient(135deg,#0070f3,#7928ca_55%,#ff0080)]" />
            </Avatar>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">Super Admin</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-full text-muted-foreground"
                  aria-label="Account menu"
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-48 shadow-menu">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={(v) => onThemeChange(v as Theme)}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account settings</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              className="relative size-8 rounded-full text-muted-foreground"
              aria-label="Notifications (new)"
            >
              <Bell />
              <span className="absolute top-0 right-0 size-2.5 rounded-full bg-info ring-2 ring-background" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
