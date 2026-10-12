import Link from "next/link";
import { notFound } from "next/navigation";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { BLOG_POSTS } from "@/lib/constants/blog";
import { ArrowLeft, Clock, Calendar, User, MessageSquare, Phone } from "lucide-react";

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
          Operational Realities in Emerging and Growing Enterprises
        </h2>
        <p>
          Throughout executive leadership roles as &ldquo;over two decades in senior roles including Vice President and Business Head at organizations such as Reliance Retail, Metro Cash &amp; Carry, and NIF Food&rdquo;, one operational truth becomes evident: commercial viability depends upon rigorous alignment between market need, distribution channel capacity, and business model fundamentals.
        </p>
        <p>
          Early-stage startups and expanding MSMEs often risk misallocating capital when they move into execution without structured validation of their go-to-market assumptions, channel unit economics, or local market competitive dynamics.
        </p>

        <h2 className="text-xl font-bold text-[#1B2838] pt-4">
          Core Pillars of Strategic Advisory
        </h2>
        <p>
          In corporate and small business advisory, structured analysis focuses on:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Target Audience Alignment:</strong> Accurately identifying customer personas, purchasing motivations, and willingness to pay.</li>
          <li><strong>Competitive Differentiation:</strong> Benchmarking direct and indirect alternatives to build clear, defensible value positioning.</li>
          <li><strong>Channel Architecture:</strong> Prioritizing route-to-market strategies—whether retail storefronts, distributor networks, or direct-to-business pipelines.</li>
          <li><strong>Operational Capacity:</strong> Ensuring team bandwidth, vendor reliability, and workflow processes can sustain scale.</li>
        </ul>

        <div className="bg-[#FFFFFF] border-l-4 border-[#1B2838] p-6 rounded my-6 space-y-2">
          <h4 className="font-bold text-[#1B2838]">Key Advisory Principle:</h4>
          <p className="text-xs text-[#5A6472]">
            Strategic business consulting for start-ups, small companies and MSMEs must be pragmatic, realistic, and actionable. Theoretical frameworks without operating context provide little value to business owners navigating immediate commercial challenges.
          </p>
        </div>

        <h2 className="text-xl font-bold text-[#1B2838] pt-4">
          Direct Guidance from Niraj Kumar, Consultant
        </h2>
        <p>
          DOW Consulting provides direct consulting led by Niraj Kumar, Consultant (GTM Strategy, Distribution &amp; Brand Building). Clients can enquire directly via phone call or WhatsApp to discuss their business growth roadmaps.
        </p>
      </article>

      {/* Footer Advisory Box */}
      <div className="bg-[#1B2838] text-[#F7F6F3] p-8 rounded-lg border border-[#2A3D54] flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-[#F7F6F3]">Consult with DOW Consulting</h3>
          <p className="text-xs text-[#8C96A5]">Discuss your GTM, market research, or expansion requirements.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={ENQUIRY_CONFIG.phone.telLink}
            className="bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
          </a>
          <a
            href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BD5A] text-[#FFFFFF] px-4 py-2.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
