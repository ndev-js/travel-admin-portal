import { useState } from 'react'
import { Overview } from './components/Overview'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Card } from '@/components/ui/card'
import { useTheme } from './hooks/useTheme'
import { pageLabel, type PageId } from './nav'

function Placeholder({ title }: { title: string }) {
  return (
    <Card className="px-4 py-12 text-center">
      <h2 className="mb-1 font-semibold">{title}</h2>
      <p className="text-muted-foreground">This section isn’t built yet.</p>
    </Card>
  )
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [page, setPage] = useState<PageId>('tenants')
  const [menuOpen, setMenuOpen] = useState(false)

  // The tenants page is the dashboard landing view, titled "Overview" like Vercel's
  const title = page === 'tenants' ? 'Overview' : pageLabel[page]

  return (
    <div className="flex min-h-screen">
      <Sidebar
        active={page}
        onNavigate={setPage}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onMenuClick={() => setMenuOpen(true)} theme={theme} onThemeChange={setTheme} />
        <main className="px-4 py-6 sm:px-7 sm:pb-16">{page === 'tenants' ? <Overview /> : <Placeholder title={title} />}</main>
      </div>
    </div>
  )
}
