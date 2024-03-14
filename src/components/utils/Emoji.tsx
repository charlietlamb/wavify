import data from "@emoji-mart/data";
import { init } from "emoji-mart";

init({ data });

interface EmojiProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  id?: string;
  shortcodes?: string;
  native?: string;
  size?: string;
  fallback?: string;
  set?: string;
  skin?: string;
}
export default function Emoji({
  id,
  shortcodes,
  native,
  size,
  fallback,
  set,
  skin,
}: EmojiProps) {
  return (
    <em-emoji
      id={id}
      shortcodes={shortcodes}
      native={native}
      size={size}
      fallback={fallback}
      set={set}
      skin={skin}
    ></em-emoji>
  );
}
