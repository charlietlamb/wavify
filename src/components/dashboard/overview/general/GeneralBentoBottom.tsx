import React from 'react'
import GeneralBentoChart from './GeneralBentoChart'
import GeneralBentoRecent from './GeneralBentoRecent'

export default function GeneralBentoBottom() {
  return (
    <div className="flex min-h-[766px] flex-grow flex-col gap-4 overflow-y-auto md:min-h-0 md:flex-row">
      <GeneralBentoChart />
      <GeneralBentoRecent />
    </div>
  )
}
