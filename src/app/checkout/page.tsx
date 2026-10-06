"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BRAND } from "@/lib/constants/brand";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  FileCheck,
} from "lucide-react";

interface CheckoutDetails {
  type: "QUOTE" | "PACKAGE";
  quoteId?: string;
  packageId?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  scopeSummary?: string;
  amount?: number;
  currency?: string;
  priceINR?: number;
  priceUSD?: number;
  inclusions?: string[];
  isActive?: boolean;
  isCheckoutAllowed: boolean;
  clientName?: string;
  clientEmail?: string;
  businessName?: string;
  error?: string;
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package");
  const quoteIdParam = searchParams.get("quoteId");
  const submissionIdParam = searchParams.get("submissionId") || "";

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<"INR" | "USD">("INR");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      setError(null);
      try {
        let url = "";
        if (quoteIdParam) {
          url = `/api/checkout/details?quoteId=${encodeURIComponent(quoteIdParam)}`;
        } else if (packageParam) {
          url = `/api/checkout/details?package=${encodeURIComponent(packageParam)}`;
        } else {
          setError("No advisory package or quote proposal was selected. Please choose a package or request a proposal.");
          setLoading(false);
          return;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load checkout details");
        }

        setDetails(data);

        // Pre-fill if custom quote
        if (data.type === "QUOTE") {
          setCustomer((prev) => ({
            ...prev,
            name: data.clientName || prev.name,
            email: data.clientEmail || prev.email,
            businessName: data.businessName || prev.businessName,
          }));
          if (data.currency === "USD") setSelectedCurrency("USD");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load checkout details");
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [packageParam, quoteIdParam]);

  const payableAmount = details
    ? details.type === "QUOTE"
      ? details.amount || 0
      : selectedCurrency === "INR"
      ? details.priceINR || 0
      : details.priceUSD || 0
    : 0;

  const handlePayment = async () => {
    if (!details || !details.isCheckoutAllowed) {
      setError("Direct checkout is not permitted for this engagement. Please request a custom quote.");
      return;
    }

    if (!customer.name || !customer.email) {
      setError("Please fill in your name and email address.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      if (selectedCurrency === "INR") {
        // Razorpay Gateway
        const res = await fetch("/api/payments/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageId: details.packageId || details.slug || "",
            quoteId: details.quoteId || "",
            packageName: details.title,
            amount: payableAmount * 100, // paise
            customer,
            submissionId: submissionIdParam,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "Failed to initiate payment");

        if (typeof window !== "undefined" && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay({
            key: data.checkoutData.key,
            amount: data.checkoutData.amount,
            currency: "INR",
            name: BRAND.name,
            description: details.title,
            order_id: data.orderId,
            prefill: data.checkoutData.prefill,
            handler: async function (response: any) {
              const verifyRes = await fetch("/api/payments/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...response,
                  orderId: data.orderId,
                  submissionId: submissionIdParam,
                  customer,
                  packageName: details.title,
                  amount: payableAmount * 100,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyRes.ok) {
                router.push(
                  `/booking-confirmation?orderNumber=${verifyData.orderNumber || data.orderId}&packageName=${encodeURIComponent(details.title)}`
                );
              } else {
                setError(verifyData.message || "Payment verification failed.");
              }
            },
            theme: { color: "#1B2838" },
          });
          rzp.open();
        } else {
          throw new Error("Razorpay payment gateway SDK is not loaded. Please verify your connection.");
        }
      } else {
        // Stripe Gateway
        const res = await fetch("/api/payments/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageId: details.packageId || details.slug || "",
            quoteId: details.quoteId || "",
            packageName: details.title,
            amount: payableAmount * 100, // cents
            customer,
            submissionId: submissionIdParam,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "Failed to initiate Stripe session");

        if (data.checkoutData?.url) {
          window.location.href = data.checkoutData.url;
        } else {
          throw new Error("Stripe checkout URL was not received.");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Payment processing encountered an error.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#1B2838] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#5A6472]">Verifying advisory engagement status...</p>
      </div>
    );
  }

  // If checkout is DISABLED because package is unpublished or does not exist:
  if (!details || !details.isCheckoutAllowed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-8 sm:p-12 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-700 border border-amber-200">
            <AlertCircle className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-[#1B2838]">
              Direct Checkout Is Unavailable
            </h1>
            <p className="text-xs sm:text-sm text-[#5A6472] leading-relaxed">
              This advisory package has not been published for automated online checkout. DOW Consulting formulates client engagements through tailored scopes and structured proposals led directly by Niraj Kumar.
            </p>
          </div>

          <div className="p-4 bg-[#F7F6F3] rounded-lg border border-[#E2E8F0] text-xs text-[#1B2838] max-w-md mx-auto space-y-1">
            <strong>Next Step:</strong>
            <p className="text-[#5A6472]">
              Submit your business profile through our intake assessment to receive a transparent proposal and confirmed fee.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/intake?mode=custom-quote"
              className="inline-flex items-center justify-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Request Custom Proposal</span>
              <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center justify-center gap-2 bg-[#FFFFFF] hover:bg-[#F7F6F3] text-[#5A6472] px-5 py-3 rounded text-xs font-semibold border border-[#E2E8F0]"
            >
              <span>View Advisory Scopes</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          {details.type === "QUOTE" ? "Approved Advisory Proposal" : "Secure Advisory Engagement"}
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">
          Confirm Engagement &amp; Payment
        </h1>
        <p className="text-xs text-[#5A6472]">
          Fixed professional retainer. Upfront scope with zero hidden hourly meters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Client Details & Gateway Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-5">
            <h3 className="text-base font-bold text-[#1B2838]">1. Client &amp; Entity Details</h3>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Executive Full Name *</label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g. Ramesh Verma"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Business / Entity Name</label>
                <input
                  type="text"
                  value={customer.businessName}
                  onChange={(e) => setCustomer({ ...customer, businessName: e.target.value })}
                  placeholder="e.g. Verma Retail Ventures"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="ramesh@company.com"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">WhatsApp / Contact Phone</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>
            </div>
          </div>

          {/* Payment Gateway Selector */}
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#1B2838]">2. Payment Method &amp; Gateway</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label
                onClick={() => setSelectedCurrency("INR")}
                className={`p-4 rounded border cursor-pointer space-y-1 ${
                  selectedCurrency === "INR"
                    ? "border-[#1B2838] bg-[#F7F6F3]"
                    : "border-[#E2E8F0] hover:border-[#1B2838]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1B2838]">Razorpay (India)</span>
                  <span className="text-[10px] bg-[#1B2838] text-white px-2 py-0.5 rounded">INR (₹)</span>
                </div>
                <p className="text-[11px] text-[#5A6472]">UPI, NetBanking, Debit &amp; Credit Cards</p>
              </label>

              <label
                onClick={() => setSelectedCurrency("USD")}
                className={`p-4 rounded border cursor-pointer space-y-1 ${
                  selectedCurrency === "USD"
                    ? "border-[#1B2838] bg-[#F7F6F3]"
                    : "border-[#E2E8F0] hover:border-[#1B2838]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1B2838]">Stripe (International)</span>
                  <span className="text-[10px] bg-[#1B2838] text-white px-2 py-0.5 rounded">USD ($)</span>
                </div>
                <p className="text-[11px] text-[#5A6472]">International Cards &amp; Global Currencies</p>
              </label>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#8C96A5]">
              <Lock className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Payments are processed with 256-bit encryption through certified gateways.</span>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1B2838] text-[#F7F6F3] p-6 sm:p-8 rounded-lg border border-[#2A3D54] shadow-lg space-y-6">
            <div className="border-b border-[#2A3D54] pb-4">
              <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
                {details.type === "QUOTE" ? "Proposal Scope" : "Engagement Scope"}
              </span>
              <h3 className="text-xl font-bold mt-1 text-[#F7F6F3]">{details.title}</h3>
              {details.subtitle && (
                <p className="text-xs text-[#8C96A5] mt-0.5">{details.subtitle}</p>
              )}
            </div>

            {/* Scope inclusions or quote summary */}
            <div className="space-y-3 text-xs text-[#E2E8F0]">
              {details.scopeSummary ? (
                <div className="p-3 rounded bg-[#111B27] border border-[#2A3D54] text-xs text-[#E2E8F0]">
                  <strong className="text-[#C9A24B] block mb-1">Tailored Scope:</strong>
                  {details.scopeSummary}
                </div>
              ) : details.inclusions && details.inclusions.length > 0 ? (
                details.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                  <span>Direct Consultation with Niraj Kumar + Written Diagnostic Report PDF</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#2A3D54] flex justify-between items-baseline">
              <span className="text-xs text-[#8C96A5]">Total Professional Retainer:</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#F7F6F3]">
                  {selectedCurrency === "INR"
                    ? `₹${payableAmount.toLocaleString("en-IN")}`
                    : `$${payableAmount.toLocaleString("en-US")} USD`}
                </span>
                <p className="text-[10px] text-[#8C96A5]">One-Time Flat Retainer</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-[#C9A24B] hover:bg-[#B8913B] text-[#1B2838] py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {processing
                  ? "Securing Order..."
                  : `Pay ${selectedCurrency === "INR" ? `₹${payableAmount.toLocaleString("en-IN")}` : `$${payableAmount}`} & Confirm`}
              </span>
            </button>
          </div>

          <div className="p-4 bg-[#FFFFFF] rounded border border-[#E2E8F0] text-[11px] text-[#5A6472] space-y-1">
            <strong className="text-[#1B2838]">Need a tailored enterprise scope instead?</strong>
            <p>
              For multi-city retail audits or complex industrial plants, request a custom proposal via our{" "}
              <Link href="/intake?mode=custom-quote" className="underline font-semibold text-[#1B2838]">
                Intake Form
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-xs text-[#5A6472]">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
