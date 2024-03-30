import { SupabaseClient } from '@supabase/supabase-js'
import { Database as DB } from './types/supabase'
declare module '@emoji-mart/data'

import { init } from 'emoji-mart'
init({ data })
interface EmojiProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  id?: string
  shortcodes?: string
  native?: string
  size?: string
  fallback?: string
  set?: string
  skin?: string
}
import { init } from 'emoji-mart'
init({ data })
interface EmojiProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  id?: string
  shortcodes?: string
  native?: string
  size?: string
  fallback?: string
  set?: string
  skin?: string
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'em-emoji': EmojiProps
    }
  }
}
declare global {
  type TODO = any
  type Database = DB
  type Supabase = SupabaseClient
  type User = DB['public']['Tables']['users']['Row']
  type Collective = DB['public']['Tables']['collectives']['Row']
  type Chat = DB['public']['Tables']['chats']['Row']
  type Message = DB['public']['Tables']['messages']['Row']
  type Role = DB['public']['Tables']['roles']['Row']
  type Space = DB['public']['Tables']['spaces']['Row']
  type ColUser = DB['public']['Tables']['colUsers']['Row']
  type FileData = DB['public']['Tables']['files']['Row']
  type Folder = DB['public']['Tables']['folders']['Row']
  type Postbox = DB['public']['Tables']['postboxes']['Row']
  type Transient = DB['public']['Tables']['transients']['Row']
  type Schedule = DB['public']['Tables']['schedules']['Row']
  type Feedback = DB['public']['Tables']['feedbacks']['Row']
  type CommentType = DB['public']['Tables']['comments']['Row']
  type Follower = DB['public']['Tables']['followers']['Row']
  type Action = DB['public']['Tables']['actions']['Row']
  type Resource = DB['public']['Tables']['resources']['Row']
  type Product = DB['public']['Tables']['products']['Row']
  type Save = DB['public']['Tables']['saves']['Row']
  type Collection = DB['public']['Tables']['collections']['Row']
  type Item = DB['public']['Tables']['items']['Row']
  type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]
  type SpaceType =
    | 'text'
    | 'audio'
    | 'video'
    | 'library'
    | 'postbox'
    | 'transient'
    | 'feedback'
    | 'store'

  type MessageAuthor = {
    users: User
  }

  type MessageAndAuthor = Message & MessageAuthor
  type MessageData = MessageAndAuthor & { fileData: FileData[] | null }

  type MessagesToRender = {
    pages: (MessageData[] | null)[]
  }
  type FileSender = {
    users: User
  }

  type FileAndSender = FileData & FileSender

  type FolderSender = {
    users: User
    size: number
    music: boolean
  }

  type FolderAndSender = Folder & FolderSender

  type AndRole = {
    roles: Role
  }
  type AndUser = {
    users: User
  }

  type ColUserAndRole = ColUser & AndRole
  type ColUserAndData = ColUser & AndRole & AndUser

  type SearchData = {
    key: string
    label: string
    type: 'space' | 'user'
    data:
      | {
          icon: React.ReactNode | string
          name: string
          id: string
          color: string
        }[]
      | undefined
  }[]

  type AndAllowed = {
    allowed: boolean
  }
  type RoleAndAllowed = Role & AndAllowed

  type CommentAndUser = CommentType & AndUser

  type Path = {
    id: string | null
    type: string
    name: string
    files: boolean
    folders: boolean
  }

  type ResourceAndUser = Resource & AndUser

  type ItemAndUser = Item & AndUser
}
