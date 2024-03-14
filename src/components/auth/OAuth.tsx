import React, { useState } from 'react'
import ButtonLoaderIcon from '../utils/ButtonLoaderIcon'
import { SiDiscord, SiSpotify } from 'react-icons/si'
import { BsGoogle } from 'react-icons/bs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function OAuth() {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [loadingTarget, setLoadingTarget] = useState('')
  const [oAuthError, setOAuthError] = useState('')

  async function signInWithDiscord() {
    setLoading(true)
    setLoadingTarget('discord')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    })

    if (error) return setOAuthError(error.message)
    setOAuthError('')
  }

  async function handleSignInWithGoogle() {
    setLoading(true)
    setLoadingTarget('google')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    if (error) return setOAuthError(error.message)
    setOAuthError('')
  }

  async function signInWithSpotify() {
    setLoading(true)
    setLoadingTarget('spotify')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'spotify',
    })
    if (error) return setOAuthError(error.message)
    setOAuthError('')
  }
  return (
    <div className="grid columns-3 gap-x-2">
      <ButtonLoaderIcon
        onClick={signInWithDiscord}
        className="flex flex-row items-center justify-center"
        isLoading={loading && loadingTarget === 'discord'}
        icon={<SiDiscord />}
        variant="zinc_outline"
      ></ButtonLoaderIcon>
      <ButtonLoaderIcon
        onClick={signInWithSpotify}
        className="flex flex-row items-center justify-center"
        isLoading={loading && loadingTarget === 'spotify'}
        icon={<SiSpotify />}
        variant="zinc_outline"
      ></ButtonLoaderIcon>
      <ButtonLoaderIcon
        onClick={handleSignInWithGoogle}
        className="flex flex-row items-center justify-center"
        isLoading={loading && loadingTarget === 'google'}
        icon={<BsGoogle />}
        variant="zinc_outline"
      ></ButtonLoaderIcon>
    </div>
  )
}
