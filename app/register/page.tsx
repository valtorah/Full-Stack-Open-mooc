"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "../components/NotificationContext"
import { registerUser } from "./actions"

const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: {} })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("registration successful, you can now log in")
      router.push("/login")
    }
  }, [state, showNotification, router])

  return (
    <main className="mx-auto w-full max-w-md p-6">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state.values?.username}
            required
            className={inputClass}
          />
          {state.errors.username && (
            <p data-testid="username-error" className="text-sm text-red-600">
              {state.errors.username}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={state.values?.name}
            required
            className={inputClass}
          />
          {state.errors.name && (
            <p data-testid="name-error" className="text-sm text-red-600">
              {state.errors.name}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className={inputClass}
          />
          {state.errors.password && (
            <p data-testid="password-error" className="text-sm text-red-600">
              {state.errors.password}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
            className={inputClass}
          />
          {state.errors.passwordConfirm && (
            <p data-testid="passwordConfirm-error" className="text-sm text-red-600">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button type="submit" data-testid="register-button" className="w-full rounded bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700">
          Register
        </button>
      </form>
    </main>
  )
}
