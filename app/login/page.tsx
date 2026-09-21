"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("logged in")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      {error && (
        <p
          data-testid="error-message"
          className="mb-4 rounded bg-red-100 px-3 py-2 text-red-700"
        >
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required className={inputClass} />
        </div>
        <button type="submit" data-testid="login-button" className="w-full rounded bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700">
          Login
        </button>
      </form>
    </main>
  )
}
