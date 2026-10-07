import { ChevronsUpDown, CreditCard, UserRound } from 'lucide-react'
import { StatusRing } from './StatusDot'
import { TenantIcon } from './TenantIcon'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Tenant } from '../data'

export function TenantCard({ tenant }: { tenant: Tenant }) {
  return (
    <Card role="article" className="gap-4 p-4 transition-shadow hover:shadow-card-hover">
      <div className="flex items-center gap-3">
        <TenantIcon name={tenant.name} hue={tenant.hue} />
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="truncate text-sm font-semibold">{tenant.name}</h3>
          <a
            href={`https://${tenant.domain}`}
            className="truncate text-sm text-muted-foreground hover:text-foreground hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {tenant.domain}
          </a>
        </div>
        <StatusRing status={tenant.status} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-muted-foreground"
              aria-label={`${tenant.name} options`}
            >
              <ChevronsUpDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-menu">
            <DropdownMenuItem>View tenant</DropdownMenuItem>
            <DropdownMenuItem>Impersonate</DropdownMenuItem>
            <DropdownMenuItem>Change plan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Suspend</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-2 text-sm font-medium">
          <CreditCard className="size-3.5 shrink-0" />
          <span className="truncate">
            {tenant.plan} plan · {tenant.seats} seats
          </span>
        </p>
        <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <UserRound className="size-3.5 shrink-0" />
          <span className="truncate">{tenant.owner}</span>
          <span aria-hidden="true">·</span>
          <span className="shrink-0">{tenant.lastActive}</span>
        </p>
      </div>
    </Card>
  )
}
