'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import Sidebar from '@/components/Sidebar'

const MobileSideBar = () => {
  const [isMounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <>
      <Sheet>
        <SheetTrigger>
          {/* <Button variant="ghost" size="icon" className="md:hidden"> */}
          <Menu className="md:hidden" />
          {/* </Button> */}
        </SheetTrigger>
        <SheetContent side="left" className="p-0 border-none">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSideBar
