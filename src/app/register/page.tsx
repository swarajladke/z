"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand.config";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "new.user@kalastock.in");
    router.push("/account");
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
          <h1 className="text-2xl font-extrabold text-slate-900">Create Free Account</h1>
          <p className="text-xs text-slate-500 mt-1">
            Start downloading free vectors, PNGs, and creative templates.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs font-semibold text-slate-700">
          <div>
            <label className="block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="priya@designstudio.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 focus:outline-hidden focus:border-violet-600 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-700 hover:bg-violet-800 text-white font-extrabold py-3 rounded-xl transition-all shadow-md shadow-violet-200 flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-violet-700 font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
