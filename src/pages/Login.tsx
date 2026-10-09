import { ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { LoginForm } from '../components/Auth/LoginForm'
import { ThemeToggle } from '../components/ThemeToggle'
import { useTheme } from '../hooks/useTheme'
import { login } from '../store/authSlice'
import { useAppDispatch } from '../store/hooks'

export function Login() {
  const { theme, setTheme } = useTheme()
  const dispatch = useAppDispatch()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 font-medium">
          <span
            aria-hidden="true"
            className="size-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#6db4ff,#0a58d6_60%,#06307a)]"
          />
          Travel CRM
          <Badge variant="secondary">Admin</Badge>
        </div>
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <main className="grid flex-1 place-items-center px-4 py-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-1.5 text-muted-foreground">Super admin access to the Travel CRM platform.</p>
          </div>

          <Card className="p-6">
            <LoginForm onSubmit={({ email }) => dispatch(login({ email }))} />
          </Card>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-[13px] text-subtle-foreground">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Restricted area. Authorized personnel only.
          </p>
        </div>
      </main>
    </div>
  )
}
