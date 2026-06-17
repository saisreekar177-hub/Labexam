"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Search, 
  FileSpreadsheet, 
  Activity, 
  Lock,
  ArrowRight
} from "lucide-react";

interface LogEntry {
  id: string;
  time: string;
  student: string;
  roll: string;
  event: string;
  status: "warning" | "critical" | "success" | "info";
}

export default function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<"monitoring" | "exams" | "analytics">("monitoring");
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", time: "11:42:15", student: "Aravind Swaminathan", roll: "22CSE104", event: "Tab switch detected (Chrome window unfocused)", status: "warning" },
    { id: "2", time: "11:41:50", student: "Pooja Hegde", roll: "22CSE156", event: "Fullscreen exited by user", status: "critical" },
    { id: "3", time: "11:40:02", student: "Rahul Sharma", roll: "22CSE092", event: "Test cases passed: Q2 (4/4)", status: "success" },
    { id: "4", time: "11:38:12", student: "Meera Nair", roll: "22CSE122", event: "Exam session initialized", status: "info" },
    { id: "5", time: "11:35:44", student: "Vijay Krishnan", roll: "22CSE181", event: "Copy-paste action blocked in editor", status: "warning" },
  ]);

  // Simulating live telemetry logs
  useEffect(() => {
    if (activeTab !== "monitoring") return;
    
    const interval = setInterval(() => {
      const names = ["Siddharth Sen", "Anjali Rao", "Divya Patel", "Kabir Bedi", "Neha Gupta"];
      const rolls = ["22CSE088", "22CSE142", "22CSE199", "22CSE054", "22CSE110"];
      const events: { event: string; status: "warning" | "critical" | "success" | "info" }[] = [
        { event: "Tab switch detected (Secondary screen focus attempted)", status: "warning" },
        { event: "Code compilation error resolved", status: "success" },
        { event: "Attempted to paste text from clipboard (blocked)", status: "warning" },
        { event: "Test cases passed: Q1 (5/5)", status: "success" },
        { event: "Re-entered fullscreen mode", status: "info" }
      ];

      const randomIndex = Math.floor(Math.random() * names.length);
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        time: timeStr,
        student: names[randomIndex],
        roll: rolls[randomIndex],
        event: randomEvent.event,
        status: randomEvent.status
      };

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden flex flex-col font-sans">
      {/* Platform Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-navy-600 p-2 rounded-lg text-white font-bold text-sm tracking-widest flex items-center justify-center w-8 h-8">
            ES
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide">EXAMCODER ADMIN</h3>
            <p className="text-slate-400 text-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              PSG College of Technology • Server Node-3
            </p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <button 
            onClick={() => setActiveTab("monitoring")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "monitoring" 
                ? "bg-slate-900 text-white shadow-xs" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Live Proctoring
            </span>
          </button>
          <button 
            onClick={() => setActiveTab("exams")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "exams" 
                ? "bg-slate-900 text-white shadow-xs" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Exams Control
            </span>
          </button>
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "analytics" 
                ? "bg-slate-900 text-white shadow-xs" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Grade Analytics
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 bg-slate-50 min-h-[420px] flex-1">
        
        {/* VIEW 1: LIVE PROCTORING & MONITORING */}
        {activeTab === "monitoring" && (
          <div className="space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              
              {/* Card 1: Active Students */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[76px] sm:min-h-[84px] md:min-h-[92px]">
                <div className="flex items-start justify-between w-full gap-2">
                  <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider truncate leading-tight">
                    Active Students
                  </p>
                  <div className="p-1 sm:p-1.5 rounded bg-navy-50 text-navy-900 shrink-0">
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-xl font-bold text-slate-900 font-mono leading-none mt-1.5 sm:mt-2">
                  128/132
                </p>
              </div>

              {/* Card 2: Proctor Warnings */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[76px] sm:min-h-[84px] md:min-h-[92px]">
                <div className="flex items-start justify-between w-full gap-2">
                  <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider truncate leading-tight">
                    Proctor Warnings
                  </p>
                  <div className="p-1 sm:p-1.5 rounded bg-amber-50 text-amber-600 shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-xl font-bold text-slate-900 font-mono leading-none mt-1.5 sm:mt-2">
                  6
                </p>
              </div>

              {/* Card 3: Submissions */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[76px] sm:min-h-[84px] md:min-h-[92px]">
                <div className="flex items-start justify-between w-full gap-2">
                  <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider truncate leading-tight">
                    Submissions
                  </p>
                  <div className="p-1 sm:p-1.5 rounded bg-emerald-50 text-emerald-600 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-xl font-bold text-slate-900 font-mono leading-none mt-1.5 sm:mt-2">
                  42/132
                </p>
              </div>

              {/* Card 4: Remaining Time */}
              <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between min-h-[76px] sm:min-h-[84px] md:min-h-[92px]">
                <div className="flex items-start justify-between w-full gap-2">
                  <p className="text-slate-500 text-[9px] sm:text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider truncate leading-tight">
                    Remaining Time
                  </p>
                  <div className="p-1 sm:p-1.5 rounded bg-blue-50 text-blue-600 shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-xl font-bold text-slate-900 font-mono leading-none mt-1.5 sm:mt-2">
                  01h 14m
                </p>
              </div>

            </div>

            {/* Live Violation Logs & Telemetry */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                  <span className="text-xs font-bold text-slate-950 uppercase tracking-wider">Live Security Logs Feed</span>
                </div>
                <span className="text-[11px] text-slate-500">Auto-refreshing every 5s</span>
              </div>
              <div className="divide-y divide-slate-150 max-h-[260px] overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-all text-xs">
                    <div className="flex items-start gap-3 flex-1 min-w-0 mr-4">
                      <div className="text-slate-400 font-mono pt-0.5">{log.time}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900 truncate">{log.student}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded font-mono font-medium">{log.roll}</span>
                        </div>
                        <p className="text-slate-600 mt-0.5 truncate">{log.event}</p>
                      </div>
                    </div>
                    <div>
                      {log.status === "warning" && (
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          Warning Issued
                        </span>
                      )}
                      {log.status === "critical" && (
                        <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          Exam Paused
                        </span>
                      )}
                      {log.status === "success" && (
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          Graded OK
                        </span>
                      )}
                      {log.status === "info" && (
                        <span className="bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          Connected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ACTIVE & SCHEDULED EXAMS */}
        {activeTab === "exams" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <h4 className="text-sm font-semibold text-slate-900">Current Semester Exams Portfolio</h4>
              <button className="text-xs text-navy-800 hover:text-navy-950 font-medium flex items-center gap-1">
                + Create New Assessment
              </button>
            </div>

            <div className="grid gap-3">
              {/* Exam 1 */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                      IN PROGRESS
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Lab Terminal CS201</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Data Structures Practical Exam - Sec A & B</h5>
                  <p className="text-xs text-slate-500">Evaluators: Prof. R. Ramanujan, Dr. S. Bose • 132 slots allocated</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <p className="text-slate-500">Scheduled Duration</p>
                    <p className="font-semibold text-slate-900">10:00 AM - 01:00 PM</p>
                  </div>
                  <button className="bg-navy-900 hover:bg-navy-950 text-white px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 text-[11px]">
                    Manage <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Exam 2 */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200 rounded">
                      SCHEDULED
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Internal Assessment IT305</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Object Oriented Programming Laboratory</h5>
                  <p className="text-xs text-slate-500">Evaluators: Prof. A. Sen • 65 slots allocated</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <p className="text-slate-500">Starts</p>
                    <p className="font-semibold text-slate-900">June 18, 02:00 PM</p>
                  </div>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 text-[11px]">
                    Configure
                  </button>
                </div>
              </div>

              {/* Exam 3 */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-75 hover:opacity-100 transition-opacity">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded">
                      COMPLETED
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">End-Sem CS304</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">Design & Analysis of Algorithms Practical</h5>
                  <p className="text-xs text-slate-500">Evaluated on June 16 • 120 Submissions graded automatically</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <p className="text-slate-500">Average Grade</p>
                    <p className="font-semibold text-emerald-700">8.42 / 10.0</p>
                  </div>
                  <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1 text-[11px]">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" /> Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: GRADE & SKILL GAP ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Average Lab Score</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">78.4%</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">▲ 4.2% improvement vs Midterm</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Cheating Index (Proctor)</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">0.12%</p>
                <p className="text-[10px] text-slate-500 mt-1">99.8% compliance rate</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Auto-Evaluation Speed</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">1.4 sec</p>
                <p className="text-[10px] text-slate-500 mt-1">Average run/eval execution time</p>
              </div>
            </div>

            {/* Skill Gaps Chart Mockup */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs">Topic-wise Syllabus Mastery Analysis</h5>
                  <p className="text-[10px] text-slate-500">Based on automatic grading test-case groups</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-755 px-2 py-0.5 rounded font-medium">Batch 2022-2026</span>
              </div>

              {/* Progress bars representing syllabus mapping */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Dynamic Programming & Memoization</span>
                    <span className="font-bold text-slate-900">62% Correctness</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "62%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Array Manipulations & HashMaps</span>
                    <span className="font-bold text-slate-900">89% Correctness</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: "89%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Graph Algorithms (DFS, BFS, Dijkstra)</span>
                    <span className="font-bold text-slate-900">74% Correctness</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-navy-600 h-full rounded-full" style={{ width: "74%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">Object-Oriented Design (Classes, Interfaces)</span>
                    <span className="font-bold text-slate-900">95% Correctness</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer statistics overlay */}
      <div className="bg-white border-t border-slate-200 px-6 py-3.5 flex items-center justify-between text-slate-500 text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            ISO 27001 Certified Environment
          </span>
          <span className="hidden md:inline-block text-slate-300">•</span>
          <span className="hidden md:inline-flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
            NBA/NAAC Compliant Reporting
          </span>
        </div>
        <div>
          <span className="text-slate-900 font-semibold">Active Session:</span> 2026-Summer-Labs
        </div>
      </div>
    </div>
  );
}
