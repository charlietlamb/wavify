'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { User, AuthError } from '@supabase/supabase-js'
import SignUp from './SignUp'
import AuthButton from './AuthButton'
import LogIn from './LogIn'

export default function Account() {
  const [mode, setMode] = useState<'li' | 'su'>('li')
  const [li_email, li_setEmail] = useState('')
  const [li_password, li_setPassword] = useState('')
  const [r_email, r_setEmail] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [loadingTarget, setLoadingTarget] = useState('')
  const [passwordValid, setPasswordValid] = useState(true)
  const [logInValid, setLogInValid] = useState(true)
  const [signUpError, setSignUpError] = useState('')
  const [signUpComplete, setSignUpComplete] = useState(false)


  return (
    <div className="relative flex w-[100vw] flex-row items-center justify-center lg:w-[50vw]">
      <AuthButton mode={mode} setMode={setMode} />
      {mode === 'li' ? <LogIn /> : <SignUp />}
    </div>
  )
}
