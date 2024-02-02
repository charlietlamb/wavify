import { ServerCrash } from "lucide-react";

export default function ChatError() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full">
      <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Something went wrong!
      </p>
    </div>
  );
}
