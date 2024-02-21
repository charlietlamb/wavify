'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  DraggableCore,
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable'
import FloatingMenu from '@/components/nav/FloatingMenu'
import { useUser } from '@/state/user/useUser'

export function FloatingProvider() {
  const user = useUser()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ldPosition, setLdPosition] = useState({ x: 0, y: 0 })
  const [init, setInit] = useState(false)
  const [posInit, setPosInit] = useState(false)
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (parentRef.current && childRef.current && !init) {
      const parentWidth = parentRef.current?.offsetWidth
      const parentHeight = parentRef.current?.offsetHeight
      const childWidth = childRef.current?.offsetWidth
      setPosition((prev) => ({ x: parentWidth - childWidth - 16, y: 16 }))
      setLdPosition((prev) => ({ x: parentWidth - childWidth - 16, y: 16 }))
      setPosInit(true)
    }
  }, [parentRef.current, childRef.current])
  const handleDrag: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData
  ) => {
    setInit(true)
    if (!parentRef.current || !childRef.current) return
    const parentWidth = parentRef.current.offsetWidth
    const parentHeight = parentRef.current.offsetHeight
    const childWidth = childRef.current.offsetWidth
    const childHeight = childRef.current.offsetHeight
    if (
      position.x + data.deltaX < 16 ||
      position.x + data.deltaX > parentWidth - 16 - childWidth ||
      position.y + data.deltaY < 16 ||
      position.y + data.deltaY > parentHeight - 16 - childHeight
    )
      return
    setPosition({
      x: position.x + data.deltaX,
      y: position.y + data.deltaY,
    })
    setLdPosition({
      x: position.x + data.deltaX,
      y: position.y + data.deltaY,
    })
  }

  useEffect(() => {
    // Create a new ResizeObserver instance
    const resizeObserver = new ResizeObserver(() => {
      if (parentRef.current && childRef.current) {
        const parentWidth = parentRef.current.offsetWidth
        const parentHeight = parentRef.current.offsetHeight
        const childWidth = childRef.current.offsetWidth
        const childHeight = childRef.current.offsetWidth
        let newX = ldPosition.x
        let newY = ldPosition.y
        let change = false
        if (newX + childWidth > parentWidth) {
          newX = parentWidth - childWidth - 16
          change = true
        }
        if (newY + childHeight > parentHeight) {
          newY = parentHeight - childHeight - 16
          change = true
        }

        if (change) {
          setPosition((prev) => ({ x: newX, y: newY }))
        }
      }
    })

    // Start observing the parentRef
    if (parentRef.current) {
      resizeObserver.observe(parentRef.current)
    }

    // Clean up the observer when the component unmounts
    return () => {
      resizeObserver.disconnect()
    }
  }, [parentRef.current, childRef.current])

  return (
    <div
      className="pointer-events-none absolute inset-0 flex h-full w-full overflow-hidden"
      ref={parentRef}
    >
      <DraggableCore onDrag={handleDrag}>
        <FloatingMenu
          position={position}
          childRef={childRef}
          posInit={posInit}
        />
      </DraggableCore>
    </div>
  )
}
