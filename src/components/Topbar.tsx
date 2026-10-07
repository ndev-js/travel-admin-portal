import { ChevronsUpDown, Menu, Plus, Sparkles } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import type { Theme } from '../hooks/useTheme'

interface Props {
  title: string
  onMenuClick: () => void
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

export function Topbar({ title, onMenuClick, theme, onThemeChange }: Props) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-5">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
          <Menu />
        </Button>
        <Button variant="ghost" className="gap-2 px-2 font-medium">
          All Tenants
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </Button>
      </div>

      <h1 className="pointer-events-none text-sm font-medium max-md:sr-only md:absolute md:left-1/2 md:-translate-x-1/2">{title}</h1>

      <div className="flex items-center gap-1">
        <Button variant="ghost" className="gap-2 px-2 font-medium sm:px-3">
          <Plus />
          <span className="max-sm:sr-only">Create New</span>
        </Button>
        <Button variant="ghost" className="gap-2 px-2 font-medium sm:px-3">
          <Sparkles />
          <span className="max-sm:sr-only">Agent</span>
        </Button>
        <ThemeToggle theme={theme} onChange={onThemeChange} />
      </div>
    </header>
  )
}
