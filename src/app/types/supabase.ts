export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          accepted: boolean | null
          collective: string | null
          created_at: string
          edited_at: string | null
          id: string
          messages: Json | null
          space: string | null
          type: string | null
          user1: string | null
          user2: string | null
        }
        Insert: {
          accepted?: boolean | null
          collective?: string | null
          created_at?: string
          edited_at?: string | null
          id?: string
          messages?: Json | null
          space?: string | null
          type?: string | null
          user1?: string | null
          user2?: string | null
        }
        Update: {
          accepted?: boolean | null
          collective?: string | null
          created_at?: string
          edited_at?: string | null
          id?: string
          messages?: Json | null
          space?: string | null
          type?: string | null
          user1?: string | null
          user2?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_user1_fkey"
            columns: ["user1"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_user2_fkey"
            columns: ["user2"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      collectives: {
        Row: {
          banner_url: string | null
          description: string | null
          display_name: string | null
          founder: string | null
          id: string
          image_url: string | null
          inviteCode: string | null
          roles: Json | null
          score: number | null
          spaces: Json | null
          type: string | null
          unique: string
          users: Json | null
        }
        Insert: {
          banner_url?: string | null
          description?: string | null
          display_name?: string | null
          founder?: string | null
          id?: string
          image_url?: string | null
          inviteCode?: string | null
          roles?: Json | null
          score?: number | null
          spaces?: Json | null
          type?: string | null
          unique: string
          users?: Json | null
        }
        Update: {
          banner_url?: string | null
          description?: string | null
          display_name?: string | null
          founder?: string | null
          id?: string
          image_url?: string | null
          inviteCode?: string | null
          roles?: Json | null
          score?: number | null
          spaces?: Json | null
          type?: string | null
          unique?: string
          users?: Json | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          author: string
          chat: string
          content: string | null
          createdAt: string | null
          deleted: boolean | null
          edited: boolean | null
          editedAt: string | null
          files: Json | null
          id: string
        }
        Insert: {
          author: string
          chat: string
          content?: string | null
          createdAt?: string | null
          deleted?: boolean | null
          edited?: boolean | null
          editedAt?: string | null
          files?: Json | null
          id?: string
        }
        Update: {
          author?: string
          chat?: string
          content?: string | null
          createdAt?: string | null
          deleted?: boolean | null
          edited?: boolean | null
          editedAt?: string | null
          files?: Json | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          collectives: Json | null
          created_at: string
          description: string | null
          display_name: string | null
          email: string
          featured: string | null
          followers: string[] | null
          following: string[] | null
          id: string
          instagram: string | null
          profile_pic_url: string | null
          role: string | null
          score: number | null
          setup_complete: boolean
          storage: number | null
          twitter: string | null
          username: string | null
        }
        Insert: {
          collectives?: Json | null
          created_at?: string
          description?: string | null
          display_name?: string | null
          email: string
          featured?: string | null
          followers?: string[] | null
          following?: string[] | null
          id?: string
          instagram?: string | null
          profile_pic_url?: string | null
          role?: string | null
          score?: number | null
          setup_complete?: boolean
          storage?: number | null
          twitter?: string | null
          username?: string | null
        }
        Update: {
          collectives?: Json | null
          created_at?: string
          description?: string | null
          display_name?: string | null
          email?: string
          featured?: string | null
          followers?: string[] | null
          following?: string[] | null
          id?: string
          instagram?: string | null
          profile_pic_url?: string | null
          role?: string | null
          score?: number | null
          setup_complete?: boolean
          storage?: number | null
          twitter?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
