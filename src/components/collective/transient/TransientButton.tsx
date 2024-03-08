import { Button } from '@/components/ui/button'
import { useModal } from '../../../../hooks/use-modal-store'
import { useFilesContext } from '@/components/files/state/context'

export default function TransientButton() {
  const { onOpen } = useModal()
  const { space } = useFilesContext()
  return (
    <Button
      onClick={() => {
        onOpen('updateTimer', { space })
      }}
    >
      Update Timer
    </Button>
  )
}
