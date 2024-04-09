import Image from 'next/image'
import { hexToRGB } from '../space/SpaceRole'
import StorePackageSpace from './StorePackageSpace'
import { Button } from '@/components/ui/button'

export default function Package({
  package: storePackage,
}: {
  package: PackageData
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full gap-2">
        <div className="relative h-24 min-h-24 w-24 min-w-24 rounded-lg border border-zinc-700 transition hover:border-zinc-200">
          <Image
            alt={`${storePackage.users.username}'s profile image`}
            src={'https://github.com/shadcn.png'} //otherUser.imageUrl}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className=""
          ></Image>
        </div>
        <div className="gap flex max-h-24 flex-grow flex-col overflow-hidden">
          <div className="flex w-full items-center justify-between gap-2">
            <h3 className="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl font-semibold">
              {storePackage.name}
            </h3>
            <p className="bg-gradient-to-br from-amber-400 to-amber-500 bg-clip-text font-bold text-transparent">{`$${storePackage.cost}`}</p>
          </div>
          <p className="flex-grow overflow-y-auto text-sm">
            {storePackage.description}
          </p>
        </div>
      </div>
      <h4 className="font-bold">Unlocks:</h4>
      <div className="flex h-auto flex-col gap-2 overflow-y-auto lg:h-36">
        <div
          className="text-md rounded-md p-2 transition duration-200"
          style={{
            backgroundColor: hexToRGB(storePackage.roles.color, 0.25),
            border: `2px solid ${storePackage.roles.color}`,
          }}
        >
          {storePackage.roles.emoji}
          <span className="ml-2 font-semibold">{storePackage.roles.name}</span>
        </div>
        {storePackage.spaces.map((space: Space) => (
          <StorePackageSpace space={space} key={space.id} />
        ))}
      </div>
      <Button variant="zinc" className="hover:bg-green-500">
        Purchase Package
      </Button>
    </div>
  )
}
