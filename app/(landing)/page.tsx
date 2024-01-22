import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      Landing page (Unprotected)
      <div>
        <Link href="/sign-in">
          <Button>登录</Button>
        </Link>
        <Link href="/sign-up">
          <Button>注册</Button>
        </Link>
      </div>
    </div>
  )
}

export default page
