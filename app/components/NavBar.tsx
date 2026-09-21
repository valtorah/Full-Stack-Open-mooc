"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center gap-4 border-b border-zinc-200 bg-zinc-100 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <Link href="/">home</Link>
      <Link href="/blogs">blogs</Link>
      <Link href="/users">users</Link>
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          <em>{session.user?.name} logged in</em>
          <button onClick={() => signOut()}>logout</button>
        </>
      ) : (
        <Link href="/login">login</Link>
      )}
    </nav>
  )
}
