import React from 'react'
import getUser from '../actions/getUser'
import { redirect } from 'next/navigation'
import SetupUser from '@/components/utils/SetupUser'

export default async function page() {
  const user = await getUser()
  if (!user) return redirect('/account')
  if (user.setup_complete) return redirect('/dashboard/overview/general')
  return <SetupUser />
}
