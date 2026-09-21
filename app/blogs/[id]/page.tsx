import { notFound } from "next/navigation";
import { getBlog } from "../../services/blogs";
import { likeBlogAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: PageProps<"/blogs/[id]">) {
  const { id } = await params;
  const blog = await getBlog(Number(id));
  if (!blog) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-2 text-2xl font-semibold">{blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>
        Url:{" "}
        <a href={blog.url} className="underline">
          {blog.url}
        </a>
      </p>
      <p className="mb-4">Likes: {blog.likes}</p>
      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="rounded border border-zinc-300 px-3 py-1 dark:border-zinc-700">
          Like
        </button>
      </form>
    </main>
  );
}
