'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import SignUp from './SignUp'
import AuthButton from './AuthButton'
import LogIn from './LogIn'

export default function Account() {
  const [mode, setMode] = useState<'li' | 'su'>('li')

  return (
    <div className="relative flex w-[100vw] flex-row items-center justify-center lg:w-[50vw]">
      <AuthButton mode={mode} setMode={setMode} />
      {mode === 'li' ? <LogIn /> : <SignUp />}
    </div>
  )
}
