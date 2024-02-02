import { Loader2 } from "lucide-react";
import React from "react";
import { useItemContext } from "./context";

export default function ChatItemLoader() {
  const context = useItemContext();
  const { fetchNextPage, isFetchingNextPage } = context;
  return (
    <div className="flex justify-center">
      {isFetchingNextPage ? (
        <Loader2 className="w-6 h-6 my-4 text-zinc-500 animate-spin" />
      ) : (
        <button
          onClick={() => fetchNextPage()}
          className="my-4 text-xs transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
        >
          Load previous messages
        </button>
      )}
    </div>
  );
}
