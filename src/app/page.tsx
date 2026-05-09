"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/shared/Logo";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[60%] h-[80%] rounded-[100%] bg-indigo-50/60 blur-3xl opacity-80" />
        <div className="absolute top-[30%] -left-[10%] w-[50%] h-[70%] rounded-[100%] bg-violet-50/60 blur-3xl opacity-80" />
      </div>

      <main className="relative z-10 container max-w-4xl px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 scale-150 transform">
            <Logo />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
            The World's Work <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              Marketplace.
            </span>
          </h1>
          
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium">
            Connect with top-tier freelancers or find your next big project. 
            WorkLance is the simplest way to get work done.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md mx-auto">
            <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:scale-105 w-full sm:w-auto" asChild>
              <Link href="/login">Log In to Work</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-gray-200 text-gray-700 hover:bg-gray-50 transition-all hover:scale-105 w-full sm:w-auto" asChild>
              <Link href="/signup/select-role">Join WorkLance</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900">Secure Payments</h3>
              <p className="text-sm text-gray-500 mt-2">Protected by our advanced escrow system.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 flex items-center justify-center mb-4 text-violet-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900">Top Talent</h3>
              <p className="text-sm text-gray-500 mt-2">Access the top 1% of independent professionals.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 text-emerald-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-gray-900">Easy Hiring</h3>
              <p className="text-sm text-gray-500 mt-2">Post a job and get bids in minutes.</p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="mt-auto py-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} WorkLance Inc. All rights reserved.
      </footer>
    </div>
  );
}
