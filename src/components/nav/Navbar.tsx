'use client'
import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import Wavify from '../wavify/Wavify'
import { UserRound } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="align-center flex w-screen flex-row justify-between border-b border-zinc-700 bg-zinc-200 px-8 py-2 text-zinc-950">
      <div className="navbar-left flex flex-row items-center justify-center">
        <div className="navbar-heading-wrap">
          <Link href="/">
            <Wavify className="min-h-8 min-w-8 text-zinc-900" fill="#18181B" />
          </Link>
        </div>
      </div>
      <div className="account flex flex-row items-center justify-center gap-x-4">
        {/* <ModeToggle></ModeToggle> */}
        <Link href="/account">
          <Button variant="zinc_icon" className="min-h-8 min-w-8 transition">
            <UserRound strokeWidth={2} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
