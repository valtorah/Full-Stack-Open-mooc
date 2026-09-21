"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { addBlog, likeBlog } from "../services/blogs";

export async function createBlog(formData: FormData) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!title || !author || !url) return;

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
