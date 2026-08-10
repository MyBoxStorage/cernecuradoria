import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export const POST_AUTHORS = [
  "Pedro Henrique",
  "Alexandre Teixeira de Souza",
] as const;

export type PostAuthor = (typeof POST_AUTHORS)[number];

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: PostAuthor;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function isPostAuthor(value: unknown): value is PostAuthor {
  return (
    typeof value === "string" &&
    (POST_AUTHORS as readonly string[]).includes(value)
  );
}

function assertFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): PostFrontmatter {
  const { title, description, date, author } = data;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof date !== "string" ||
    !isPostAuthor(author)
  ) {
    throw new Error(
      `Frontmatter inválido em content/posts/${slug}.mdx — exigidos: title, description, date (ISO), author (${POST_AUTHORS.join(" | ")}).`,
    );
  }

  return { title, description, date, author };
}

function listMdxFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllPosts(): PostMeta[] {
  const posts = listMdxFiles().map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf8");
    const { data } = matter(raw);
    return { slug, ...assertFrontmatter(data, slug) };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const meta: PostMeta = { slug, ...assertFrontmatter(data, slug) };

  const { content: body } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  });

  return { meta, body };
}

export function formatPostDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
