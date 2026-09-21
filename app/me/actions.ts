"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "../services/session"

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const token = crypto.randomUUID()
  await db.update(users).set({ token }).where(eq(users.id, user.id))

  revalidatePath("/me")
}
