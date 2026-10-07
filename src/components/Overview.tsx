import { useMemo, useRef, useState } from 'react'
import { LayoutGrid, List, Search, SlidersHorizontal } from 'lucide-react'
import { AlertsPanel, UsagePanel } from './UsagePanel'
import { RecentActivity } from './RecentActivity'
import { StatusDot } from './StatusDot'
import { TenantCard } from './TenantCard'
import { TenantIcon } from './TenantIcon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Kbd } from '@/components/ui/kbd'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useFocusHotkey } from '../hooks/useFocusHotkey'
import { tenants, type TenantStatus } from '../data'

type View = 'grid' | 'list'

const statusOptions: { value: TenantStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
  { value: 'past_due', label: 'Past due' },
]

const controlBox = 'rounded-lg bg-card shadow-[inset_0_0_0_1px_var(--border)]'

export function Overview() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<View>('grid')
  // Empty set means "all statuses"
  const [statuses, setStatuses] = useState<Set<TenantStatus>>(new Set())
  const searchRef = useRef<HTMLInputElement>(null)
  useFocusHotkey('/', searchRef)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tenants.filter(
      (t) =>
        (statuses.size === 0 || statuses.has(t.status)) &&
        (!q || [t.name, t.domain, t.owner].some((field) => field.toLowerCase().includes(q))),
    )
  }, [query, statuses])

  const toggleStatus = (status: TenantStatus, checked: boolean) =>
    setStatuses((prev) => {
      const next = new Set(prev)
      if (checked) next.add(status)
      else next.delete(status)
      return next
    })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3.5 size-4 text-subtle-foreground" />
          <Input
            ref={searchRef}
            type="search"
            placeholder="Search Tenants…"
            aria-label="Search tenants"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`h-10 border-0 pr-12 pl-10 shadow-[inset_0_0_0_1px_var(--border)] [&::-webkit-search-cancel-button]:hidden ${controlBox} dark:bg-card`}
          />
          <Kbd className="absolute right-3 h-6 min-w-6 bg-muted shadow-[inset_0_0_0_1px_var(--border)]">/</Kbd>
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`relative size-10 text-muted-foreground ${controlBox}`}
              aria-label="Filter tenants"
            >
              <SlidersHorizontal />
              {statuses.size > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-info" aria-hidden="true" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 shadow-menu">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            {statusOptions.map(({ value, label }) => (
              <DropdownMenuCheckboxItem
                key={value}
                checked={statuses.has(value)}
                onCheckedChange={(checked) => toggleStatus(value, checked === true)}
                onSelect={(e) => e.preventDefault()}
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
            {statuses.size > 0 && (
              <>
                <DropdownMenuSeparator />
                <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setStatuses(new Set())}>
                  Clear filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ToggleGroup
          type="single"
          value={view}
          // Radix emits '' when the active item is clicked again; keep the current view
          onValueChange={(value) => value && setView(value as View)}
          aria-label="Layout"
          className={`h-10 gap-0.5 p-1 ${controlBox}`}
        >
          {(
            [
              { value: 'grid', label: 'Grid view', icon: LayoutGrid },
              { value: 'list', label: 'List view', icon: List },
            ] as const
          ).map(({ value, label, icon: Icon }) => (
            <ToggleGroupItem
              key={value}
              value={value}
              aria-label={label}
              className="size-8 min-w-8 px-0 text-subtle-foreground hover:bg-transparent hover:text-foreground data-[spacing=0]:rounded-md data-[state=on]:bg-foreground/[0.08] data-[state=on]:text-foreground"
            >
              <Icon className="size-4" />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]">
        <aside className="flex flex-col gap-8 max-xl:order-2">
          <UsagePanel />
          <AlertsPanel />
          <RecentActivity />
        </aside>

        <section className="min-w-0 max-xl:order-1" aria-labelledby="tenants-title">
          <h2 id="tenants-title" className="mb-3 text-sm font-medium">
            Tenants
          </h2>

          {filtered.length === 0 ? (
            <Card className="px-4 py-12 text-center">
              <p className="text-muted-foreground">No tenants match your search or filters.</p>
            </Card>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
              {filtered.map((t) => (
                <TenantCard key={t.id} tenant={t} />
              ))}
            </div>
          ) : (
            <Card className="gap-0 py-0">
              <ul className="m-0 list-none p-0">
                {filtered.map((t) => (
                  <li
                    key={t.id}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t px-4 py-3 first:border-t-0 hover:bg-hover sm:grid-cols-[minmax(0,2fr)_1fr_1fr_90px]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <TenantIcon name={t.name} hue={t.hue} className="size-8" />
                      <div className="min-w-0">
                        <div className="truncate font-medium">{t.name}</div>
                        <div className="truncate text-xs text-muted-foreground">{t.domain}</div>
                      </div>
                    </div>
                    <span className="hidden text-[13px] sm:inline">
                      {t.plan} · {t.seats} seats
                    </span>
                    <span className="hidden truncate text-[13px] text-muted-foreground sm:inline">{t.owner}</span>
                    <StatusDot status={t.status} withLabel />
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
