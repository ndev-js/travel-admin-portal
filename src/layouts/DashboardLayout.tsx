import { useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Sidebar } from '../components/Sidebar'
import { Topbar } from '../components/Topbar'
import { useTheme } from '../hooks/useTheme'
import { pageFromPath, pageLabel } from '../nav'

export function DashboardLayout() {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const page = pageFromPath(useLocation().pathname)

  // The tenants page is the dashboard landing view, titled "Overview" like Vercel's
  const title = page === 'tenants' ? 'Overview' : page ? pageLabel[page] : 'Not Found'

  return (
    <div className="flex min-h-screen">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} theme={theme} onThemeChange={setTheme} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} onMenuClick={() => setMenuOpen(true)} theme={theme} onThemeChange={setTheme} />
        <main className="px-4 py-6 sm:px-7 sm:pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
