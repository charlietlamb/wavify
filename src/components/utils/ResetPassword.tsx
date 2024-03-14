"use client"
import * as React from "react"

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
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"




export function ResetPassword() {
    const [p1,setP1] = useState('');
    const [p2,setP2] = useState('');
    const supabase = createClientComponentClient()
    async function resetPassword(){
        await supabase.auth.updateUser({ password: p1 })
    }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="p1">Password</Label>
              <Input id="nap1me" placeholder="Password" value={p2} onChange={(e)=>setP2(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="p2">Confirm Password</Label>
              <Input id="p2" placeholder="Confirm Password" value={p1} onChange={(e)=>setP1(e.target.value)}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={resetPassword}>Update</Button>
      </CardFooter>
    </Card>
  )
}
