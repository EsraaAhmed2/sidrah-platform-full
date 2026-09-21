import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Rss } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import T from "@/components/T";
import { posts } from "@/lib/blog-data";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/Motion";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "المدونة" };

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: <T k="blog.breadcrumb" />, href: "/blog" }]} />
        <ScrollReveal className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Rss className="text-sidrah-400" size={28} />
            <h1 className="text-3xl font-bold text-[var(--text-primary)]"><T k="blog.title" /></h1>
          </div>
          <p className="text-[var(--text-secondary)]"><T k="blog.subtitle" /></p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="card hover:border-sidrah-700 hover:-translate-y-1 transition-all duration-300 block h-full group"
              >
                <div className={`w-full h-36 rounded-xl bg-gradient-to-br ${post.color} flex items-center justify-center text-5xl mb-4`}>
                  {post.emoji}
                </div>
                <span className="inline-block text-xs text-sidrah-400 bg-sidrah-950/40 px-2 py-1 rounded-md mb-3">
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-sidrah-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {parseInt(post.readTime)} <T k="blog.min" /></span>
                  </div>
                  <span className="text-sidrah-400 flex items-center gap-1"><T k="blog.readMore" /> <ArrowLeft size={13} /></span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
