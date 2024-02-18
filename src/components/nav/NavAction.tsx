"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../util/ActionTooltip";
import { useModal } from "../../../hooks/use-modal-store";

export default function NavigationAction() {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="bottom" align="center" label="Create A Collective">
        <button
          className="flex items-center group"
          onClick={() => onOpen("createCollective")}
        >
          <div className="flex h-[2rem] w-[2rem] rounded-full group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-zinc-400 group-hover:bg-zinc-600">
            <Plus
              className="transition group-hover:text-white text-background_content"
              size={20}
              strokeWidth={1.5}
            ></Plus>
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
