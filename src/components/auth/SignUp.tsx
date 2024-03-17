import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SeparatorText from '../util/SeparatorText'
import OAuth from './OAuth'
import Link from 'next/link'
import ButtonLoader from '../utils/ButtonLoader'

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
    <div className="flex flex-col items-center gap-y-2">
      <h2 className="text-2xl font-bold text-zinc-200">Create an account</h2>
      <p className="text-zinc-700">
        Enter your email and a password to create an account.
      </p>
      <Input
        className="focus-visible:ring-0 focus-visible:border-zinc-200 border border-zinc-700 bg-transparent text-zinc-200"
        placeholder="mail@example.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        className="focus-visible:ring-0 focus-visible:border-zinc-200 border border-zinc-700 bg-transparent text-zinc-200"
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
      <div className="flex-inline text-zinc-700">
        By clicking continue, you agree to our{' '}
        <Link href="terms-of-service">Terms Of Service</Link> and{' '}
        <Link href="privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  )
}
