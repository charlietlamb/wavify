import { ShoppingBasket } from 'lucide-react'

export default function ResourcesUploadProduct() {
  return (
    <div
      className="flex w-full flex-grow cursor-pointer flex-col items-center justify-center rounded-lg border border-zinc-700 transition hover:border-zinc-200"
      onClick={() => 'need to convert to product'}
    >
      <p className="text-lg font-bold text-zinc-200">Convert To Product</p>
      <ShoppingBasket className="h-8 w-8 text-zinc-200" />
    </div>
  )
}
