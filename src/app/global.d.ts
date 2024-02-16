import { SupabaseClient } from "@supabase/supabase-js";
import { Database as DB } from "./types/supabase";
declare module "@emoji-mart/data";

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
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "em-emoji": EmojiProps;
    }
  }
}
declare global {
  type TODO = any;
  type Database = DB;
  type Supabase = SupabaseClient;
  type User = DB["public"]["Tables"]["users"]["Row"];
  type Collective = DB["public"]["Tables"]["collectives"]["Row"];
  type Chat = DB["public"]["Tables"]["chats"]["Row"];
  type Message = DB["public"]["Tables"]["messages"]["Row"];
  type Role = DB["public"]["Tables"]["roles"]["Row"];
  type Space = DB["public"]["Tables"]["spaces"]["Row"];
  type ColUser = DB["public"]["Tables"]["colUsers"]["Row"];
  type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];
  type SpaceType = "text" | "audio" | "video";

  type MessageAuthor = {
    users: {
      username: string;
      profile_pic_url: string;
    };
  };
  type MessageAndAuthor = Message & MessageAuthor;

  type MessagesToRender = {
    pages: (MessageAndAuthor[] | null)[];
  };

  type AndRole = {
    roles: Role;
  };
  type AndUser = {
    users: User;
  };

  type ColUserAndRole = ColUser & AndRole;
  type ColUserAndData = ColUser & AndRole & AndUser;

  type SearchData = {
    key: string;
    label: string;
    type: "space" | "user";
    data:
      | {
          icon: React.ReactNode | string;
          name: string;
          id: string;
          color: string;
        }[]
      | undefined;
  }[];

  type AndAllowed = {
    allowed: boolean;
  };
  type RoleAndAllowed = Role & AndAllowed;

  type FileData = {
    fileId: string;
    fileExt: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
  };
}
