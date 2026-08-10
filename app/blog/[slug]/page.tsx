import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/FinalCta";
import { FOUNDER, absoluteUrl } from "@/lib/constants";
import { formatPostDate, getPostBySlug, getPostSlugs } from "@/lib/posts";
import { blogPostingSchema, breadcrumbListSchema } from "@/lib/schema";
import "@/styles/blog.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { meta, body } = post;
  const schemas = [
    blogPostingSchema(meta),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: meta.title, path: `/blog/${meta.slug}` },
    ]),
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="blog-post">
        <div className="blog-post__inner">
          <p className="blog-post__eyebrow">
            {formatPostDate(meta.date)} · {meta.author}
          </p>
          <h1 className="blog-post__title">{meta.title}</h1>
          <div className="blog-post__body">{body}</div>
          <footer className="blog-post__footer">
            {meta.author === FOUNDER.name ? (
              <>
                {meta.author} —{" "}
                <Link href="/sobre">conhecer a história</Link>
              </>
            ) : (
              meta.author
            )}
          </footer>
        </div>
      </article>

      <div className="blog-post__cta">
        <FinalCta />
      </div>
    </>
  );
}
