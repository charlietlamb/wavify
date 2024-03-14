'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Spinner } from '@nextui-org/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { User, AuthError } from '@supabase/supabase-js'

export default function Account() {
  const [mode, setMode] = useState<'li' | 'su'>('li')
  const [li_email, li_setEmail] = useState('')
  const [li_password, li_setPassword] = useState('')
  const [su_email, su_setEmail] = useState('')
  const [su_password, su_setPassword] = useState('')
  const [r_email, r_setEmail] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [loadingTarget, setLoadingTarget] = useState('')
  const [passwordValid, setPasswordValid] = useState(true)
  const [logInValid, setLogInValid] = useState(true)
  const [signUpError, setSignUpError] = useState('')
  const [signUpComplete, setSignUpComplete] = useState(false)

  const handleSignUp = async () => {
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

    setPasswordValid(
      su_password.length >= 8 && specialCharPattern.test(su_password)
    )

    if (passwordValid) {
      setLoading(true)
      setLoadingTarget('sign-up')
      await supabase.auth
        .signUp({
          email: su_email,
          password: su_password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        .then((response) => {
          const { data, error } = response
          if (error) {
            setSignUpError(error.message)
            setLoading(false)
          } else {
            setLoading(true)
          }

          setLoading(false)
        })
        .catch((error: AuthError) => {
          setSignUpError(error.message)
          setLoading(false)
        })
      router.refresh()
    }
  }

  const handleSignIn = async () => {
    setLoading(true)
    setLoadingTarget('log-in')
    await supabase.auth
      .signInWithPassword({
        email: li_email,
        password: li_password,
      })
      .then((response) => {
        const { data, error } = response

        if (error) {
          setLoading(false)
          setLogInValid(false)
        } else {
          setLoading(false)
          setLogInValid(true)
        }

        setLoading(false)
      })
      .catch((error: AuthError) => {
        setLoading(false)
        throw new Error(String(error.message))
      })
    router.refresh()
  }

  async function resetPasswordEmail() {
    await supabase.auth.resetPasswordForEmail(r_email, {
      redirectTo: `${location.origin}/api/auth/callback?next=/account/update-password`, //update this
    })
  }

  return (
    <div className="flex w-[100vw] flex-row items-center justify-center lg:w-[50vw]">
      <Tabs defaultValue="log-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="log-in">Log In</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>

        {!!oAuthError && (
          <Alert variant="destructive" className="mt-8">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{oAuthError}</AlertDescription>
          </Alert>
        )}
        <TabsContent value="log-in">
          <Card>
            <CardHeader>
              <CardTitle>Log in</CardTitle>
              <CardDescription>
                Log into your account using your email and password or any of
                our OAuth providers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="li_email">Email</Label>
                <Input
                  type="email"
                  id="li_email"
                  onChange={(e) => li_setEmail(e.target.value)}
                  value={li_email}
                />
              </div>
              <div className="li_password">
                <Label htmlFor="li_password">Password</Label>
                <Input
                  type="password"
                  id="li_password"
                  onChange={(e) => li_setPassword(e.target.value)}
                  value={li_password}
                />
              </div>
            </CardContent>
            <CardFooter className="flex min-w-[100%] flex-col">
              <div className="log-in-buttons items-between flex min-w-[100%] flex-row justify-between">
                <Button onClick={handleSignIn}>
                  {loading && loadingTarget === 'log-in' ? (
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
                          stroke-width="3"
                        ></circle>
                      </g>
                    </svg>
                  ) : (
                    'Log In'
                  )}
                </Button>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Reset Password</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Reset Password</SheetTitle>
                      <SheetDescription>
                        Enter your email to receive your password reset link.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="reset-email"
                          value={r_email}
                          onChange={(e) => r_setEmail(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button type="submit">Send Link</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
              {!logInValid && (
                <Alert variant="destructive" className="mt-8">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Your email/password is incorrect.
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Sign up for an account using your email and password or any of
                our OAuth providers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="su_email">Email</Label>
                <Input
                  type="email"
                  name="su_email"
                  onChange={(e) => su_setEmail(e.target.value)}
                  value={su_email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="su_password">Password</Label>
                <Input
                  type="password"
                  name="su_password"
                  onChange={(e) => su_setPassword(e.target.value)}
                  value={su_password}
                />
                <p className="text-sm text-muted-foreground">
                  A password must be at least 8 characters long and contain one
                  special character.
                </p>
                {!passwordValid && (
                  <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your password is not strong enough.
                    </AlertDescription>
                  </Alert>
                )}
                {signUpError && (
                  <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{signUpError}</AlertDescription>
                  </Alert>
                )}
                {signUpComplete && (
                  <Alert variant="default">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Account Created</AlertTitle>
                    <AlertDescription>
                      A confirmation link has been sent to your email. Click it
                      to active your account.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignUp}>
                {loading && loadingTarget === 'sign-up' ? (
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
                        stroke-width="3"
                      ></circle>
                    </g>
                  </svg>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
