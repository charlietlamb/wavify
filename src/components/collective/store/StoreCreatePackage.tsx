import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ButtonLoader from '@/components/utils/ButtonLoader'
import { PackagePlus } from 'lucide-react'
import { useState } from 'react'
import PackageRoles from './PackageRoles'
import { useStoreContext } from './context/storeContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { submitPackageDetails } from './functions/submitPackageDetails'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@/state/user/useUser'

export default function StoreCreatePackage() {
  const { space } = useStoreContext()
  const user = useUser()
  const supabase = createClientComponentClient()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [packageName, setPackageName] = useState('')
  const [packageDescription, setPackageDescription] = useState('')
  const [packageCost, setPackageCost] = useState('')
  const [roleId, setRoleId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="flex w-full items-center justify-center gap-2 p-2 font-semibold transition hover:bg-zinc-900 md:justify-start"
          onClick={() => setOpen(true)}
        >
          <PackagePlus />
          <span className="hidden md:flex">Create Package</span>
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            Create Package
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 px-6">
          <div>
            <Label>Package Name</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className=" border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter package name"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
            </div>
            <Label>Package Description</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Textarea
                disabled={loading}
                className=" border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter package name"
                value={packageDescription}
                onChange={(e) => setPackageDescription(e.target.value)}
              />
            </div>
            <Label>Package Cost</Label>
            <div className="flex flex-row justify-between gap-x-4">
              <Input
                disabled={loading}
                className="border-0 bg-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter package name"
                value={packageCost}
                onChange={(e) => {
                  if (
                    !isNaN(Number(e.target.value)) &&
                    Number(e.target.value) >= 0
                  ) {
                    setPackageCost(e.target.value)
                  }
                }}
                type="number"
                min="0"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Allowed Roles</Label>
            <PackageRoles roleId={roleId} setRoleId={setRoleId} />
          </div>
        </div>
        <DialogFooter className="flex flex-col px-6 py-4">
          <ButtonLoader
            onClick={() => {
              submitPackageDetails(
                supabase,
                space,
                user,
                packageName,
                packageDescription,
                packageCost,
                roleId,
                setLoading,
                setErrorMessage,
                setOpen
              )
            }}
            isLoading={loading}
            disabled={loading}
            text="Create"
          />
          {!!errorMessage && (
            <p className="mt-2 w-full text-center text-sm text-muted-foreground text-red-500">
              {errorMessage}
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
