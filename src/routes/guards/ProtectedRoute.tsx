import { Navigate, Outlet, useLocation } from 'react-router'
import { useAppSelector } from '../../store/hooks'
import { PATHS } from '../paths'

/** Lets signed-in users through; sends everyone else to login */
export function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()

  // Remember where the user was headed so login can send them back
  if (!isAuthenticated) return <Navigate to={PATHS.login} replace state={{ from: location.pathname }} />

  return <Outlet />
}
