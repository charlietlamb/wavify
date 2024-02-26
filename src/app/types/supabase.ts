export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          accepted: boolean | null
          collective: string | null
          created_at: string
          edited_at: string | null
          id: string
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
            foreignKeyName: "chats_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
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
          founder: string | null
          id: string
          image_url: string | null
          inviteCode: string | null
          roles: string[]
          score: number | null
          type: string | null
          unique: string
        }
        Insert: {
          banner_url?: string | null
          founder?: string | null
          id?: string
          image_url?: string | null
          inviteCode?: string | null
          roles?: string[]
          score?: number | null
          type?: string | null
          unique: string
        }
        Update: {
          banner_url?: string | null
          founder?: string | null
          id?: string
          image_url?: string | null
          inviteCode?: string | null
          roles?: string[]
          score?: number | null
          type?: string | null
          unique?: string
        }
        Relationships: []
      }
      colUsers: {
        Row: {
          collective: string | null
          id: string
          role: string | null
          user: string
        }
        Insert: {
          collective?: string | null
          id: string
          role?: string | null
          user: string
        }
        Update: {
          collective?: string | null
          id?: string
          role?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "colUsers_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colUsers_roleId_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colUsers_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      files: {
        Row: {
          chat: string | null
          createdAt: string
          deleted: boolean
          folder: string | null
          id: string
          message: string | null
          name: string
          size: number
          space: string | null
          system: boolean
          url: string
          user: string
        }
        Insert: {
          chat?: string | null
          createdAt?: string
          deleted?: boolean
          folder?: string | null
          id?: string
          message?: string | null
          name?: string
          size?: number
          space?: string | null
          system?: boolean
          url?: string
          user: string
        }
        Update: {
          chat?: string | null
          createdAt?: string
          deleted?: boolean
          folder?: string | null
          id?: string
          message?: string | null
          name?: string
          size?: number
          space?: string | null
          system?: boolean
          url?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_files_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_files_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_files_message_fkey"
            columns: ["message"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_files_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_files_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      folders: {
        Row: {
          createdAt: string
          id: string
          name: string
          parent: string | null
          user: string
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
          parent?: string | null
          user: string
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          parent?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_folders_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          files: boolean | null
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
          files?: boolean | null
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
          files?: boolean | null
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
      roles: {
        Row: {
          authority: number
          canCreate: boolean
          canDelete: boolean
          canInvite: boolean
          canMembers: boolean
          canMessages: boolean
          canRoles: boolean
          canSettings: boolean
          collective: string | null
          color: string
          emoji: string
          id: string
          name: string
        }
        Insert: {
          authority: number
          canCreate?: boolean
          canDelete?: boolean
          canInvite?: boolean
          canMembers?: boolean
          canMessages?: boolean
          canRoles?: boolean
          canSettings?: boolean
          collective?: string | null
          color: string
          emoji: string
          id?: string
          name: string
        }
        Update: {
          authority?: number
          canCreate?: boolean
          canDelete?: boolean
          canInvite?: boolean
          canMembers?: boolean
          canMessages?: boolean
          canRoles?: boolean
          canSettings?: boolean
          collective?: string | null
          color?: string
          emoji?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          }
        ]
      }
      spaces: {
        Row: {
          allowed: string[]
          collective: string
          id: string
          name: string
          open: boolean
          order: number
          slug: string
          type: string
        }
        Insert: {
          allowed: string[]
          collective: string
          id: string
          name: string
          open?: boolean
          order?: number
          slug: string
          type?: string
        }
        Update: {
          allowed?: string[]
          collective?: string
          id?: string
          name?: string
          open?: boolean
          order?: number
          slug?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "spaces_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          color: string
          created_at: string
          description: string | null
          display_name: string | null
          email: string
          featured: string | null
          followers: string[] | null
          following: string[] | null
          id: string
          instagram: string
          profile_pic_url: string
          role: string | null
          score: number | null
          setup_complete: boolean
          storage: number | null
          twitter: string
          username: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          display_name?: string | null
          email: string
          featured?: string | null
          followers?: string[] | null
          following?: string[] | null
          id: string
          instagram?: string
          profile_pic_url?: string
          role?: string | null
          score?: number | null
          setup_complete?: boolean
          storage?: number | null
          twitter?: string
          username?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          display_name?: string | null
          email?: string
          featured?: string | null
          followers?: string[] | null
          following?: string[] | null
          id?: string
          instagram?: string
          profile_pic_url?: string
          role?: string | null
          score?: number | null
          setup_complete?: boolean
          storage?: number | null
          twitter?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
