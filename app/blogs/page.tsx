type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: 2,
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: 3,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

export default function BlogsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Blogs</h1>
      <ul className="flex flex-col gap-3">
        {blogs.map((blog) => (
          <li key={blog.id} className="rounded border border-zinc-200 p-4 dark:border-zinc-800">
            <a href={blog.url} className="font-medium hover:underline">
              {blog.title}
            </a>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              by {blog.author} · {blog.likes} likes
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
