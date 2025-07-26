"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { user, signInWithEmail, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      router.push('/generator');
    }
  }, [user, router]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSignIn = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const { error } = await signInWithEmail(email);

      if (error) {
        setMessage("Error sending magic link. Please try again.");
      } else {
        setMessage("Check your email for the magic link!");
      }
    } catch {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [email, signInWithEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Logo */}
      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#FF2157] mb-6">
        <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/3b61efad7bc3ae28e53589b144ff90f32ce9165c?width=86"
          alt="Pickup Line Generator logo"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="font-inter font-bold text-xl text-[#212121] mb-4">
        Pickup Line Generator
      </h1>

      {/* Subtitle */}
      <p className="font-inter text-base text-[#AAB5C0] text-center mb-8 max-w-md">
        Generate pickup line for your crush now!
      </p>

      {/* Email Sign In Form */}
      <form onSubmit={handleSignIn} className="w-full max-w-md space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full px-4 py-3.5 bg-[#FAFAFA] rounded-3xl border border-gray-200 focus:outline-none focus:border-[#FF2157] font-inter text-base text-[#212121]"
            aria-describedby={message ? "message" : undefined}
          />
        </div>
        <button
          type="submit"
          disabled={loading || isSubmitting || !email}
          className="w-full px-4 py-3.5 bg-[#FF2157] text-white rounded-3xl hover:bg-[#E01E4F] transition-colors disabled:opacity-50 font-inter font-bold text-base"
          aria-label={isSubmitting ? "Sending magic link..." : "Send magic link"}
        >
          {isSubmitting ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <p 
          id="message"
          className={`font-inter text-sm text-center max-w-md ${
            message.includes('Error') ? 'text-red-500' : 'text-green-600'
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}

      {/* Terms Text */}
      <p className="font-inter text-sm text-[#AAB5C0] text-center mt-auto mb-8 max-w-md leading-relaxed">
        By signing up, you agree to the{" "}
        <a href="#" className="underline hover:text-[#212121] transition-colors">
          Terms of Use
        </a>
        ,{" "}
        <a href="#" className="underline hover:text-[#212121] transition-colors">
          Privacy Notice
        </a>
      </p>
    </div>
  );
}
