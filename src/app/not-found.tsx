import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import { ENQUIRY_CONFIG } from "@/lib/constants/enquiryConfig";
import { Phone, MessageSquare, Home, Compass } from "lucide-react";

export const metadata = {
  title: `Page Not Found (404) | ${BRAND.name}`,
  description: "The requested page could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B1B33] text-xs text-white font-bold tracking-wider uppercase border border-[#1E3A63]">
          404 Error &bull; Page Not Found
        </div>

        <h1 className="text-4xl font-black text-[#17477F] tracking-tight font-heading">
          Page Not Available
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The page you requested does not exist or may have been moved. You can navigate back to our home page or explore our confirmed consulting practice areas.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#E02027] hover:bg-[#C7181F] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] text-[#17477F] text-xs font-semibold transition-colors"
          >
            <Compass className="w-4 h-4 text-[#17477F]" />
            <span>View Services</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0] space-y-2 text-xs text-slate-500">
          <p>Need assistance or have an urgent advisory enquiry?</p>
          <div className="flex justify-center items-center gap-4 text-xs font-semibold">
            <a
              href={ENQUIRY_CONFIG.phone.telLink}
              className="text-[#17477F] hover:text-[#E02027] inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#E02027]" />
              <span>Call: {ENQUIRY_CONFIG.phone.display}</span>
            </a>
            <span>&bull;</span>
            <a
              href={ENQUIRY_CONFIG.whatsapp.baseChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline inline-flex items-center gap-1 font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
