"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-md w-full p-8 sm:p-10 space-y-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center text-white font-black text-lg">
            K
          </div>
          <span className="font-extrabold text-xl text-slate-900">{BRAND_CONFIG.name}</span>
        </Link>

        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Reset Password</h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your account email address and we&apos;ll send you a password reset link.
          </p>
        </div>

        {sent ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Reset Link Sent!
            </div>
            <p>We have sent instructions to <strong>{email}</strong>. Please check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="arjun.verma@designstudio.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-extrabold py-3 rounded-xl transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2"
            >
              Send Password Reset Link <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500">
          Remembered your password?{" "}
          <Link href="/login" className="text-violet-700 font-bold hover:underline">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
