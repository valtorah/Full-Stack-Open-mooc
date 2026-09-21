import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

export const dynamic = "force-dynamic";

export default async function UserPage({ params }: PageProps<"/users/[username]">) {
  const { username } = await params;
  const user = await getUserWithBlogs(decodeURIComponent(username));
  if (!user) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">{user.name}</h1>
      <h2 className="mb-2 text-lg font-medium">Added blogs</h2>
      {user.blogs.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No blogs added.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
