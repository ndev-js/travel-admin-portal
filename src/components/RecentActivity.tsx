import type { ReactNode } from 'react'
import { Eye, FileText, MoreHorizontal } from 'lucide-react'
import { TenantIcon } from './TenantIcon'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { activity, type RefTone } from '../data'

const pillClass =
  'inline-flex h-7 items-center gap-1.5 rounded-full bg-muted px-2.5 text-[13px] font-medium shadow-[inset_0_0_0_1px_var(--border)]'

const toneColors: Record<RefTone, string> = {
  info: 'bg-info',
  success: 'bg-success',
  danger: 'bg-destructive',
}

function PillButton({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        pillClass,
        'outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:size-3.5',
      )}
    >
      {icon}
      {children}
    </button>
  )
}

export function RecentActivity() {
  return (
    <section aria-labelledby="activity-title">
      <h2 id="activity-title" className="mb-3 text-sm font-medium">
        Recent Activity
      </h2>
      <Card className="gap-0 overflow-hidden py-0">
        <ul className="m-0 list-none p-0">
          {activity.map((item) => (
            <li key={item.id} className="flex flex-col gap-3 border-t p-4 first:border-t-0">
              <div className="flex items-center gap-3">
                <span className="flex shrink-0 -space-x-1" aria-hidden="true">
                  <Avatar className="size-6 ring-2 ring-card">
                    <AvatarFallback className="bg-foreground/15 text-[9px] font-medium tracking-tight text-foreground">
                      {item.actor}
                    </AvatarFallback>
                  </Avatar>
                  <TenantIcon name={item.tenant} hue={item.hue} className="size-6 rounded-full text-[10px] ring-2 ring-card" />
                </span>
                <p className="min-w-0 flex-1 truncate text-sm">
                  <span className="font-medium">{item.tenant}</span>{' '}
                  <span className="text-muted-foreground">{item.event}</span>
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-muted-foreground"
                      aria-label={`${item.tenant} activity options`}
                    >
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="shadow-menu">
                    <DropdownMenuItem>View tenant</DropdownMenuItem>
                    <DropdownMenuItem>Open audit log</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <PillButton icon={<Eye />}>View</PillButton>
                <PillButton icon={<FileText />}>Audit log</PillButton>
                <span className={cn(pillClass, 'font-mono text-xs')}>
                  <span className={cn('size-2 rounded-full', toneColors[item.refTone])} aria-hidden="true" />
                  {item.ref}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  )
}
