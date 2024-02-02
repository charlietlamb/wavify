import ChatInputSkeleton from "../ChatInputSkeleton";

export default function ChatItemPending() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
      <ChatInputSkeleton></ChatInputSkeleton>
      <ChatInputSkeleton></ChatInputSkeleton>
      <ChatInputSkeleton></ChatInputSkeleton>
      <ChatInputSkeleton></ChatInputSkeleton>
      <ChatInputSkeleton></ChatInputSkeleton>
      <ChatInputSkeleton></ChatInputSkeleton>
    </div>
  );
}
