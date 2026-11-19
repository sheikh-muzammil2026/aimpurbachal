"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function DashboardError({ error, retry, reset }) {
  useEffect(() => {
    console.error("Dashboard route error:", error);
  }, [error]);

  const handleRetry = () => {
    if (typeof retry === "function") {
      retry();
    } else if (typeof reset === "function") {
      reset();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-[#031810] shadow-lg overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-700" />
        <div className="p-6 sm:p-8 text-center space-y-5">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-amber-100">
              দুঃখিত! পেজটি লোড করতে সমস্যা হয়েছে
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              অপ্রত্যাশিত ত্রুটির কারণে এই ড্যাশবোর্ড অংশটি প্রদর্শন করা যায়নি।
              অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা ড্যাশবোর্ডের মূল পাতায় ফিরে যান।
            </p>
          </div>

          {(error?.message || error?.digest) && (
            <div className="rounded-xl bg-slate-50 dark:bg-[#02120b] border border-slate-200 dark:border-emerald-900/60 px-4 py-3 text-left">
              {error?.message && (
                <p className="text-xs font-mono text-rose-700 dark:text-rose-300 break-words">
                  {error.message}
                </p>
              )}
              {error?.digest && (
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleRetry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>আবার চেষ্টা করুন</span>
            </button>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-amber-200 text-xs sm:text-sm font-bold transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>ড্যাশবোর্ডে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
