import { UserAvatar } from '@/components/utils/UserAvatar'
import { useUser } from '@/state/user/useUser'

export default function GeneralBentoRecent() {
  const user = useUser()
  const sales = [
    {
      user,
      amount: 100,
    },
    {
      user,
      amount: 101,
    },
    {
      user,
      amount: 342,
    },
    {
      user,
      amount: 23,
    },
    {
      user,
      amount: 7,
    },
  ]
  return (
    <div className="flex max-h-full min-h-[300px] w-full flex-col justify-start gap-y-2 overflow-x-hidden rounded-md border border-zinc-700 py-2 transition hover:border-zinc-200 md:w-[50%]">
      {sales.map((sale) => (
        <button
          className="flex w-full items-center justify-between gap-x-4 overflow-x-hidden rounded-md px-4 py-1 hover:bg-zinc-800/50"
          key={sale.amount}
          onClick={() => console.log('go to sale')}
        >
          <div className="flex flex-grow items-center gap-x-1 overflow-hidden overflow-ellipsis">
            <UserAvatar
              user={user}
              className="h-8 w-8 rounded-full lg:h-12 lg:w-12"
            />
            <div className="flex flex-grow flex-col text-left leading-none lg:leading-normal">
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold">
                {sale.user.username}
              </p>
              <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-zinc-400">
                {sale.user.email}
              </p>
            </div>
          </div>
          <p className="flex-shrink-0 text-lg font-semibold">${sale.amount}</p>
        </button>
      ))}
    </div>
  )
}
