"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Download, Layers } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("arjun.verma@designstudio.in");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/account");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 sm:p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side: Login Form */}
        <div className="md:w-1/2 p-8 sm:p-10 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-700 flex items-center justify-center text-white font-black text-lg">
              K
            </div>
            <span className="font-extrabold text-xl text-slate-900">{BRAND_CONFIG.name}</span>
          </Link>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back</h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to access your downloaded templates & digital licenses.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
            <div>
              <label className="block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label>Password</label>
                <Link href="/forgot-password" className="text-violet-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl pl-9 pr-10 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="remember" defaultChecked className="rounded text-violet-600" />
              <label htmlFor="remember" className="text-slate-600 font-medium">
                Remember me on this browser
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-extrabold py-3 rounded-xl transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2"
            >
              Sign In to Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider & Google Placeholder */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t w-full border-slate-200" />
              <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase absolute">
                Or Continue With
              </span>
            </div>

            <button
              onClick={() => {
                login("google.user@gmail.com");
                router.push("/account");
              }}
              className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Sign in with Google
            </button>
          </div>

          <p className="text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet-700 font-bold hover:underline">
              Create Free Account
            </Link>
          </p>
        </div>

        {/* Right Side: Tasteful Promotional Showcase Panel */}
        <div className="md:w-1/2 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-cyan-400/30">
              Single-Seller Store
            </span>

            <h2 className="text-2xl font-black leading-tight text-white">
              Instant Access to 5,000+ Indian Design Assets
            </h2>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Unlimited re-downloads from your personal vault</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production-ready source files (PSD, Canva, AI)</span>
              </div>
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-violet-400" />
                <span>Verified commercial usage rights</span>
              </div>
            </div>
          </div>

          {/* Asset Preview Thumbnail Card */}
          <div className="mt-8 bg-slate-800/90 border border-slate-700 p-3 rounded-2xl relative z-10">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80"
              alt="Diwali Festival Kit"
              className="w-full aspect-16/9 object-cover rounded-xl mb-2"
            />
            <div className="text-xs font-bold text-white">Diwali Celebration Kit (Included in Creator Plan)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
