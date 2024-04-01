'use client'

import { Table } from 'lucide-react'
import Toolbar from '../../toolbar/Toolbar'
import { useState } from 'react'
import { UsersContext } from './context/usersContext'
import UsersContent from './UsersContent'
import Search from '../../toolbar/Search'

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [query, setQuery] = useState<string>('')
  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        query,
        setQuery,
      }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <Toolbar
          title="Users"
          text="Browse member users."
          icon={
            <Table className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
          }
          components={[
            <Search
              query={query}
              setQuery={setQuery}
              placeholder="Search users..."
            />,
          ]}
        />
        <UsersContent />
      </div>
    </UsersContext.Provider>
  )
}
