import type { RouteObject } from 'react-router'
import { Overview } from '../components/Overview'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { pageLabel } from '../nav'
import { NotFound } from '../pages/NotFound'
import { Placeholder } from '../pages/Placeholder'
import { ProtectedRoute } from './guards/ProtectedRoute'
import { PATHS } from './paths'

/** Require a session; all render inside the dashboard shell */
export const protectedRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: PATHS.tenants, element: <Overview /> },
          { path: PATHS.users, element: <Placeholder title={pageLabel.users} /> },
          { path: PATHS.subscriptions, element: <Placeholder title={pageLabel.subscriptions} /> },
          { path: PATHS.logs, element: <Placeholder title={pageLabel.logs} /> },
          { path: PATHS.analytics, element: <Placeholder title={pageLabel.analytics} /> },
          { path: PATHS.performance, element: <Placeholder title={pageLabel.performance} /> },
          { path: PATHS.observability, element: <Placeholder title={pageLabel.observability} /> },
          { path: PATHS.security, element: <Placeholder title={pageLabel.security} /> },
          { path: PATHS.infrastructure, element: <Placeholder title={pageLabel.infrastructure} /> },
          { path: PATHS.flags, element: <Placeholder title={pageLabel.flags} /> },
          { path: PATHS.domains, element: <Placeholder title={pageLabel.domains} /> },
          { path: PATHS['api-keys'], element: <Placeholder title={pageLabel['api-keys']} /> },
          { path: PATHS.integrations, element: <Placeholder title={pageLabel.integrations} /> },
          { path: '*', element: <NotFound /> },
        ],
      },
    ],
  },
]
