export type ResourceUploadOptions = {
  friendsOnly: boolean
  mustFollow: boolean
  allowSave: boolean
  allowDownload: boolean
}

export const resourceTypes = [
  'beats',
  'drumkits',
  'loops',
  'samples',
  'plugins',
  'presets',
  'other',
]

export type ResourceType = (typeof resourceTypes)[number]
