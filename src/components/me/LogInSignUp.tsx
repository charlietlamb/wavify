'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {Spinner} from "@nextui-org/react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { User ,AuthError } from '@supabase/supabase-js'



export default function LogInSignUpTabs() {
  const [li_email, li_setEmail] = useState('')
  const [li_password, li_setPassword] = useState('')
  const [su_email, su_setEmail] = useState('')
  const [su_password, su_setPassword] = useState('')
  const [r_email, r_setEmail] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [loading,setLoading] = useState(false);
  const [loadingTarget,setLoadingTarget] = useState('');
  const [passwordValid,setPasswordValid] = useState(true);
  const [logInValid, setLogInValid] = useState(true);
  const [signUpError, setSignUpError] = useState('');
  const [signUpComplete, setSignUpComplete] = useState(false);
  const [oAuthError, setOAuthError] = useState('');

  const handleSignUp = async () => {
    console.log('sign up attempt')
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(su_password.length >= 8 && specialCharPattern.test(su_password)){
        setPasswordValid(true);
    }else{
        setPasswordValid(false);
    }
    if(passwordValid){
      setLoading(true);
      setLoadingTarget('sign-up')
      await supabase.auth.signUp({
      email: su_email,
      password: su_password,
      options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
      },
      }).then((response) => {
        const { data, error } = response;
        if (error) {
          setSignUpError(error.message)
          console.log("error signing up",error.message);
          setLoading(false);
        } else {
          setLoading(true);
        }
    
        setLoading(false);
      }).catch((error: AuthError) => {
        setSignUpError(error.message)
        setLoading(false);
      });
      router.refresh()
    }
    
  }

  const handleSignIn = async () => {
    setLoading(true)
    setLoadingTarget('log-in')
    await supabase.auth.signInWithPassword({
      email: li_email,
      password: li_password,
    }).then((response) => {
      const { data, error } = response;
  
      if (error) {
        console.log("error logging in");
        setLoading(false);
        setLogInValid(false);
      } else {
        setLoading(false);
        setLogInValid(true);
      }
  
      setLoading(false);
    }).catch((error: AuthError) => {
      console.log('had to catch')
      setLoading(false);
    });
    router.refresh()
  }

  async function signInWithDiscord() {
    setLoading(true);
    setLoadingTarget('discord');
    await supabase.auth.signInWithOAuth({
        provider: 'discord',
    }).then(({ data, error }) => {
        if (error) {
            setOAuthError(error.message);
        } else {
            setOAuthError('');
        }
    });
  }

  async function handleSignInWithGoogle() {
    setLoading(true);
    setLoadingTarget('google');
    await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      }).then(({ data, error }) => {
        if (error) {
            setOAuthError(error.message);
        } else {
            setOAuthError('');
        }
    });
  }

  async function signInWithSpotify() {
    setLoading(true);
    setLoadingTarget('spotify');
    await supabase.auth.signInWithOAuth({
      provider: 'spotify',
    }).then(({ data, error }) => {
      //setLoading(false);
      if (error) {
          setOAuthError(error.message);
      } else {
          setOAuthError('');
      }
  });
  }
  
  async function resetPasswordEmail(){
    await supabase.auth.resetPasswordForEmail(r_email, {
        redirectTo: `${location.origin}/api/auth/callback?next=/account/update-password`, //update this
      })
      
  }
  

  return (
    <Tabs defaultValue="log-in" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="log-in">Log In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <div className="oauth-container flex flex-row w-[100%] my-4 items-center justify-between">
        <Button onClick={signInWithDiscord} className='o-auth-button flex w-[33.33%] flex-grow flex-row items-center justify-center'>
        {(loading && loadingTarget === 'discord') ? <svg width="24" height="24" stroke="#0f0f0f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='spinner'><g><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>
               : <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" fill="0f0f0f"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"/></svg>}
        </Button>
        <Button  onClick={signInWithSpotify} className='o-auth-button flex w-[33.34%] mx-1 flex-row items-center justify-center'>
        {(loading && loadingTarget === 'spotify') ? <svg width="24" height="24" stroke="#0f0f0f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='spinner'><g><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>
               : <svg enableBackground="new 0 0 56.69 56.69" height="56.69px" id="Layer_1" version="1.1" viewBox="0 0 56.69 56.69" width="56.69px" fill="#0f0f0f"><path d="M28.3411,3.813c-13.5932,0-24.613,11.019-24.613,24.6122s11.0198,24.6129,24.613,24.6129  c13.5936,0,24.6133-11.0197,24.6133-24.6129S41.9346,3.813,28.3411,3.813z M38.3264,40.0396c-0.3979,0-0.6699-0.138-1.0418-0.3646  c-3.5675-2.158-8.015-3.2921-12.7356-3.2921c-2.6336,0-5.2842,0.3374-7.7634,0.8533c-0.403,0.0876-0.9103,0.2436-1.2132,0.2436  c-0.9347,0-1.558-0.7431-1.558-1.5468c0-1.0348,0.5966-1.549,1.3389-1.691c3.04-0.6927,6.0676-1.0883,9.2123-1.0883  c5.3857,0,10.1859,1.2357,14.3165,3.7111c0.6147,0.3591,0.975,0.7253,0.975,1.6359C39.8572,39.388,39.1359,40.0396,38.3264,40.0396z   M41.0084,33.5251c-0.5341,0-0.8704-0.2156-1.233-0.4266c-4.0038-2.376-9.5529-3.9546-15.6295-3.9546  c-3.1168,0-5.8066,0.436-8.0333,1.0294c-0.4798,0.1318-0.749,0.2738-1.1977,0.2738c-1.0585,0-1.9226-0.8626-1.9226-1.9296  c0-1.0465,0.5073-1.7671,1.5309-2.0557c2.767-0.7598,5.5921-1.3459,9.7045-1.3459c6.4427,0,12.6751,1.6046,17.5749,4.5368  c0.8215,0.4716,1.124,1.0689,1.124,1.9454C42.9268,32.6641,42.0781,33.5251,41.0084,33.5251z M44.062,25.9488  c-0.5011,0-0.7986-0.1218-1.2683-0.379c-4.4549-2.6711-11.3684-4.1423-18.0547-4.1423c-3.3375,0-6.7274,0.3394-9.8325,1.1818  c-0.3576,0.09-0.8094,0.2692-1.2621,0.2692c-1.3129,0-2.3201-1.0386-2.3201-2.3515c0-1.3378,0.8289-2.0886,1.7232-2.3528  c3.5085-1.0336,7.4247-1.5153,11.6823-1.5153c7.2273,0,14.8312,1.4866,20.3857,4.7489c0.7485,0.424,1.2683,1.0635,1.2683,2.2352  C46.3837,24.9846,45.3051,25.9488,44.062,25.9488z"/></svg>}
        </Button>
        <Button onClick={handleSignInWithGoogle} className='o-auth-button flex w-[33.33%] flex-grow flex-row items-center justify-center'>
        {(loading && loadingTarget === 'google') ? <svg width="24" height="24" stroke="#0f0f0f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='spinner'><g><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>
               : <svg height="56.6934px" id="Layer_1" version="1.1" viewBox="0 0 56.6934 56.6934" width="56.6934px" xmlns="http://www.w3.org/2000/svg" fill="#0f0f0f"><path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017  c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139  c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649  c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805  c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294  c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196  c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372  C14.7889,7.8907,9.6815,12.3763,6.8497,18.0459c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836  C3.6238,29.5732,4.382,35.2707,6.8468,40.1378c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078  c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138  C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z"/></svg>}
        </Button>
      </div>
      { !!oAuthError &&
                (<Alert variant="destructive" className='mt-8'>
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {oAuthError}
                    </AlertDescription>
                </Alert>)
              }
      <TabsContent value="log-in">
        <Card>
          <CardHeader>
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              Log into your account using your email and password or any of our OAuth providers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="li_email">Email</Label>
              <Input type="email" id="li_email" onChange={(e) => li_setEmail(e.target.value)} value={li_email} />
            </div>
            <div className="li_password">
              <Label htmlFor="li_password" >Password</Label>
              <Input type="password" id="li_password" onChange={(e) => li_setPassword(e.target.value)} value={li_password} />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col min-w-[100%]'>
            <div className="log-in-buttons flex flex-row items-between min-w-[100%] justify-between">
              <Button onClick={handleSignIn}>{(loading && loadingTarget === 'log-in') ? <svg width="24" height="24" stroke="#0f0f0f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='spinner'><g><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>
               : 'Log In'}</Button>
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
                      <div className="grid items-center grid-cols-4 gap-4">
                          <Label htmlFor="name" className="text-right">
                          Email
                          </Label>
                          <Input id="reset-email" value={r_email} onChange={(e) => r_setEmail(e.target.value)} className="col-span-3" />
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
            
            { !logInValid &&
                (<Alert variant="destructive" className='mt-8'>
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Your email/password is incorrect.
                    </AlertDescription>
                </Alert>)
              }
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
            Sign up for an account using your email and password or any of our OAuth providers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="su_email">Email</Label>
              <Input type="email" name="su_email" onChange={(e) => su_setEmail(e.target.value)} value={su_email} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="su_password">Password</Label>
              <Input type="password" name="su_password" onChange={(e) => su_setPassword(e.target.value)} value={su_password} />
              <p className="text-sm text-muted-foreground">
                A password must be at least 8 characters long and contain one special character.
              </p>
              {!passwordValid &&
                (<Alert variant="destructive">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Your password is not strong enough.
                    </AlertDescription>
                </Alert>)
              }
              {signUpError &&
                (<Alert variant="destructive">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {signUpError}
                    </AlertDescription>
                </Alert>)
              }
              {signUpComplete &&
                (<Alert variant="default">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    <AlertTitle>Account Created</AlertTitle>
                    <AlertDescription>
                      A confirmation link has been sent to your email. Click it to active your account.
                    </AlertDescription>
                </Alert>)
              }
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignUp}>{(loading && loadingTarget === 'sign-up') ? <svg width="24" height="24" stroke="#0f0f0f" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='spinner'><g><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>
               : 'Sign Up'}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}