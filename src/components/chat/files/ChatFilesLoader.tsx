import { Loader2 } from "lucide-react";
import { useFilesContext } from "./context";

export default function ChatFilesLoader() {
  const context = useFilesContext();
  const { fetchNextPageFiles, isFetchingNextPageFiles } = context;
  return (
    <div className="flex justify-center">
      {isFetchingNextPageFiles ? (
        <Loader2 className="w-6 h-6 my-4 text-zinc-500 animate-spin" />
      ) : (
        <button
          onClick={() => fetchNextPageFiles()}
          className="my-4 text-xs transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
        >
          Load previous files
        </button>
      )}
    </div>
  );
}
