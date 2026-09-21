import { createBlog } from "../actions";

const inputClass =
  "rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900";

export default function NewBlogPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">New blog</h1>
      <form action={createBlog} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          Title
          <input name="title" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1">
          Author
          <input name="author" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1">
          Url
          <input name="url" type="url" required className={inputClass} />
        </label>
        <button type="submit" className="self-start rounded border border-zinc-300 px-3 py-1 dark:border-zinc-700">
          Create
        </button>
      </form>
    </main>
  );
}
