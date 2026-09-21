import Link from "next/link";
import { getUsers } from "../services/users";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      {users.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">No users yet.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/users/${user.username}`} className="font-medium hover:underline">
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
