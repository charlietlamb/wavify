export const pathMap = new Map<string, string>([
  ['library', 'library'],
  ['postbox', 'postbox/user'],
  ['postbox/user', 'library'],
  ['transient', 'library'],
  ['feedback', 'feedback/user'],
  ['feedback/user', 'library'],
  ['collectives', 'collectives/collective'],
  ['collectives/collective', 'collectives/collective/space'],
  ['collectives/collective/space', 'library'],
  ['chats', 'chats/user'],
  ['chats/user', 'library'],
  ['library/user', 'library'],
])
