import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!clerkKey || clerkKey.includes("placeholder")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F6F3] p-4">
        <div className="max-w-md w-full p-6 bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] text-center space-y-3">
          <p className="font-bold text-sm text-[#1B2838]">Authentication Service Gated</p>
          <p className="text-xs text-[#5A6472]">
            Clerk publishable key is pending production deployment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 bg-[#F7F6F3]">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/account"
      />
    </div>
  );
}
