"use client"

import { Plus } from "lucide-react"
import { ActionTooltip } from "../util/ActionTooltip"
import { useModal } from "../../../hooks/use-modal-store"

export default function NavigationAction() {
  const  { onOpen } = useModal();
  return (
    <div>
        <ActionTooltip side="bottom" align="center" label="Create A Collective">
            <button className="flex items-center group"
            onClick={() => onOpen("createCollective")}>
                <div className="flex my-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-primary group-hover:bg-secondary">
                    <Plus className="transition group-hover:text-white text-background_content" size={25}></Plus>
                </div>
            </button>
        </ActionTooltip>
    </div>
  )
}
