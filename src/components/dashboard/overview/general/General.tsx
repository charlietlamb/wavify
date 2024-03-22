'use client'

import React from 'react'
import GeneralBentoTop from './GeneralBentoTop'
import GeneralBentoBottom from './GeneralBentoBottom'

export default function General() {
  return (
    <div className="flex h-full flex-grow flex-col gap-y-4">
      <GeneralBentoTop />
      <GeneralBentoBottom />
    </div>
  )
}
