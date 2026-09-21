"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "../components/NotificationContext"
import { registerUser } from "./actions"

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
    <main className="mx-auto w-full max-w-3xl p-6">
      <h2 className="mb-4 text-2xl font-semibold">Register</h2>
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state.values?.username}
            required
          />
          {state.errors.username && (
            <p data-testid="username-error" style={{ color: "red" }}>
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={state.values?.name}
            required
          />
          {state.errors.name && (
            <p data-testid="name-error" style={{ color: "red" }}>
              {state.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
          {state.errors.password && (
            <p data-testid="password-error" style={{ color: "red" }}>
              {state.errors.password}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            required
          />
          {state.errors.passwordConfirm && (
            <p data-testid="passwordConfirm-error" style={{ color: "red" }}>
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </main>
  )
}
