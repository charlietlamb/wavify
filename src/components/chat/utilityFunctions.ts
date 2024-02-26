export function isJson(value: unknown): value is Json {
  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return true
    case 'object':
      if (Array.isArray(value)) {
        return value.every(isJson)
      }
      if (value === null) {
        return true
      }
      return value && Object.values(value).every(isJson)
    default:
      return false
  }
}

export function isMessageAuthor(value: unknown): value is MessageAuthor {
  return (
    typeof value === 'object' &&
    value !== null &&
    'users' in value &&
    typeof value.users === 'object' &&
    value.users !== null &&
    'username' in value.users &&
    typeof value.users.username === 'string' &&
    'profile_pic_url' in value.users &&
    typeof value.users.profile_pic_url === 'string'
  )
}
