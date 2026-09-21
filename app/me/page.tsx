import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "./actions"

export const dynamic = "force-dynamic"

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">My page</h1>

      <section data-testid="user-profile" className="mb-6">
        <p>
          Name: <span data-testid="user-name">{user.name}</span>
        </p>
        <p>
          Username: <span data-testid="user-username">{user.username}</span>
        </p>
      </section>

      <section data-testid="api-token-section" className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">API token</h2>
        {user.token ? (
          <p data-testid="token-display" className="mb-2">
            Your token:{" "}
            <code
              data-testid="api-token"
              className="rounded bg-gray-100 px-1 dark:bg-zinc-800"
            >
              {user.token}
            </code>
          </p>
        ) : (
          <p data-testid="no-token-message" className="mb-2 text-gray-500">
            No token generated yet
          </p>
        )}
        <form action={generateToken}>
          <button
            type="submit"
            data-testid="generate-token-button"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Generate new token
          </button>
        </form>
      </section>
    </main>
  )
}
