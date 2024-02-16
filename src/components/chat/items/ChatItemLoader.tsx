import { Loader2 } from "lucide-react";
import React from "react";
import { useItemContext } from "./context";

export default function ChatItemLoader() {
  const context = useItemContext();
  const { isFetchingNextPage } = context;
  return (
    <div className="flex justify-center h-14">
      {isFetchingNextPage && (
        <Loader2 className="w-6 h-6 my-4 text-zinc-500 animate-spin" />
      )}
    </div>
  );
}
