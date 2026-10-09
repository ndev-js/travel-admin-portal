import type { RouteObject } from 'react-router'
import { Login } from '../pages/Login'
import { GuestRoute } from './guards/GuestRoute'
import { PATHS } from './paths'

/** Reachable without a session */
export const publicRoutes: RouteObject[] = [
  {
    element: <GuestRoute />,
    children: [{ path: PATHS.login, element: <Login /> }],
  },
]
