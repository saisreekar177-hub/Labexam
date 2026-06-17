"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadStudentProfile, loadAssessments } from "@/lib/storage";
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Award, 
  AlertTriangle, 
  ShieldCheck, 
  LogOut, 
  ArrowRight, 
  Laptop, 
  Search, 
  Calendar,
  Lock,
  User,
  ClipboardList
} from "lucide-react";
import EmptyState from "@/components/empty-state";

interface MockExam {
  id: string;
  name: string;
  subject: string;
  duration: number;
  questionsCount: number;
  assignedDate: string;
  status: "Active" | "Upcoming" | "Completed";
  scheduledTime?: string;
  score?: string;
  completionDate?: string;
  syllabus?: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [emptyStateMode, setEmptyStateMode] = useState<"none" | "no-assigned" | "no-upcoming" | "no-results">("none");

  // Dynamic states
  const [studentData, setStudentData] = useState({
    roll: "22CSE102",
    name: "Aditya Verma",
    dept: "Computer Science",
    year: "3rd Year",
    section: "A",
    email: "aditya.22cse@psg.edu",
    ip: "192.168.12.104"
  });

  const [allExams, setAllExams] = useState<MockExam[]>([]);

  // Load profile and exams from storage on client mount
  useEffect(() => {
    setStudentData(loadStudentProfile());
    
    const loadedAsms = loadAssessments();
    const mapped: MockExam[] = loadedAsms.map(a => {
      let status: "Active" | "Upcoming" | "Completed" = "Upcoming";
      if (a.status === "Active") status = "Active";
      else if (a.status === "Completed") status = "Completed";
      
      return {
        id: a.id,
        name: a.name,
        subject: a.subject,
        duration: a.duration,
        questionsCount: a.questionsCount,
        assignedDate: a.createdDate,
        status,
        scheduledTime: status === "Upcoming" ? "June 18, 2026, 02:00 PM" : undefined,
        score: status === "Completed" ? "8.5 / 10.0" : undefined,
        completionDate: status === "Completed" ? "June 15, 2026" : undefined,
        syllabus: "Standard course syllabus criteria checks."
      };
    });
    setAllExams(mapped);
  }, []);

  // Derive counts based on simulated empty states
  const displayExams = allExams.filter(exam => {
    if (emptyStateMode === "no-assigned") return false;
    if (emptyStateMode === "no-upcoming" && exam.status === "Upcoming") return false;
    if (emptyStateMode === "no-results" && exam.status === "Completed") return false;
    return true;
  });

  const activeExams = displayExams.filter(e => e.status === "Active");
  const upcomingExams = displayExams.filter(e => e.status === "Upcoming");
  const completedExams = displayExams.filter(e => e.status === "Completed");

  // Calculate statistics
  const totalAssigned = emptyStateMode === "no-assigned" ? 0 : allExams.length;
  const upcomingCount = emptyStateMode === "no-assigned" || emptyStateMode === "no-upcoming" ? 0 : allExams.filter(e => e.status === "Upcoming").length;
  const completedCount = emptyStateMode === "no-assigned" || emptyStateMode === "no-results" ? 0 : allExams.filter(e => e.status === "Completed").length;
  const averageScore = emptyStateMode === "no-assigned" || emptyStateMode === "no-results" ? "N/A" : "9.0 / 10.0";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-xs text-slate-800">
      
      {/* Header bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-navy-900 p-2 rounded-lg text-white font-bold flex items-center justify-center w-8 h-8 font-mono">
            EC
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-slate-900 uppercase">ExamCoder Student Portal</h1>
            <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider font-sans">
              PSG College of Technology • Secure Sandbox Session
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block border-r border-slate-200 pr-4">
            <p className="font-extrabold text-slate-900 text-xs">{studentData.name}</p>
            <p className="text-[9px] text-slate-400 font-mono font-bold mt-0.5">
              Roll: {studentData.roll} • {studentData.dept} (Sec {studentData.section})
            </p>
          </div>
          <Link 
            href="/student/login" 
            className="text-slate-500 hover:text-slate-800 p-2 rounded-md transition-all flex items-center gap-1 font-bold"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </Link>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-6xl w-full mx-auto p-6 md:p-8 space-y-6 flex-1">
        
        {/* Toggle Empty States Previews */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-wrap gap-2 items-center justify-between">
          <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Empty State Simulation Controls:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button 
              onClick={() => setEmptyStateMode("none")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "none" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Populated Dashboard
            </button>
            <button 
              onClick={() => setEmptyStateMode("no-assigned")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "no-assigned" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Empty: No Exams
            </button>
            <button 
              onClick={() => setEmptyStateMode("no-upcoming")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "no-upcoming" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Empty: No Upcoming
            </button>
            <button 
              onClick={() => setEmptyStateMode("no-results")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "no-results" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Empty: No Results
            </button>
          </div>
        </div>

        {/* Security Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-lg flex gap-3 items-start shadow-2xs">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-bold text-[11px] uppercase tracking-wider">Security Sandbox System Compliance</h4>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Secure assessments enforce fullscreen locking, window context tracking, and disable clipboard copy/paste features. Before launching any active examination, ensure all messaging programs, coding tools (VS Code, terminal), or dynamic overlays are closed.
            </p>
          </div>
        </div>

        {/* Statistics Dashboard row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Total Assessments Assigned</p>
            <p className="text-2xl font-extrabold text-slate-950 mt-1">{totalAssigned}</p>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Upcoming Examinations</p>
            <p className="text-2xl font-extrabold text-blue-800 mt-1">{upcomingCount}</p>
          </div>
          <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Completed Assessments</p>
            <p className="text-2xl font-extrabold text-emerald-800 mt-1">{completedCount}</p>
          </div>
          <div className="bg-slate-900 text-white p-4 border border-slate-950 rounded-lg shadow-2xs flex flex-col justify-between">
            <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Historical Average Score</p>
            <p className="text-2xl font-extrabold text-white mt-1 font-mono">{averageScore}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Active and Upcoming Exams */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Exams Pool */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-slate-250 pb-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Examinations Pool</h2>
                <Link href="/student/assessments" className="text-navy-700 hover:text-navy-900 font-bold hover:underline">
                  View All Assessments &rarr;
                </Link>
              </div>

              {activeExams.length > 0 ? (
                <div className="grid gap-3">
                  {activeExams.map(exam => (
                    <div 
                      key={exam.id}
                      className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-navy-200"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Active Now
                          </span>
                          <span className="text-slate-400 font-semibold font-mono text-[9px]">COURSE: {exam.subject}</span>
                        </div>
                        <h3 className="font-extrabold text-slate-950 text-xs">{exam.name}</h3>
                        <p className="text-slate-500 leading-normal max-w-lg">
                          Syllabus: {exam.syllabus}
                        </p>
                        <div className="flex items-center gap-4 text-slate-500 font-medium text-[9px] pt-1">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.duration} Minutes limit</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {exam.questionsCount} Coding Problems</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Laptop className="w-3.5 h-3.5" /> Locked IDE</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => router.push(`/student/assessments/${exam.id}`)}
                        className="bg-navy-900 hover:bg-navy-950 text-white font-bold px-4 py-2.5 rounded-md text-center flex items-center justify-center gap-1.5 shrink-0 transition-all focus-ring"
                      >
                        Start Assessment <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <EmptyState
                    title="No Assessments Active"
                    description="There are currently no proctored programming practicals running in your departmental pool."
                    icon={ShieldCheck}
                  />
                </div>
              )}
            </div>

            {/* Upcoming Exams Pool */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-250 pb-2">
                Upcoming Examinations Schedule
              </h2>

              {upcomingExams.length > 0 ? (
                <div className="grid gap-3">
                  {upcomingExams.map(exam => (
                    <div 
                      key={exam.id}
                      className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs flex justify-between items-start transition-all hover:border-slate-300"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-50 border border-blue-200 text-blue-800 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Upcoming
                          </span>
                          <span className="text-slate-400 font-semibold font-mono text-[9px]">COURSE: {exam.subject}</span>
                        </div>
                        <h3 className="font-extrabold text-slate-950 text-xs">{exam.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium text-[9px] pt-1">
                          <span className="flex items-center gap-1 font-semibold text-slate-800"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {exam.scheduledTime}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.duration} Mins</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => router.push(`/student/assessments/${exam.id}`)}
                        className="bg-white border border-slate-250 hover:bg-slate-50 text-slate-850 font-bold px-3 py-1.5 rounded transition-all text-[10px]"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <EmptyState
                    title="No Upcoming Assessments"
                    description="No exams or practical tests are scheduled in the calendar for your class cohort."
                    icon={Calendar}
                  />
                </div>
              )}
            </div>

            {/* Past Graded Submissions */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-250 pb-2">
                Recent Submissions & Grades
              </h2>

              {completedExams.length > 0 ? (
                <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden shadow-2xs">
                  {completedExams.map(exam => (
                    <div key={exam.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-xs">{exam.name}</span>
                          <span className="text-slate-400 font-mono text-[9px]">{exam.subject}</span>
                        </div>
                        <p className="text-slate-400 mt-1 font-medium">Completed: {exam.completionDate} • Access Key: Verified SSL</p>
                      </div>
                      
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="font-bold text-slate-950 font-mono text-xs">{exam.score}</p>
                          <p className="text-[8px] text-emerald-700 font-bold flex items-center gap-0.5 justify-end mt-0.5 uppercase tracking-wider">
                            <CheckCircle className="w-3 h-3" /> Graded OK
                          </p>
                        </div>
                        <button 
                          onClick={() => alert(`Simulation: Fetching code performance metrics and feedback for ${exam.name}.`)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold p-1 rounded transition-all"
                          title="View submission details"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <EmptyState
                    title="No Results Available"
                    description="You have not submitted any coding exams for grading during this academic period."
                    icon={Award}
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Panel: Academic profile & IP surveillance status */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Student Profile Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-2xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[9px] border-b border-slate-100 pb-2 flex items-center gap-1.5 text-slate-500">
                <User className="w-4 h-4" /> Academic Candidate Profile
              </h3>
              
              <div className="space-y-3 leading-relaxed">
                <div className="flex justify-between border-b border-slate-50 pb-1">
                  <span className="text-slate-500 font-semibold">Full Name:</span>
                  <span className="font-bold text-slate-900">{studentData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-1">
                  <span className="text-slate-500 font-semibold">Roll Number:</span>
                  <span className="font-bold text-slate-900 font-mono">{studentData.roll}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-1">
                  <span className="text-slate-500 font-semibold">Official Email:</span>
                  <span className="font-bold text-slate-900 font-mono">{studentData.email}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500 font-semibold">Section Class:</span>
                  <span className="font-bold text-slate-900">{studentData.dept} (A)</span>
                </div>
              </div>
            </div>

            {/* Network Security Status */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3 shadow-2xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[9px] border-b border-slate-100 pb-2 flex items-center gap-1.5 text-slate-500">
                <ClipboardList className="w-4 h-4" /> Session Network Surveillance
              </h3>
              
              <div className="space-y-2.5 bg-slate-50 p-3.5 rounded border border-slate-200 font-mono text-[9px] text-slate-600 leading-normal">
                <div className="flex items-center justify-between border-b border-slate-150 pb-1.5">
                  <span>Client IP Address:</span>
                  <span className="text-slate-800 font-bold">{studentData.ip}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-150 pb-1.5">
                  <span>Intranet Subnet Check:</span>
                  <span className="text-emerald-800 font-bold uppercase">PSG-LAN Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Node Security Level:</span>
                  <span className="text-emerald-800 font-bold uppercase">Standard Sandbox</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
      
    </div>
  );
}
