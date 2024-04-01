import Account from '@/components/auth/Account'
import AuthSwiper from '@/components/auth/AuthSwiper'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function page() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className="flex flex-grow divide-zinc-700 lg:divide-x">
      <AuthSwiper />
      <Account />
    </div>
  )
}
