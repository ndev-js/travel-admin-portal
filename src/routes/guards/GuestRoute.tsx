import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '../../store/hooks'
import { DEFAULT_AUTHENTICATED_PATH } from '../paths'

/** For pages like login that a signed-in user has no reason to see */
export function GuestRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? DEFAULT_AUTHENTICATED_PATH

  if (isAuthenticated) return <Navigate to={from} replace />

  return <Outlet />
}
