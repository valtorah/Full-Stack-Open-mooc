import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

// Creates the default user and links every blog without an owner to it.
// Inserts the starter blogs first if the blogs table is empty.
async function main() {
  const { db } = await import("./index")
  const { blogs, users } = await import("./schema")
  const { eq, isNull } = await import("drizzle-orm")

  const [user] = await db
    .insert(users)
    .values({ username: "valtorah", name: "Valtorah" })
    .onConflictDoUpdate({ target: users.username, set: { name: "Valtorah" } })
    .returning()

  if ((await db.select().from(blogs)).length === 0) {
    await db.insert(blogs).values([
      { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      },
    ])
  }

  await db.update(blogs).set({ userId: user.id }).where(isNull(blogs.userId))
  console.log(`User ${user.username} (id ${user.id}) owns`, (await db.select().from(blogs).where(eq(blogs.userId, user.id))).length, "blogs")
}

main()
