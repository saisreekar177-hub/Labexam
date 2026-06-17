"use client";

import React from "react";
import { ShieldAlert, ShieldCheck, Cpu, Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  role: "Student" | "Faculty" | "Administrator";
  title: string;
  subtitle: string;
  backToLanding?: boolean;
}

export default function AuthLayout({ children, role, title, subtitle, backToLanding = true }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      
      {/* Optional Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {backToLanding ? (
            <Link 
              href="/" 
              className="text-slate-500 hover:text-slate-800 transition-colors mr-2 p-1.5 hover:bg-slate-100 rounded-md focus-ring flex items-center gap-1.5 font-bold text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Landing Page
            </Link>
          ) : null}
          <div className="hidden md:flex items-center gap-1.5 border-l border-slate-200 pl-3">
            <span className="font-extrabold text-slate-900 tracking-tight text-xs uppercase">ExamCoder</span>
            <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold font-mono">NODE_3</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Server Online
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[10px] text-slate-500 font-mono">TLS 1.3 Active</span>
        </div>
      </header>

      {/* Split Pane Auth Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* LEFT PANE: Institutional Graphics & Proctor Warning */}
        <section className="lg:w-5/12 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-slate-800/10 opacity-30 -z-10"></div>

          {/* Institutional Top Details */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800/80 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              Academic Exam Lockdown
            </div>

            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Secure Sandboxed Compilation Environment
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Access to this server node is limited to authorized students and faculty members of affiliated engineering colleges.
              </p>
            </div>
          </div>

          {/* Center Graphic: Mock terminal screen */}
          <div className="my-8 bg-slate-950 rounded-lg p-5 border border-slate-800 shadow-2xl font-mono text-[10px] text-slate-400 max-w-sm w-full mx-auto lg:mx-0">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-slate-500 font-bold uppercase flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-slate-500" /> Sandbox Telemetry
              </span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500">// Initiating environment checks...</p>
              <p className="text-slate-300">SYSTEM: Secure browser wrapper hook [OK]</p>
              <p className="text-slate-300">NETWORK: Intranet routing table matched [OK]</p>
              <p className="text-slate-300">PROCESSORS: Compiler threads sandbox active [OK]</p>
              <p className="text-emerald-400 font-bold">STATUS: Exam session ready to initialize</p>
            </div>
          </div>

          {/* Bottom Pane: Compliance Notification */}
          <div className="space-y-4 pt-6 border-t border-slate-800 max-w-sm">
            <div className="flex gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-slate-200">Security & Proctor Audit Alert</h4>
                <p className="text-[10px] text-slate-400 leading-normal mt-1">
                  All keyboard focus shifts, compilation execution errors, and window toggles are recorded on department servers for academic integrity audits.
                </p>
              </div>
            </div>
            <p className="text-[9px] text-slate-500 leading-snug">
              ISO 27001 Certified Security Practices. Unauthorized access attempts will be logged with physical IP and network MAC address telemetry.
            </p>
          </div>

        </section>

        {/* RIGHT PANE: Children login forms */}
        <section className="lg:w-7/12 p-6 md:p-12 lg:p-16 flex items-center justify-center bg-slate-50/50">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-xs p-6 md:p-8 space-y-6">
            
            {/* Form Headers */}
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold text-navy-800 uppercase tracking-widest block">
                {role} Authentication Portal
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>
              <p className="text-xs text-slate-500 leading-normal">
                {subtitle}
              </p>
            </div>

            {/* Inner Form Card */}
            {children}

          </div>
        </section>

      </div>
    </div>
  );
}
