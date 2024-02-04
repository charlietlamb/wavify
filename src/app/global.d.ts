import { SupabaseClient } from "@supabase/supabase-js";
import { Database as DB } from "./types/supabase";
declare module "@emoji-mart/data";
declare global {
  type Database = DB;
  type Supabase = SupabaseClient;
  type User = DB["public"]["Tables"]["users"]["Row"];
  type Collective = DB["public"]["Tables"]["collectives"]["Row"];
  type Chat = DB["public"]["Tables"]["chats"]["Row"];
  type Message = DB["public"]["Tables"]["messages"]["Row"];
  type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];
  type colUser = {
    id?: string;
    username?: string;
    role?: string;
  };
  type Role = {
    id: string;
    icon: string;
    name: string;
    canLeave: boolean;
    authority: number;
    canCreate: boolean;
    canDelete: boolean;
    canInvite: boolean;
    canMembers: boolean;
    canSettings: boolean;
    canRoles: boolean;
    isDefault: boolean;
  };
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
}
