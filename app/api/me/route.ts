import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const GET = async (req: Request) => {
  const authorization = req.headers.get("authorization")

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 })
  }

  const token = authorization.slice("Bearer ".length).trim()
  if (!token) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  })

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}
