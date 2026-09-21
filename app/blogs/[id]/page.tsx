import { notFound } from "next/navigation";
import { getBlog } from "../../services/blogs";
import { likeBlogAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: PageProps<"/blogs/[id]">) {
  const { id } = await params;
  const blog = await getBlog(Number(id));
  if (!blog) notFound();

  return (
    <main data-testid="blog-detail" className="mx-auto w-full max-w-2xl p-6">
      <h1 data-testid="blog-title" className="mb-2 text-2xl font-bold">
        {blog.title}
      </h1>
      <p data-testid="blog-author" className="text-gray-600 dark:text-gray-400">
        {blog.author}
      </p>
      <p className="mb-2">
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
      </p>
      <p className="mb-4">{blog.likes} likes</p>
      <div className="flex gap-2">
        <form action={likeBlogAction}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Like
          </button>
        </form>
      </div>
    </main>
  );
}
