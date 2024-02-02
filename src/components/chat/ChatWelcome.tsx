import { Hash } from "lucide-react";
import { useItemContext } from "./items/context";

export const ChatWelcome = () => {
  const context = useItemContext();
  const { type, name } = context;
  return (
    <div className="px-4 mb-4 space-y-2">
      {type === "space" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="w-12 h-12 text-white" />
        </div>
      )}
      <p className="text-xl font-bold text-white md:text-3xl">
        {type === "space" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === "space"
          ? `This is the start of the #${name} space.`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};
