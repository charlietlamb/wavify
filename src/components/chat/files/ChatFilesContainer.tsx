import { cn } from "@/lib/utils";
import { MotionConfig } from "framer-motion";
import ChatFilesDisplay from "./ChatFilesDisplay";
import ChatFilesPending from "./ChatFilesPending";
import ChatError from "../ChatError";
import { FilesContext, useFilesContext } from "./context";

export default function ChatFilesContainer() {
  const context = useFilesContext();
  const { statusFiles } = context;
  return (
    <div className={cn("flex flex-col justify-end w-full")}>
      <MotionConfig transition={{ duration: 0.4 }}>
        {statusFiles === "pending" ? (
          <ChatFilesPending />
        ) : statusFiles === "error" ? (
          <ChatError />
        ) : (
          <ChatFilesDisplay />
        )}
      </MotionConfig>
    </div>
  );
}
