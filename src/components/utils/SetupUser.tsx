'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect, ForwardRefExoticComponent } from 'react'
import Profile from '../image/Profile'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/app/types/supabase'
import { Check, LucideProps, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedCheckIcon } from '../icons/check'
import { AnimatedXIcon } from '../icons/x'
import { useUser } from '@/state/user/useUser'

export default function SetupUser() {
  const user = useUser()
  const supabase = createClientComponentClient<Database>()
  var inputValue: string = ''
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')
  const [username, setUsername] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [ppURL, setPpURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const iconProps = {
    height: '40',
    width: '40',
    color: '#facc15',
  }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    } else {
      setFile(null)
    }
  }

  async function submitUserDetails() {
    setLoading(true)
    if (usernameAvailable) {
      if (!!ppURL) {
        setErrorMessage('')
        const response = await uploadImage(ppURL, 'image/jpg', user)
        if (response.ok) {
          const uploadedImageUrl = response.url
          const { data, error } = await supabase
            .from('users')
            .update({
              username,
              profile_pic_url: uploadedImageUrl,
              setup_complete: true,
            })
            .match({ id: user.id })
          if (error) {
            setErrorMessage('There was an error creating your account.')
          } else {
            setErrorMessage('')
          }
        }
      } else {
        setErrorMessage('Please upload a profile image.')
      }
    } else {
      setErrorMessage('Please enter a valid username.')
    }
    setLoading(false)
  }

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout
    return function (this: any, ...args: any[]) {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(this, args), delay)
    }
  }

  const isUsernameAvailable = async (usernameToCheck: string) => {
    if (usernameToCheck === '') {
      setUsernameAvailable(false)
      return
    }
    const { data, error } = await supabase
      .from('users')
      .select('username')
      .eq('username', usernameToCheck)
      .not('id', 'eq', user.id)

    if (error) {
      console.error('Error checking username:', error)
      setUsernameAvailable(false)
    } else {
      setUsernameAvailable(data.length === 0)
    }
  }

  const debouncedCheckUsername = debounce(isUsernameAvailable, 100)

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allowedChars = /^[a-z0-9._-]*$/
    let inputValue = e.target.value
    if (!allowedChars.test(inputValue)) {
      inputValue = inputValue.replace(/[^a-z0-9._-]/g, '')
    }
    setUsername(inputValue)
    debouncedCheckUsername(inputValue)
  }

  function base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1])
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

  // Function to upload the image
  async function uploadImage(
    base64Image: string,
    contentType: string,
    user: User
  ): Promise<any> {
    const blob = base64ToBlob(base64Image, contentType)

    const formData = new FormData()
    formData.append('file', blob)
    formData.append('user', user.id)

    const response = await fetch('/api/s3-upload', {
      method: 'POST',
      body: formData,
    })
    return response
  }

  useEffect(() => {
    const interval = setInterval(() => {
      isUsernameAvailable(username)
    }, 1000)

    return () => clearInterval(interval)
  }, [username])

  return (
    <section className="flex h-full min-h-[80vh] flex-col items-center justify-center px-24">
      <motion.h1
        className="account-setup-header text-[4rem] font-semibold"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Before we begin...
      </motion.h1>
      <div className="user-setup-input flex w-[60%] flex-col">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Profile setURL={setPpURL} user={user} />
        </motion.div>
        <motion.div
          className="input-container mb-2 flex flex-row items-center justify-between gap-x-4"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Input
            placeholder="Username"
            type="text"
            className="text-center "
            value={username}
            onChange={usernameHandler}
          />
          {usernameAvailable ? (
            <AnimatedCheckIcon {...iconProps} />
          ) : (
            <AnimatedXIcon {...iconProps} />
          )}
        </motion.div>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="mb-2 text-sm text-muted-foreground">
            A username can only contain lower case characters, numbers, hyphens,
            underscores and periods
          </p>
          <Button type="submit" className="w-full" onClick={submitUserDetails}>
            {loading ? (
              <svg
                width="24"
                height="24"
                stroke="#0f0f0f"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="spinner"
              >
                <g>
                  <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    fill="none"
                    strokeWidth="3"
                  ></circle>
                </g>
              </svg>
            ) : (
              'Submit'
            )}
          </Button>
          {!!errorMessage && (
            <p className="mt-2 w-full text-center text-sm text-muted-foreground text-red-500">
              {errorMessage}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
