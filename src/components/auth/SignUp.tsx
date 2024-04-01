import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SeparatorText from '../util/SeparatorText'
import OAuth from './OAuth'
import Link from 'next/link'
import ButtonLoader from '../utils/ButtonLoader'
import Underline2 from '../decoration/underlines/Underline2'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const handleSignUp = async () => {
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if (password.length >= 8 && specialCharPattern.test(password)) {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        setLoading(true)
      }
    } else {
      setError(
        'Password is too weak. It should be at least 8 characters long and contain at least one special character.'
      )
    }
  }
  return (
    <div className="flex flex-col items-center gap-y-2 px-8">
      <div className="relative">
        <h2 className="relative z-10 text-4xl font-bold text-zinc-200 sm:text-6xl">
          Sign Up
        </h2>
        <Underline2 className="absolute bottom-0 w-full" />
      </div>
      <p className="text-center text-zinc-400 sm:text-lg">
        Enter your email and a password to create an account.
      </p>
      <Input
        className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        placeholder="mail@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonLoader
        variant="zinc"
        onClick={() => handleSignUp()}
        text="Sign Up With Email"
        isLoading={loading}
      />
      {!!error && <p className="text-red-500">{error}</p>}
      <SeparatorText text="OR CONTINUE WITH" />
      <OAuth />
      <div className="flex-inline sm:text-md text-center text-sm text-zinc-400">
        By clicking continue, you agree to our{' '}
        <Link href="terms-of-service">Terms Of Service</Link> and{' '}
        <Link href="privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  )
}
