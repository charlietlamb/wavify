import { Loader2 } from "lucide-react";
import { useFilesContext } from "./context";

export default function ChatFilesLoader() {
  const context = useFilesContext();
  const { isFetchingNextPageFiles } = context;
  return (
    <div className="flex justify-center h-14">
      {isFetchingNextPageFiles && (
        <Loader2 className="w-6 h-6 my-4 text-zinc-500 animate-spin" />
      )}
    </div>
  );
}
