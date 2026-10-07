import { Activity, Check, TriangleAlert } from 'lucide-react'
import type { TenantStatus } from '../data'
import { cn } from '@/lib/utils'

const labels: Record<TenantStatus, string> = {
  active: 'Active',
  trial: 'Trial',
  past_due: 'Past due',
}

const dotColors: Record<TenantStatus, string> = {
  active: 'bg-success',
  trial: 'bg-info',
  past_due: 'bg-warning',
}

export function StatusDot({ status, withLabel = false }: { status: TenantStatus; withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" title={labels[status]}>
      <span className={cn('inline-block size-2 rounded-full', dotColors[status])} aria-hidden="true" />
      {withLabel ? labels[status] : <span className="sr-only">{labels[status]}</span>}
    </span>
  )
}

/** Circular status indicator used on tenant cards (Vercel's deployment-status button). */
export function StatusRing({ status }: { status: TenantStatus }) {
  return (
    <span
      role="img"
      aria-label={`Status: ${labels[status]}`}
      title={labels[status]}
      className={cn(
        'relative grid size-8 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--border-strong)]',
        status === 'past_due' && 'text-warning shadow-[inset_0_0_0_1px_var(--warning)]',
        status === 'active' && 'text-foreground',
      )}
    >
      {status === 'active' && (
        <>
          <svg viewBox="0 0 32 32" className="absolute inset-0 size-8 -rotate-90" aria-hidden="true">
            <circle
              cx="16"
              cy="16"
              r="15"
              fill="none"
              stroke="var(--info)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="42 100"
            />
          </svg>
          <Check className="size-4" />
        </>
      )}
      {status === 'trial' && <Activity className="size-4 text-foreground" />}
      {status === 'past_due' && <TriangleAlert className="size-4" />}
    </span>
  )
}
