import Link from "next/link";
import { getBlogs } from "../services/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage({ searchParams }: PageProps<"/blogs">) {
  const { filter } = await searchParams;
  const term = typeof filter === "string" ? filter : "";
  const blogs = await getBlogs(term);

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Blogs</h1>
      <form action="/blogs" className="mb-4 flex gap-2">
        <input
          type="text"
          name="filter"
          defaultValue={term}
          placeholder="Filter by title"
          data-testid="filter-input"
          className="flex-1 rounded border border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <ul data-testid="blogs-list" className="space-y-2">
          {blogs.map((blog) => (
            <li
              key={blog.id}
              className="rounded border p-3 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
              <div className="text-sm text-gray-500">
                by {blog.author} · {blog.likes} likes
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
