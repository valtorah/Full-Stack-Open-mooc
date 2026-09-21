import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-4 border-b border-zinc-200 bg-zinc-100 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <Link href="/" className="font-medium hover:underline">
        Home
      </Link>
      <Link href="/blogs" className="font-medium hover:underline">
        Blogs
      </Link>
      <Link href="/users" className="font-medium hover:underline">
        Users
      </Link>
    </nav>
  );
}
