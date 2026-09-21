"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../../components/NotificationContext";
import { createBlog } from "../actions";

const inputClass =
  "w-full rounded border border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900";

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, { errors: {} });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">New blog</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
            className={inputClass}
          />
          {state.errors.title && (
            <p data-testid="title-error" className="text-sm text-red-600">
              {state.errors.title}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            defaultValue={state.values?.author}
            className={inputClass}
          />
          {state.errors.author && (
            <p data-testid="author-error" className="text-sm text-red-600">
              {state.errors.author}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            defaultValue={state.values?.url}
            className={inputClass}
          />
          {state.errors.url && (
            <p data-testid="url-error" className="text-sm text-red-600">
              {state.errors.url}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </main>
  );
}
