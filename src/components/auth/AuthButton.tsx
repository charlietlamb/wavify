import { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'

export default function AuthButton({
  mode,
  setMode,
}: {
  mode: 'li' | 'su'
  setMode: Dispatch<SetStateAction<'li' | 'su'>>
}) {
  return (
    <Button
      className="absolute right-4 top-4 bg-transparent text-zinc-200 hover:bg-zinc-800/80"
      onClick={() => setMode(mode === 'li' ? 'su' : 'li')}
    >
      {mode === 'li' ? 'Log In' : 'Sign Up'}
    </Button>
  )
}
