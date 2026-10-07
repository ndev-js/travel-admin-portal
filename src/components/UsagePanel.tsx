import { useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { usage, type UsageItem } from '../data'

const ROW_HEIGHT = 40
const COLLAPSED_ROWS = 3.5

function Ring({ percent }: { percent: number }) {
  const r = 7
  const c = 2 * Math.PI * r
  const color = percent >= 90 ? 'var(--destructive)' : percent >= 75 ? 'var(--warning)' : 'var(--info)'
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
      <circle cx="9" cy="9" r={r} fill="none" stroke="var(--border-strong)" strokeWidth="2" />
      <circle
        cx="9"
        cy="9"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - Math.min(percent, 100) / 100)}
        transform="rotate(-90 9 9)"
      />
    </svg>
  )
}

function Row({ item }: { item: UsageItem }) {
  return (
    <li
      className="flex items-center gap-3 rounded-md px-3 text-sm odd:bg-background"
      style={{ height: ROW_HEIGHT }}
      aria-label={`${item.label}: ${item.used} of ${item.limit} (${Math.round(item.percent)}%)`}
    >
      <Ring percent={item.percent} />
      <span className="flex min-w-0 flex-1 items-center gap-1.5">
        <span className="truncate">{item.label}</span>
        <span title={item.hint} className="text-subtle-foreground">
          <Info className="size-3" aria-hidden="true" />
        </span>
      </span>
      <span className="shrink-0 text-[13px] text-muted-foreground tabular-nums">
        {item.used} / {item.limit}
      </span>
    </li>
  )
}

export function UsagePanel() {
  const [expanded, setExpanded] = useState(false)
  const maxHeight = (expanded ? usage.length : COLLAPSED_ROWS) * ROW_HEIGHT

  return (
    <section aria-labelledby="usage-title">
      <h2 id="usage-title" className="mb-3 text-sm font-medium">
        Usage
      </h2>
      <Card className="relative gap-4 p-4 pb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Last 30 days</h3>
          <Button size="xs" className="h-7 px-3">
            Details
          </Button>
        </div>
        <ul
          id="usage-list"
          className="m-0 list-none overflow-hidden p-0 transition-[max-height] duration-300"
          style={{ maxHeight }}
        >
          {usage.map((item) => (
            <Row key={item.label} item={item} />
          ))}
        </ul>
        <Button
          variant="outline"
          size="icon-xs"
          className="absolute -bottom-3 left-1/2 size-6 -translate-x-1/2 rounded-full text-muted-foreground"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="usage-list"
          aria-label={expanded ? 'Show fewer metrics' : 'Show all metrics'}
        >
          <ChevronDown className={cn('transition-transform', expanded && 'rotate-180')} />
        </Button>
      </Card>
    </section>
  )
}

export function AlertsPanel() {
  return (
    <section aria-labelledby="alerts-title">
      <h2 id="alerts-title" className="mb-3 text-sm font-medium">
        Alerts
      </h2>
      <Card className="items-center gap-2 px-6 py-8 text-center">
        <h3 className="text-sm font-semibold">Get alerted for anomalies</h3>
        <p className="max-w-64 text-sm text-muted-foreground">
          Automatically monitor your tenants for anomalies and get notified.
        </p>
        <Button variant="outline" className="mt-4 h-9 px-4">
          Set up alerts
        </Button>
      </Card>
    </section>
  )
}
