import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import T from "@/components/T";
import ReadingProgress from "@/components/ReadingProgress";
import { getPostBySlug, posts } from "@/lib/blog-data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: <T k="blog.breadcrumb" />, href: "/blog" }, { label: post.title }]} />

        <div className={`w-full h-56 rounded-2xl bg-gradient-to-br ${post.color} flex items-center justify-center text-7xl mb-8`}>
          {post.emoji}
        </div>

        <span className="inline-block text-xs text-sidrah-400 bg-sidrah-950/40 px-3 py-1 rounded-md mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-5 text-sm text-[var(--text-muted)] mb-10 pb-6 border-b border-[var(--border-color)]">
          <span className="flex items-center gap-2"><User size={15} /> {post.author}</span>
          <span className="flex items-center gap-2"><Calendar size={15} /> {post.date}</span>
          <span className="flex items-center gap-2"><Clock size={15} /> {parseInt(post.readTime)} <T k="blog.min" /> <T k="blog.read" /></span>
        </div>

        <article className="space-y-6">
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-bold text-[var(--text-primary)] pt-4">
                  {block.slice(3)}
                </h2>
              );
            }
            return (
              <div key={i} className="text-[var(--text-secondary)] leading-loose whitespace-pre-line">
                {block.split("```").map((part, j) =>
                  j % 2 === 1 ? (
                    <pre key={j} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-4 my-4 text-sm text-sidrah-300 overflow-x-auto" dir="ltr">
                      <code>{part.trim()}</code>
                    </pre>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </div>
            );
          })}
        </article>

        <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-wrap gap-4 justify-between items-center">
          <Link href="/blog" className="text-sidrah-400 hover:text-sidrah-300 text-sm">
            <T k="blog.moreArticles" />
          </Link>
          <Link href="/courses" className="btn-primary text-sm">
            <T k="blog.startLearning" />
          </Link>
        </div>
      </div>
    </div>
  );
}
