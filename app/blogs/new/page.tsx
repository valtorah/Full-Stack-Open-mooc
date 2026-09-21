"use client";

import { useActionState } from "react";
import { createBlog } from "../actions";

const inputClass =
  "rounded border border-zinc-300 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900";

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, { errors: {} });

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">New blog</h1>
      <form action={formAction} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" className={inputClass} />
          {state.errors.title && (
            <p data-testid="title-error" className="text-sm text-red-600">
              {state.errors.title}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input id="author" name="author" type="text" className={inputClass} />
          {state.errors.author && (
            <p data-testid="author-error" className="text-sm text-red-600">
              {state.errors.author}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="url">URL</label>
          <input id="url" name="url" type="text" className={inputClass} />
          {state.errors.url && (
            <p data-testid="url-error" className="text-sm text-red-600">
              {state.errors.url}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="self-start rounded border border-zinc-300 px-3 py-1 dark:border-zinc-700"
        >
          Create
        </button>
      </form>
    </main>
  );
}
