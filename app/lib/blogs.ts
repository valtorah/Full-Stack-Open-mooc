export type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

// Keep the in-memory store on globalThis so it is shared between
// route bundles and survives hot reloads in development.
const globalForBlogs = globalThis as unknown as { blogs?: Blog[] };

const blogs: Blog[] = (globalForBlogs.blogs ??= [
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
]);

export function getBlogs(filter = ""): Blog[] {
  const term = filter.trim().toLowerCase();
  return blogs
    .filter((blog) => blog.title.toLowerCase().includes(term))
    .sort((a, b) => b.likes - a.likes);
}

export function getBlog(id: number): Blog | undefined {
  return blogs.find((blog) => blog.id === id);
}

export function addBlog(data: Pick<Blog, "title" | "author" | "url">): Blog {
  const blog: Blog = {
    id: blogs.reduce((max, b) => Math.max(max, b.id), 0) + 1,
    ...data,
    likes: 0,
  };
  blogs.push(blog);
  return blog;
}

export function likeBlog(id: number): void {
  const blog = getBlog(id);
  if (blog) blog.likes += 1;
}
