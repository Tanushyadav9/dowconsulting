import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import { BLOG_POSTS } from "@/lib/constants/blog";
import { ArrowLeft, Clock, Calendar, User, Share2, MessageSquare } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: `Article Not Found | ${BRAND.name}` };

  return {
    title: `${post.title} | ${BRAND.name}`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6472] hover:text-[#1B2838]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all insights</span>
      </Link>

      {/* Header */}
      <div className="space-y-4 border-b border-[#E2E8F0] pb-8">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1B2838] leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A6472] pt-2">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#C9A24B]" />
            <span className="font-semibold text-[#1B2838]">{post.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#C9A24B]" />
            <span>{post.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#C9A24B]" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="prose max-w-none text-sm text-[#5A6472] leading-relaxed space-y-6">
        <p className="text-base text-[#1B2838] font-medium leading-relaxed">
          {post.excerpt}
        </p>

        <h2 className="text-xl font-bold text-[#1B2838] pt-4">
          The Operational Reality Beyond Conventional Spreadsheets
        </h2>
        <p>
          Throughout two decades overseeing retail distribution, large format retail stores, and commercial logistics units at Reliance Retail, Metro Cash &amp; Carry, and NIF Food, one lesson emerged consistently: capital efficiency is severely throttled when physical operational space is out of alignment with functional requirements.
        </p>
        <p>
          Corporate boards invest millions of rupees in digital marketing, team recruitment, and enterprise software, yet frequently sign commercial leases or arrange management teams in environments that create subconscious fatigue, frequent team conflict, and stalled deal velocity.
        </p>

        <h2 className="text-xl font-bold text-[#1B2838] pt-4">
          Spatial Zoning: Commercial Vastu in Modern Corporate Architecture
        </h2>
        <p>
          Unlike residential Vastu, which prioritizes domestic tranquility, <strong>Commercial Vastu</strong> is strictly focused on:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Revenue Convergence:</strong> Ensuring billing, accounts receivable, and cash desks are seated in high-stability, forward-momentum zones.</li>
          <li><strong>Executive Governance:</strong> Anchoring the founder, managing director, and primary decision-makers in the South-West quadrant to prevent hesitation and turnover.</li>
          <li><strong>Sales Velocity:</strong> Positioning outbound business development and client-facing teams in kinetic, high-energy sectors.</li>
        </ul>

        <div className="bg-[#FFFFFF] border-l-4 border-[#1B2838] p-6 rounded my-6 space-y-2">
          <h4 className="font-bold text-[#1B2838]">Key Advisory Principle:</h4>
          <p className="text-xs text-[#5A6472]">
            Modern corporate leases do not allow for breaking load-bearing walls or rebuilding elevator shafts. Professional commercial advisory must deliver non-demolition solutions — focusing on elemental balances, desk reorientation, light spectrums, and functional zone shifts.
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#1B2838] pt-4">
          Strategic Timing &amp; Capital Commitment
        </h2>
        <p>
          When you execute a lease or announce an acquisition is just as critical as where you place your office. In corporate advisory, we analyze both the operational milestone and executive timing windows. Aligning your major commercial contracts with these favorable windows dramatically reduces friction during execution.
        </p>
      </article>

      {/* Footer Advisory Box */}
      <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-[#F7F6F3]">Consult Directly with Niraj Kumar</h3>
          <p className="text-xs text-[#8C96A5]">Get a bespoke spatial and timing audit for your enterprise.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/intake"
            className="bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider"
          >
            Start Intake
          </Link>
          <a
            href={BRAND.contact.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111B27] border border-[#2A3D54] px-4 py-2.5 rounded text-xs font-semibold text-[#F7F6F3] flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
