"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnalyticsDashboardView from "@/components/analytics-dashboard-view";
import { loadFacultyProfile } from "@/lib/storage";

export default function FacultyAnalyticsPage() {
  const [faculty, setFaculty] = useState({
    fullName: "Dr. Ramesh Sharma",
    department: "CSE",
    designation: "Professor & HOD"
  });

  useEffect(() => {
    setFaculty(loadFacultyProfile());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-xs text-slate-800">
      
      {/* Top Header Navigation */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 no-print">
        <div className="flex items-center gap-3">
          <Link 
            href="/faculty/dashboard" 
            className="text-slate-500 hover:text-slate-800 transition-colors mr-2 p-1.5 hover:bg-slate-100 rounded-md focus-ring flex items-center gap-1.5 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Executive Intelligence & Analytics</h2>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-4">
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
            PSG Tech Node
          </span>
          <div className="text-right hidden sm:block border-r border-slate-200 pr-3">
            <p className="font-bold text-slate-800">{faculty.fullName}</p>
            <p className="text-[10px] text-slate-400 font-medium">{faculty.designation} • Department of {faculty.department}</p>
          </div>
          <div className="bg-navy-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs">
            {faculty.fullName.split(" ").filter(Boolean).map(n => n[0]).join("").slice(0, 2).toUpperCase() || "FC"}
          </div>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6 flex-1">
        <AnalyticsDashboardView initialRole="Faculty" isStandalone={true} />
      </main>

    </div>
  );
}
