"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog, likeBlog } from "../services/blogs";

type BlogFormState = {
  errors: { title?: string; author?: string; url?: string };
  values?: { title: string; author: string; url: string };
  success?: boolean;
};

export async function createBlog(
  prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  const errors: BlogFormState["errors"] = {};
  if (title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }
  if (author.length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }
  if (url.length < 5) {
    errors.url = "URL must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } };
  }

  await addBlog({ title, author, url });
  revalidatePath("/blogs");
  return { errors: {}, success: true };
}

export async function likeBlogAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
