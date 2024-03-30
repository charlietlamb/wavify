import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function onMemberClick(
  user: User,
  message: Message,
  router: AppRouterInstance
) {
  if (user.id === message.author) {
    return
  }
  router.push(`/user/${message.author}/chat`)
}
