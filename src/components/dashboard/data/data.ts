export const views = [
  'overview',
  'collectives',
  'market',
  'resources',
  'collections',
  'settings',
]

export type ViewType =
  | 'overview'
  | 'collectives'
  | 'market'
  | 'resources'
  | 'settings'

export const viewTitleMap = new Map([
  ['overview', 'Dashboard'],
  ['collectives', 'Collectives'],
  ['market', 'Market'],
  ['resources', 'Resources'],
  ['collections', 'Collections'],
  ['settings', 'Settings'],
])

export const modes = ['general', 'analytics', 'reports', 'notifications']
export type ModeType = 'general' | 'analytics' | 'reports' | 'notifications'

export const viewModeMap = new Map([
  ['overview', ['general', 'analytics', 'reports', 'notifications']],
  ['collectives', ['general', 'analytics', 'reports', 'notifications']],
  ['market', ['general', 'analytics', 'reports', 'notifications']],
  ['resources', ['general', 'upload', 'manage']],
  ['collections', ['general', 'create', 'manage']],
  ['settings', ['general', 'analytics', 'reports', 'notifications']],
])
