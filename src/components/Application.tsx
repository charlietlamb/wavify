'use client'

import { useRef } from 'react'
import FloatingMenu from './nav/FloatingMenu'

export default function Application({
  children,
}: {
  children: React.ReactNode
}) {
  const constraintsRef = useRef(null)

  return (
    <main
      className="z-1 relative left-0 top-0 flex w-[100%] flex-grow bg-background_content"
      ref={constraintsRef}
    >
      <FloatingMenu constraintsRef={constraintsRef} />
      {children}
    </main>
  )
}
