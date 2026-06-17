"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnalyticsDashboardView from "@/components/analytics-dashboard-view";

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-xs text-slate-800">
      
      {/* Top Header Navigation */}
      <header className="bg-slate-900 border-b border-slate-850 px-6 py-4 flex items-center justify-between sticky top-0 z-30 text-white no-print">
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/dashboard" 
            className="text-slate-400 hover:text-white transition-colors mr-2 p-1.5 hover:bg-slate-800 rounded-md focus-ring flex items-center gap-1.5 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to System Console
          </Link>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <h2 className="text-sm font-bold text-white tracking-tight">System-Wide Academic Analytics</h2>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-4">
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold">
            Root Control Room
          </span>
          <div className="text-right hidden sm:block border-r border-slate-800 pr-3">
            <p className="font-bold text-slate-200">Root Administrator</p>
            <p className="text-[10px] text-slate-400 font-mono">admin@examcoder.edu</p>
          </div>
          <div className="bg-slate-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border border-slate-650">
            AD
          </div>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6 flex-1">
        <AnalyticsDashboardView initialRole="Admin" isStandalone={true} />
      </main>

    </div>
  );
}
