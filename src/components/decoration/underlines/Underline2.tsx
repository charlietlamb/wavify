export default function Underline2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 400"
      className={className}
    >
      <path
        d="M11.65919303894043,382.5111999511719C140.50822035471597,384.45440165201825,655.9043296178182,392.2272084554036,784.7533569335938,394.17041015625"
        fill="none"
        stroke-width="9"
        stroke='url("#SvgjsLinearGradient1001")'
        stroke-linecap="round"
      ></path>
      <defs>
        <linearGradient id="SvgjsLinearGradient1001">
          <stop stop-color="#fbbf24" offset="0"></stop>
          <stop stop-color="#f59e0b" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}
