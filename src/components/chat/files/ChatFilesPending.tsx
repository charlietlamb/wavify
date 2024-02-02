import ChatFileSkeleton from "./ChatFileSkeleton";

export default function ChatFilesPending() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full">
      <ChatFileSkeleton></ChatFileSkeleton>
      <ChatFileSkeleton></ChatFileSkeleton>
      <ChatFileSkeleton></ChatFileSkeleton>
      <ChatFileSkeleton></ChatFileSkeleton>
      <ChatFileSkeleton></ChatFileSkeleton>
    </div>
  );
}
