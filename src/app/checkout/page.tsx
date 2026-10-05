"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CONSULTING_PACKAGES, PackageTier } from "@/lib/constants/packages";
import { BRAND } from "@/lib/constants/brand";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Lock,
  ArrowRight,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package") || "commercial-vastu-growth";
  const submissionId = searchParams.get("submissionId") || "";

  const [selectedPkg, setSelectedPkg] = useState<PackageTier>(
    CONSULTING_PACKAGES.find((p) => p.id === packageParam) || CONSULTING_PACKAGES[1]
  );
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });

  const amount = currency === "INR" ? selectedPkg.priceINR : selectedPkg.priceUSD;

  const handlePayment = async () => {
    if (!customer.name || !customer.email) {
      setError("Please fill in your name and email address.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      if (currency === "INR") {
        // Razorpay Flow
        const res = await fetch("/api/payments/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageId: selectedPkg.id,
            packageName: selectedPkg.name,
            amount: selectedPkg.priceINR * 100, // paise
            customer,
            submissionId,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to initiate payment");

        // If Razorpay SDK is available in browser or simulated test flow
        if (typeof window !== "undefined" && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay({
            key: data.checkoutData.key,
            amount: data.checkoutData.amount,
            currency: "INR",
            name: "DOW Consulting",
            description: selectedPkg.name,
            order_id: data.orderId,
            prefill: data.checkoutData.prefill,
            handler: async function (response: any) {
              const verifyRes = await fetch("/api/payments/razorpay/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...response,
                  orderId: data.orderId,
                  submissionId,
                }),
              });
              const verifyData = await verifyRes.json();
              if (verifyRes.ok) {
                router.push(`/account?orderId=${data.orderId}&payment=success`);
              } else {
                setError(verifyData.message || "Payment verification failed.");
              }
            },
            theme: { color: "#1B2838" },
          });
          rzp.open();
        } else {
          // Direct fallback / Test mode redirect for sandbox environments
          router.push(`/account?orderId=${data.orderId}&payment=success`);
        }
      } else {
        // Stripe Flow
        const res = await fetch("/api/payments/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            packageId: selectedPkg.id,
            packageName: selectedPkg.name,
            amount: selectedPkg.priceUSD * 100, // cents
            customer,
            submissionId,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to initiate Stripe session");

        if (data.checkoutData?.url) {
          window.location.href = data.checkoutData.url;
        } else {
          router.push(`/account?orderId=${data.orderId}&payment=success`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Payment processing encountered an error. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 space-y-2">
        <span className="text-[11px] font-bold text-[#C9A24B] uppercase tracking-wider">
          Secure Executive Checkout
        </span>
        <h1 className="text-3xl font-bold text-[#1B2838]">
          Confirm Advisory Engagement &amp; Payment
        </h1>
        <p className="text-xs text-[#5A6472]">
          Flat one-time professional fee. No recurring billing or per-minute meters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Client Details & Gateway Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FFFFFF] p-6 sm:p-8 rounded-lg border border-[#E2E8F0] shadow-sm space-y-5">
            <h3 className="text-base font-bold text-[#1B2838]">1. Client Information</h3>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="e.g. Anand Mahindra"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Business / Entity Name</label>
                <input
                  type="text"
                  value={customer.businessName}
                  onChange={(e) => setCustomer({ ...customer, businessName: e.target.value })}
                  placeholder="e.g. Apex Corp"
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
                  placeholder="anand@company.com"
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E8F0] focus:outline-none focus:border-[#1B2838]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">WhatsApp / Phone Number</label>
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
            <h3 className="text-base font-bold text-[#1B2838]">2. Payment Method &amp; Currency</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label
                onClick={() => setCurrency("INR")}
                className={`p-4 rounded border cursor-pointer space-y-1 ${
                  currency === "INR"
                    ? "border-[#1B2838] bg-[#F7F6F3]"
                    : "border-[#E2E8F0] hover:border-[#1B2838]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1B2838]">Razorpay (India)</span>
                  <span className="text-[10px] bg-[#1B2838] text-white px-2 py-0.5 rounded">INR</span>
                </div>
                <p className="text-[11px] text-[#5A6472]">UPI, NetBanking, Debit &amp; Credit Cards</p>
              </label>

              <label
                onClick={() => setCurrency("USD")}
                className={`p-4 rounded border cursor-pointer space-y-1 ${
                  currency === "USD"
                    ? "border-[#1B2838] bg-[#F7F6F3]"
                    : "border-[#E2E8F0] hover:border-[#1B2838]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1B2838]">Stripe (International)</span>
                  <span className="text-[10px] bg-[#1B2838] text-white px-2 py-0.5 rounded">USD</span>
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
                Order Summary
              </span>
              <h3 className="text-xl font-bold mt-1 text-[#F7F6F3]">{selectedPkg.name}</h3>
              <p className="text-xs text-[#8C96A5] mt-0.5">{selectedPkg.subtitle}</p>
            </div>

            <div className="space-y-3 text-xs text-[#E2E8F0]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>{selectedPkg.deliverables.liveSession}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>{selectedPkg.deliverables.writtenReport}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>{selectedPkg.deliverables.timingAudit}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>{selectedPkg.deliverables.spatialAudit}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A3D54] flex justify-between items-baseline">
              <span className="text-xs text-[#8C96A5]">Total Professional Fee:</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#F7F6F3]">
                  {currency === "INR"
                    ? `₹${selectedPkg.priceINR.toLocaleString("en-IN")}`
                    : `$${selectedPkg.priceUSD} USD`}
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
              <span>{processing ? "Securing Order..." : `Pay ${currency === "INR" ? `₹${selectedPkg.priceINR.toLocaleString("en-IN")}` : `$${selectedPkg.priceUSD}`} & Confirm`}</span>
            </button>
          </div>

          <div className="p-4 bg-[#FFFFFF] rounded border border-[#E2E8F0] text-[11px] text-[#5A6472] space-y-1">
            <strong className="text-[#1B2838]">Need to discuss a custom quote instead?</strong>
            <p>
              If your enterprise has multiple industrial sites, request a tailored proposal via our{" "}
              <a href="/intake?mode=custom-quote" className="underline font-semibold text-[#1B2838]">
                Intake Form
              </a>{" "}
              or message us on{" "}
              <a href={BRAND.contact.whatsapp.link} target="_blank" rel="noopener noreferrer" className="underline font-semibold text-[#1B2838]">
                WhatsApp
              </a>.
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
