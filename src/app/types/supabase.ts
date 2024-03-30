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
      actions: {
        Row: {
          action: string
          chat: string | null
          child: string
          collection: string | null
          collective: string | null
          createdAt: string
          file: string | null
          folder: string | null
          id: string
          parents: string[]
          product: string | null
          resource: string | null
          space: string | null
          users: string[]
        }
        Insert: {
          action?: string
          chat?: string | null
          child: string
          collection?: string | null
          collective?: string | null
          createdAt?: string
          file?: string | null
          folder?: string | null
          id?: string
          parents?: string[]
          product?: string | null
          resource?: string | null
          space?: string | null
          users?: string[]
        }
        Update: {
          action?: string
          chat?: string | null
          child?: string
          collection?: string | null
          collective?: string | null
          createdAt?: string
          file?: string | null
          folder?: string | null
          id?: string
          parents?: string[]
          product?: string | null
          resource?: string | null
          space?: string | null
          users?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "public_actions_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_chat_fkey"
            columns: ["chat"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_file_fkey"
            columns: ["file"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_resource_fkey"
            columns: ["resource"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_downloads_user_fkey"
            columns: ["child"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          accepted: boolean | null
          collective: string | null
          createdAt: string
          editedAt: string | null
          id: string
          space: string | null
          type: string | null
          user1: string | null
          user2: string | null
        }
        Insert: {
          accepted?: boolean | null
          collective?: string | null
          createdAt?: string
          editedAt?: string | null
          id?: string
          space?: string | null
          type?: string | null
          user1?: string | null
          user2?: string | null
        }
        Update: {
          accepted?: boolean | null
          collective?: string | null
          createdAt?: string
          editedAt?: string | null
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
          },
        ]
      }
      collections: {
        Row: {
          allowDownload: boolean
          allowSave: boolean
          collaborators: string[]
          createdAt: string
          description: string
          draft: boolean
          friendsOnly: boolean
          id: string
          imageUrl: string
          mustFollow: boolean
          name: string
          tags: string[]
          user: string
        }
        Insert: {
          allowDownload?: boolean
          allowSave?: boolean
          collaborators?: string[]
          createdAt?: string
          description?: string
          draft?: boolean
          friendsOnly?: boolean
          id?: string
          imageUrl?: string
          mustFollow?: boolean
          name?: string
          tags?: string[]
          user: string
        }
        Update: {
          allowDownload?: boolean
          allowSave?: boolean
          collaborators?: string[]
          createdAt?: string
          description?: string
          draft?: boolean
          friendsOnly?: boolean
          id?: string
          imageUrl?: string
          mustFollow?: boolean
          name?: string
          tags?: string[]
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_collections_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      collectives: {
        Row: {
          bannerUrl: string | null
          founder: string
          id: string
          imageUrl: string | null
          inviteCode: string | null
          roles: string[]
          score: number | null
          type: string | null
          unique: string
        }
        Insert: {
          bannerUrl?: string | null
          founder: string
          id?: string
          imageUrl?: string | null
          inviteCode?: string | null
          roles?: string[]
          score?: number | null
          type?: string | null
          unique: string
        }
        Update: {
          bannerUrl?: string | null
          founder?: string
          id?: string
          imageUrl?: string | null
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
          },
        ]
      }
      comments: {
        Row: {
          createdAt: string
          file: string | null
          folder: string | null
          id: string
          lastEditedAt: string
          message: string
          resource: string | null
          space: string | null
          user: string
        }
        Insert: {
          createdAt?: string
          file?: string | null
          folder?: string | null
          id?: string
          lastEditedAt?: string
          message?: string
          resource?: string | null
          space?: string | null
          user: string
        }
        Update: {
          createdAt?: string
          file?: string | null
          folder?: string | null
          id?: string
          lastEditedAt?: string
          message?: string
          resource?: string | null
          space?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_comments_file_fkey"
            columns: ["file"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_resource_fkey"
            columns: ["resource"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbacks: {
        Row: {
          created_at: string
          file: string | null
          folder: string | null
          id: string
          space: string
          user: string
        }
        Insert: {
          created_at?: string
          file?: string | null
          folder?: string | null
          id?: string
          space: string
          user: string
        }
        Update: {
          created_at?: string
          file?: string | null
          folder?: string | null
          id?: string
          space?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_feedbacks_file_fkey"
            columns: ["file"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_feedbacks_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_feedbacks_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_feedbacks_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          preview: number
          size: number
          space: string | null
          system: boolean
          url: string
          user: string | null
        }
        Insert: {
          chat?: string | null
          createdAt?: string
          deleted?: boolean
          folder?: string | null
          id?: string
          message?: string | null
          name?: string
          preview?: number
          size?: number
          space?: string | null
          system?: boolean
          url?: string
          user?: string | null
        }
        Update: {
          chat?: string | null
          createdAt?: string
          deleted?: boolean
          folder?: string | null
          id?: string
          message?: string | null
          name?: string
          preview?: number
          size?: number
          space?: string | null
          system?: boolean
          url?: string
          user?: string | null
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
          },
        ]
      }
      folders: {
        Row: {
          createdAt: string
          id: string
          name: string
          parent: string | null
          user: string | null
        }
        Insert: {
          createdAt?: string
          id?: string
          name: string
          parent?: string | null
          user?: string | null
        }
        Update: {
          createdAt?: string
          id?: string
          name?: string
          parent?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_folders_parent_fkey"
            columns: ["parent"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_folders_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      followers: {
        Row: {
          created_at: string
          follower: string
          id: string
          user: string
        }
        Insert: {
          created_at?: string
          follower: string
          id?: string
          user: string
        }
        Update: {
          created_at?: string
          follower?: string
          id?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_followers_follower_fkey"
            columns: ["follower"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_followers_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          collection: string
          createdAt: string
          href: string
          id: string
          imageUrl: string
          link: string
          name: string
          saved: string | null
          text: string
          type: string
          user: string
        }
        Insert: {
          collection: string
          createdAt?: string
          href?: string
          id?: string
          imageUrl?: string
          link?: string
          name?: string
          saved?: string | null
          text?: string
          type?: string
          user: string
        }
        Update: {
          collection?: string
          createdAt?: string
          href?: string
          id?: string
          imageUrl?: string
          link?: string
          name?: string
          saved?: string | null
          text?: string
          type?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_items_collection_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_items_saved_fkey"
            columns: ["saved"]
            isOneToOne: false
            referencedRelation: "saves"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_items_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          author: string
          chat: string
          collection: string | null
          collective: string | null
          content: string | null
          createdAt: string | null
          deleted: boolean | null
          edited: boolean | null
          editedAt: string | null
          files: boolean | null
          id: string
          member: string | null
          product: string | null
          resource: string | null
        }
        Insert: {
          author: string
          chat: string
          collection?: string | null
          collective?: string | null
          content?: string | null
          createdAt?: string | null
          deleted?: boolean | null
          edited?: boolean | null
          editedAt?: string | null
          files?: boolean | null
          id?: string
          member?: string | null
          product?: string | null
          resource?: string | null
        }
        Update: {
          author?: string
          chat?: string
          collection?: string | null
          collective?: string | null
          content?: string | null
          createdAt?: string | null
          deleted?: boolean | null
          edited?: boolean | null
          editedAt?: string | null
          files?: boolean | null
          id?: string
          member?: string | null
          product?: string | null
          resource?: string | null
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
          },
          {
            foreignKeyName: "public_messages_collections_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_member_fkey"
            columns: ["member"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_resource_fkey"
            columns: ["resource"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      postboxes: {
        Row: {
          created_at: string
          file: string | null
          folder: string | null
          id: string
          space: string
          user: string
        }
        Insert: {
          created_at?: string
          file?: string | null
          folder?: string | null
          id?: string
          space: string
          user: string
        }
        Update: {
          created_at?: string
          file?: string | null
          folder?: string | null
          id?: string
          space?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_postboxes_file_fkey"
            columns: ["file"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_postboxes_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_postboxes_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_postboxes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          allowDownload: boolean
          allowSave: boolean
          collaborators: string[]
          created_at: string
          description: string
          fileUrls: string[]
          friendsOnly: boolean
          id: string
          imageUrl: string
          mustFollow: boolean
          name: string
          price: number
          user: string
        }
        Insert: {
          allowDownload?: boolean
          allowSave?: boolean
          collaborators?: string[]
          created_at?: string
          description?: string
          fileUrls?: string[]
          friendsOnly?: boolean
          id?: string
          imageUrl?: string
          mustFollow?: boolean
          name?: string
          price?: number
          user: string
        }
        Update: {
          allowDownload?: boolean
          allowSave?: boolean
          collaborators?: string[]
          created_at?: string
          description?: string
          fileUrls?: string[]
          friendsOnly?: boolean
          id?: string
          imageUrl?: string
          mustFollow?: boolean
          name?: string
          price?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_products_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          allowDownload: boolean
          allowSave: boolean
          collaborators: string[]
          createdAt: string
          description: string
          downloads: number
          draft: boolean
          featured: boolean
          fileIds: string[]
          fileUrls: string[]
          folder: string
          friendsOnly: boolean
          id: string
          imageUrl: string
          mustFollow: boolean
          name: string
          previewId: string | null
          previewUrl: string
          size: number
          tags: string[]
          type: string
          user: string
        }
        Insert: {
          allowDownload?: boolean
          allowSave?: boolean
          collaborators?: string[]
          createdAt?: string
          description?: string
          downloads?: number
          draft?: boolean
          featured?: boolean
          fileIds?: string[]
          fileUrls?: string[]
          folder: string
          friendsOnly?: boolean
          id?: string
          imageUrl?: string
          mustFollow?: boolean
          name?: string
          previewId?: string | null
          previewUrl?: string
          size?: number
          tags?: string[]
          type?: string
          user: string
        }
        Update: {
          allowDownload?: boolean
          allowSave?: boolean
          collaborators?: string[]
          createdAt?: string
          description?: string
          downloads?: number
          draft?: boolean
          featured?: boolean
          fileIds?: string[]
          fileUrls?: string[]
          folder?: string
          friendsOnly?: boolean
          id?: string
          imageUrl?: string
          mustFollow?: boolean
          name?: string
          previewId?: string | null
          previewUrl?: string
          size?: number
          tags?: string[]
          type?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_resources_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_resources_previewId_fkey"
            columns: ["previewId"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_resources_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
          },
        ]
      }
      saves: {
        Row: {
          collection: string | null
          collective: string | null
          createdAt: string
          id: string
          member: string | null
          name: string
          product: string | null
          resource: string | null
          space: string | null
          user: string | null
        }
        Insert: {
          collection?: string | null
          collective?: string | null
          createdAt?: string
          id?: string
          member?: string | null
          name?: string
          product?: string | null
          resource?: string | null
          space?: string | null
          user?: string | null
        }
        Update: {
          collection?: string | null
          collective?: string | null
          createdAt?: string
          id?: string
          member?: string | null
          name?: string
          product?: string | null
          resource?: string | null
          space?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_saves_collections_fkey"
            columns: ["collection"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_saves_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_saves_member_fkey"
            columns: ["member"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_saves_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_saves_resource_fkey"
            columns: ["resource"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_saves_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_saves_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      schedules: {
        Row: {
          end: string
          id: string
          name: string
          space: string
          start: string
        }
        Insert: {
          end: string
          id?: string
          name?: string
          space: string
          start: string
        }
        Update: {
          end?: string
          id?: string
          name?: string
          space?: string
          start?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_schedules_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      spaces: {
        Row: {
          allowed: string[]
          collective: string
          fGet: string[]
          fGive: string[]
          folder: string | null
          id: string
          name: string
          open: boolean
          order: number
          pbReceive: string[]
          pbSend: string[]
          slug: string
          tAccess: string[]
          tPost: string[]
          type: string
        }
        Insert: {
          allowed: string[]
          collective: string
          fGet?: string[]
          fGive?: string[]
          folder?: string | null
          id: string
          name: string
          open?: boolean
          order?: number
          pbReceive?: string[]
          pbSend?: string[]
          slug: string
          tAccess?: string[]
          tPost?: string[]
          type?: string
        }
        Update: {
          allowed?: string[]
          collective?: string
          fGet?: string[]
          fGive?: string[]
          folder?: string | null
          id?: string
          name?: string
          open?: boolean
          order?: number
          pbReceive?: string[]
          pbSend?: string[]
          slug?: string
          tAccess?: string[]
          tPost?: string[]
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_spaces_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spaces_collective_fkey"
            columns: ["collective"]
            isOneToOne: false
            referencedRelation: "collectives"
            referencedColumns: ["id"]
          },
        ]
      }
      transients: {
        Row: {
          createdAt: string
          folder: string
          id: string
          schedule: string
          space: string
          user: string
        }
        Insert: {
          createdAt?: string
          folder: string
          id?: string
          schedule: string
          space: string
          user: string
        }
        Update: {
          createdAt?: string
          folder?: string
          id?: string
          schedule?: string
          space?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_transients_folder_fkey"
            columns: ["folder"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transients_schedule_fkey"
            columns: ["schedule"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transients_space_fkey"
            columns: ["space"]
            isOneToOne: false
            referencedRelation: "spaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_transients_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          color: string
          createdAt: string
          description: string | null
          display_name: string | null
          email: string
          featured: string | null
          followers: string[]
          following: string[]
          id: string
          imageUrl: string
          instagram: string
          role: string | null
          score: number | null
          setup_complete: boolean
          storage: number | null
          twitter: string
          username: string
        }
        Insert: {
          color?: string
          createdAt?: string
          description?: string | null
          display_name?: string | null
          email: string
          featured?: string | null
          followers: string[]
          following: string[]
          id: string
          imageUrl?: string
          instagram?: string
          role?: string | null
          score?: number | null
          setup_complete?: boolean
          storage?: number | null
          twitter?: string
          username?: string
        }
        Update: {
          color?: string
          createdAt?: string
          description?: string | null
          display_name?: string | null
          email?: string
          featured?: string | null
          followers?: string[]
          following?: string[]
          id?: string
          imageUrl?: string
          instagram?: string
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
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
