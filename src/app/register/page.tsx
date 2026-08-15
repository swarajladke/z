"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { BRAND_CONFIG } from "@/config/brand.config";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    email: "priya.sharma@creator.in",
    password: "password123",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(formData.email, "customer");
      router.push("/account");
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-[#F5F2EC]">
      {/* Left Editorial Product Composition Column */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#171717] text-white p-12 flex-col justify-between relative overflow-hidden bg-dot-pattern-dark">
        <Link href="/" className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-lg">
            K
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">{BRAND_CONFIG.name}</span>
        </Link>

        <div className="space-y-6 z-10 max-w-md">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Join 14,000+ Indian Creators
          </span>
          <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
            Create faster. Design better.
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Instant digital downloads, layered Photoshop PSDs, Canva edit links and lifetime commercial usage rights for your agency.
          </p>

          <div className="space-y-3 pt-2 text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant download access after checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Verified commercial rights certificates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
              <span>Free updates on purchased files</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 z-10">
          © {new Date().getFullYear()} {BRAND_CONFIG.name} Digital Asset Store
        </div>
      </div>

      {/* Right Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-[rgba(23,23,23,0.12)] shadow-xl space-y-6">
          <div className="space-y-1 text-center lg:text-left">
            <h2 className="text-2xl font-black text-slate-900">Create Account</h2>
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-violet-700 font-bold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
              />
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-slate-500 font-bold hover:underline">
              ← Return to KalaStock Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
