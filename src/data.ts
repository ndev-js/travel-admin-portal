export type TenantStatus = 'active' | 'trial' | 'past_due'
export type Plan = 'Enterprise' | 'Pro' | 'Starter' | 'Trial'

export interface Tenant {
  id: string
  name: string
  domain: string
  plan: Plan
  seats: number
  owner: string
  lastActive: string
  status: TenantStatus
  /** 0–360, drives the generated tenant icon colour */
  hue: number
}

export interface UsageItem {
  label: string
  hint: string
  used: string
  limit: string
  percent: number
}

export type RefTone = 'info' | 'success' | 'danger'

export interface ActivityItem {
  id: string
  tenant: string
  hue: number
  actor: string
  event: string
  ref: string
  refTone: RefTone
}

export const tenants: Tenant[] = [
  {
    id: 't1',
    name: 'skyline-travels',
    domain: 'skyline.travelcrm.app',
    plan: 'Enterprise',
    seats: 48,
    owner: 'priya@skylinetravels.com',
    lastActive: '14h ago',
    status: 'active',
    hue: 18,
  },
  {
    id: 't2',
    name: 'voyage-hub',
    domain: 'voyagehub.travelcrm.app',
    plan: 'Pro',
    seats: 12,
    owner: 'omar@voyagehub.io',
    lastActive: '1d ago',
    status: 'active',
    hue: 265,
  },
  {
    id: 't3',
    name: 'atlas-tours',
    domain: 'atlas.travelcrm.app',
    plan: 'Pro',
    seats: 9,
    owner: 'lina@atlastours.co',
    lastActive: '2d ago',
    status: 'active',
    hue: 200,
  },
  {
    id: 't4',
    name: 'nomad-journeys',
    domain: 'nomad.travelcrm.app',
    plan: 'Trial',
    seats: 3,
    owner: 'sara@nomadjourneys.com',
    lastActive: '3h ago',
    status: 'trial',
    hue: 150,
  },
  {
    id: 't5',
    name: 'horizon-holidays',
    domain: 'horizon.travelcrm.app',
    plan: 'Pro',
    seats: 21,
    owner: 'imran@horizonholidays.pk',
    lastActive: '5d ago',
    status: 'past_due',
    hue: 40,
  },
  {
    id: 't6',
    name: 'safari-co',
    domain: 'safari.travelcrm.app',
    plan: 'Starter',
    seats: 5,
    owner: 'amina@safari.co.ke',
    lastActive: '6/26/26',
    status: 'active',
    hue: 100,
  },
  {
    id: 't7',
    name: 'bluewave-cruises',
    domain: 'bluewave.travelcrm.app',
    plan: 'Enterprise',
    seats: 64,
    owner: 'ops@bluewavecruises.com',
    lastActive: '22h ago',
    status: 'active',
    hue: 225,
  },
  {
    id: 't8',
    name: 'pearl-getaways',
    domain: 'pearl.travelcrm.app',
    plan: 'Trial',
    seats: 2,
    owner: 'zoya@pearlgetaways.com',
    lastActive: '6/26/26',
    status: 'trial',
    hue: 320,
  },
]

export const usage: UsageItem[] = [
  { label: 'Database Storage', hint: 'Across all tenant databases', used: '71.62 GB', limit: '500 GB', percent: 14 },
  { label: 'API Requests', hint: 'Public + internal API calls', used: '265K', limit: '1M', percent: 26.5 },
  { label: 'Bandwidth', hint: 'Outbound data transfer', used: '19.63 GB', limit: '100 GB', percent: 19.6 },
  { label: 'Active Seats', hint: 'Seats in use across tenants', used: '164', limit: '200', percent: 82 },
  { label: 'Background Jobs', hint: 'Queue workers, last 30 days', used: '48K', limit: '100K', percent: 48 },
  { label: 'Email Sends', hint: 'Transactional + campaign emails', used: '9.4K', limit: '10K', percent: 94 },
]

export const activity: ActivityItem[] = [
  {
    id: 'a1',
    tenant: 'skyline-travels',
    hue: 18,
    actor: 'PR',
    event: 'Upgraded plan to Enterprise',
    ref: '7UFaojsyg',
    refTone: 'info',
  },
  {
    id: 'a2',
    tenant: 'horizon-holidays',
    hue: 40,
    actor: 'IM',
    event: 'Payment failed · invoice INV-2041',
    ref: '4G8sP3nNx',
    refTone: 'danger',
  },
  {
    id: 'a3',
    tenant: 'nomad-journeys',
    hue: 150,
    actor: 'SK',
    event: 'Trial started · 14 days left',
    ref: 'Q2mVx9tLd',
    refTone: 'success',
  },
]
