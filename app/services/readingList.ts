import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { readingList } from "@/db/schema"

export async function isInReadingList(userId: number, blogId: number) {
  const item = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)),
  })
  return item !== undefined
}

export async function addToReadingList(userId: number, blogId: number) {
  // the unique (userId, blogId) constraint prevents duplicates
  await db.insert(readingList).values({ userId, blogId }).onConflictDoNothing()
}

export async function markAsRead(userId: number, blogId: number) {
  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.userId, userId), eq(readingList.blogId, blogId)))
}
