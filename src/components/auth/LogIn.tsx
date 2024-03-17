import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SeparatorText from '../util/SeparatorText'
import OAuth from './OAuth'
import Link from 'next/link'
import ButtonLoader from '../utils/ButtonLoader'

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const handleSignIn = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setError('Invalid login details.')
    setLoading(false)
  }

  //   async function resetPasswordEmail() {
  //     await supabase.auth.resetPasswordForEmail(r_email, {
  //       redirectTo: `${location.origin}/api/auth/callback?next=/account/update-password`, //update this
  //     })
  //   }
  return (
    <div className="flex flex-col items-center gap-y-2">
      <h2 className="text-2xl font-bold text-zinc-200">Log In</h2>
      <p className="text-zinc-700">
        Enter your email and a password to log in.
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
        onClick={() => handleSignIn()}
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
