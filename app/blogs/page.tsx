import Link from "next/link";
import { getBlogs } from "../lib/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage({ searchParams }: PageProps<"/blogs">) {
  const { filter } = await searchParams;
  const term = typeof filter === "string" ? filter : "";
  const blogs = getBlogs(term);

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blogs</h1>
        <Link href="/blogs/new" className="font-medium hover:underline">
          New blog
        </Link>
      </div>
      <form action="/blogs" className="mb-4 flex gap-2">
        <input
          type="text"
          name="filter"
          defaultValue={term}
          placeholder="Filter by title"
          className="flex-1 rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button type="submit" className="rounded border border-zinc-300 px-3 py-1 dark:border-zinc-700">
          Search
        </button>
      </form>
      {blogs.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No blogs found.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <li key={blog.id} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
              <Link href={`/blogs/${blog.id}`} className="font-medium hover:underline">
                {blog.title}
              </Link>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                by {blog.author} · {blog.likes} likes
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
