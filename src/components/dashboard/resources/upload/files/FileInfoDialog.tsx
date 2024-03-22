import { getFileSizeString } from '@/components/files/functions/getFileSizeString'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

export default function FileInfoDialog({
  file,
  name,
  textTrigger,
}: {
  file: File
  name: string
  textTrigger: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(!open)}>
        <p className="w-4 text-lg font-bold text-zinc-700">{textTrigger}</p>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-y-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <Table>
          <TableCaption>File Details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead className="text-right">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{file.type}</TableCell>
              <TableCell>{file.lastModified}</TableCell>
              <TableCell className="text-right">
                {getFileSizeString(file.size / 1024 / 1024)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogClose hidden />
    </Dialog>
  )
}
