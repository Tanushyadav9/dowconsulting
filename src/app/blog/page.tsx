import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { BLOG_POSTS } from "@/lib/constants/blog";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: `Insights & Strategic Perspectives | ${BRAND.name}`,
  description:
    "Executive insights on commercial Vastu, strategic business timing, retail spatial dynamics, and corporate leadership by Niraj Kumar.",
};

export default function BlogIndexPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1B2838] text-xs text-[#C9A24B] font-semibold tracking-wider uppercase">
          Executive Thought Leadership
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1B2838] tracking-tight">
          Strategic Insights &amp; Perspectives
        </h1>
        <p className="text-sm sm:text-base text-[#5A6472] max-w-2xl mx-auto leading-relaxed">
          Operational essays on commercial spatial dynamics, executive timing, and institutional enterprise leadership authored by Niraj Kumar.
        </p>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#1B2838] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#C9A24B] uppercase tracking-wider text-[11px]">
                    {post.category}
                  </span>
                  <span className="text-[#8C96A5] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#1B2838] hover:text-[#C9A24B] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-xs text-[#5A6472] leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex justify-between items-center text-xs">
                <div className="flex items-center gap-2 text-[#5A6472]">
                  <span className="font-semibold text-[#1B2838]">{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[#1B2838] hover:text-[#C9A24B] flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
