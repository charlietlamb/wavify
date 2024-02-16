import { cn } from "@/lib/utils";
import { MotionConfig } from "framer-motion";
import React from "react";
import ChatItemPending from "./ChatItemPending";
import ChatError from "../ChatError";
import ChatItemContainer from "./ChatItemContainer";
import { useItemContext } from "./context";

export default function ChatItemWrap() {
  const context = useItemContext();
  const { chatRef, fileTab, status } = context;
  return (
    <div ref={chatRef} className={cn("overflow-auto flex-grow", fileTab && "w-full")}>
      <div className="flex flex-col px-4">
        <MotionConfig transition={{ duration: 0.4 }}>
          {status === "pending" ? (
            <ChatItemPending />
          ) : status === "error" ? (
            <ChatError />
          ) : (
            <ChatItemContainer />
          )}
        </MotionConfig>
      </div>
    </div>
  );
}
