"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { auth } from "@/auth"
import { getCurrentUser } from "../services/session"
import { markAsRead } from "../services/readingList"

export const generateToken = async () => {
  // the username is in the session, so the user needs no separate lookup
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/login")
  }

  const token = crypto.randomUUID()
  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, session.user.email))

  revalidatePath("/me")
}

export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))
  await markAsRead(user.id, blogId)

  revalidatePath("/me")
}
