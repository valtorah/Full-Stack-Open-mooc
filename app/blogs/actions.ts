"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog, likeBlog } from "../services/blogs";

export async function createBlog(
  prevState: { errors: { title?: string; author?: string; url?: string } },
  formData: FormData,
) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  const errors: { title?: string; author?: string; url?: string } = {};
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
    return { errors };
  }

  await addBlog({ title, author, url });
  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const id = Number(formData.get("id"));
  await likeBlog(id);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}
