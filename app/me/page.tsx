import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import Link from "next/link"
import { getReadingList } from "../services/readingList"
import { generateToken, markAsReadAction } from "./actions"

export const dynamic = "force-dynamic"

export default async function MePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const readingList = await getReadingList(user.id)
  const unread = readingList.filter((item) => !item.read)
  const read = readingList.filter((item) => item.read)

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

      <section data-testid="reading-list-section" className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Reading list</h2>
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list" className="text-gray-500">
            Your reading list is empty
          </p>
        ) : (
          <>
            <div data-testid="unread-section" className="mb-4">
              <h3 className="mb-2 font-semibold">Unread</h3>
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs" className="text-gray-500">
                  No unread blogs
                </p>
              ) : (
                <ul className="space-y-2">
                  {unread.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.blog.title}
                      </Link>
                      <form action={markAsReadAction}>
                        <input type="hidden" name="blogId" value={item.blog.id} />
                        <button
                          type="submit"
                          data-testid={`mark-read-${item.blog.id}`}
                          className="rounded bg-gray-700 px-2 py-1 text-sm text-white hover:bg-gray-600"
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div data-testid="read-section">
              <h3 className="mb-2 font-semibold">Read</h3>
              {read.length === 0 ? (
                <p data-testid="no-read-blogs" className="text-gray-500">
                  No read blogs
                </p>
              ) : (
                <ul className="space-y-2">
                  {read.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/blogs/${item.blog.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {item.blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
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
