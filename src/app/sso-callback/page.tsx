"use client";

import React, { useEffect, useState } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Loader2, ShieldCheck } from "lucide-react";

export default function RootSSOCallbackPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = Boolean(
    clerkKey && clerkKey.startsWith("pk_") && !clerkKey.includes("placeholder")
  );

  return (
    <div className="min-h-screen bg-[#F7F6F3] py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-[#FFFFFF] p-8 rounded-lg border border-[#E2E8F0] shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#1B2838] text-[#C9A24B] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[#1B2838]">Authenticating Session...</h1>
          <p className="text-xs text-[#5A6472]">
            Completing secure Single Sign-On handshake with Google.
          </p>
        </div>
        <div className="flex justify-center py-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#C9A24B]" />
        </div>
        {mounted && isClerkConfigured && (
          <AuthenticateWithRedirectCallback
            signInForceRedirectUrl="/account"
            signUpForceRedirectUrl="/account"
            signInFallbackRedirectUrl="/account"
            signUpFallbackRedirectUrl="/account"
          />
        )}
      </div>
    </div>
  );
}
