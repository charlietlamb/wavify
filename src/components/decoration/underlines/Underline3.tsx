export default function Underline3({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 400"
      className={className}
    >
      <path
        d="M18.834081649780273,360.0896911621094C19.097160828908283,361.1420081583659,-1.581466108957926,388.72347544352215,26.008968353271484,388.78924560546875C53.599402815500895,388.85501576741535,743.9731207911174,362.8699696858724,771.3004760742188,361.8834228515625"
        fill="none"
        stroke-width="5"
        stroke='url("#SvgjsLinearGradient1002")'
        stroke-linecap="round"
      ></path>
      <defs>
        <linearGradient id="SvgjsLinearGradient1002">
          <stop stop-color="#fbbf24" offset="0"></stop>
          <stop stop-color="#f59e0b" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
