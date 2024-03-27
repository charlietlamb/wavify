import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useUploadContext } from './context/context'

export default function ResourcesUploadTags() {
  const { tags, setTags, setTagCurrent, tagCurrent, setError } =
    useUploadContext()
  function addTag() {
    if (
      tags.map((tag) => tag.toLowerCase()).includes(tagCurrent.toLowerCase())
    ) {
      return setError('Tag already exists')
    }
    setTags([...tags, tagCurrent])
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
          placeholder={'Add a tag'}
          type="text"
          value={tagCurrent}
          onChange={(e) => setTagCurrent(e.target.value)}
        />
        <Button onClick={() => addTag()} variant="zinc">
          <Plus />
        </Button>
      </div>
      {!!tags.length && (
        <div className="rounded-lg border border-zinc-700 p-2 transition hover:border-zinc-200">
          <div className="flex gap-2 overflow-hidden overflow-x-auto ">
            {tags.map((tag) => (
              <div
                key={tag}
                className="group flex cursor-pointer items-center gap-1 rounded-lg bg-zinc-200 px-2 py-1 text-sm font-medium text-zinc-950 transition hover:bg-zinc-400"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                {tag}
                <X className="h-4 w-4 duration-500 group-hover:text-red-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
