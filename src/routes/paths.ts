/** Single source of truth for URLs. Import from here instead of hard-coding path strings. */
export const PATHS = {
  login: '/login',

  tenants: '/',
  users: '/users',
  subscriptions: '/subscriptions',
  logs: '/logs',
  analytics: '/analytics',
  performance: '/performance',
  observability: '/observability',
  security: '/security',
  infrastructure: '/infrastructure',
  flags: '/flags',
  domains: '/domains',
  'api-keys': '/api-keys',
  integrations: '/integrations',
} as const

/** Where a user lands after signing in */
export const DEFAULT_AUTHENTICATED_PATH = PATHS.tenants
