import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useFilesContext } from '../state/context'
import { handlePathClick } from '../functions/handlePathClick'
import React from 'react'

export default function FilesDashboardBreadcrumb() {
  const { path, setPath } = useFilesContext()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((path1, index) => (
          <React.Fragment key={path1.id}>
            <BreadcrumbItem className="cursor-pointer">
              <BreadcrumbLink
                onClick={() => handlePathClick(path1.id, path, setPath)}
              >
                {path1.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== path.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
