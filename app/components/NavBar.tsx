"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="flex items-center gap-4 bg-gray-800 px-6 py-3 text-white">
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href="/blogs/new">create new</NavLink>
            <NavLink href="/me">me</NavLink>
            <em className="text-gray-300">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut()}
              className="rounded bg-gray-600 px-3 py-1 text-sm hover:bg-gray-500"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
