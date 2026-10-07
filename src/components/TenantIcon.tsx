import { cn } from '@/lib/utils'

interface Props {
  name: string
  hue: number
  className?: string
}

/** Generated tenant mark: first letter on a hue-derived gradient. Stands in for an uploaded logo. */
export function TenantIcon({ name, hue, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn('grid size-10 shrink-0 place-items-center rounded-lg text-sm font-semibold text-white', className)}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hue} 80% 58%), hsl(${(hue + 40) % 360} 75% 42%))`,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}
