import { desc, eq, ilike, sql } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"

export async function getBlogs(filter = "") {
  const term = filter.trim()
  return db
    .select()
    .from(blogs)
    .where(term ? ilike(blogs.title, `%${term}%`) : undefined)
    .orderBy(desc(blogs.likes), blogs.id)
}

export async function getBlog(id: number) {
  if (!Number.isInteger(id)) return undefined
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id))
  return blog
}

export async function addBlog(data: { title: string; author: string; url: string }) {
  const [blog] = await db.insert(blogs).values(data).returning()
  return blog
}

export async function likeBlog(id: number) {
  if (!Number.isInteger(id)) return
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id))
}
