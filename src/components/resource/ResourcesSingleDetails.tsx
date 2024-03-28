import { getFileSizeString } from '../files/functions/getFileSizeString'
import ResourceSingleButtons from './ResourceSingleButtons'
import ResourceSingleCollaborators from './ResourceSingleCollaborators'
import ResourceSingleComments from './ResourceSingleComments'
import ResourceSinglePlayer from './ResourceSinglePlayer'
import ResourceSingleResources from './ResourceSingleResources'
import { useResourceContext } from './context/resourceContext'

export default function ResourcesSingleDetails() {
  const { resource } = useResourceContext()
  return (
    <div className="order-first flex w-full flex-col sm:order-none sm:min-h-full sm:w-[70%] lg:w-[75%]">
      <div className="flex w-full flex-grow flex-col sm:max-h-full sm:divide-y sm:divide-zinc-700">
        <div className="flex flex-col justify-between gap-2 p-4 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-4xl font-bold text-zinc-200">
            {resource.name}
          </h1>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-start">
            <p className="flex flex-shrink-0 whitespace-nowrap text-xl text-zinc-400">
              {getFileSizeString(resource.size)}
            </p>
            <ResourceSingleButtons />
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-4 p-4 pt-0 sm:overflow-y-auto sm:pt-4">
          <ResourceSingleCollaborators />
          <p className="text-md flex flex-grow flex-col divide-y divide-zinc-700 rounded-lg border border-zinc-700 leading-tight text-zinc-400 transition hover:border-zinc-200">
            <span className="p-2 text-lg font-semibold text-zinc-200">
              Description
            </span>
            <span className="p-2">{resource.description}</span>
          </p>
          <div className="flex gap-2">
            {resource.tags &&
              resource.tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-lg border-2 border-zinc-200 bg-zinc-300 px-2 py-1 text-sm font-medium text-zinc-950"
                >
                  {tag}
                </span>
              ))}
          </div>
          <ResourceSingleComments />
          <ResourceSingleResources />
          <ResourceSingleButtons bottom />
        </div>
        {resource.previewId && (
          <div className="flex max-h-full w-full flex-shrink-0 flex-col p-4">
            <ResourceSinglePlayer />
          </div>
        )}
      </div>
    </div>
  )
}
