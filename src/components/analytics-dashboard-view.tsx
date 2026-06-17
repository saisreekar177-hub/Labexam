"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Users, 
  Award, 
  AlertTriangle, 
  Calendar, 
  Download, 
  BookOpen, 
  Clock, 
  Database, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  BarChart3, 
  HelpCircle, 
  Activity, 
  FileSpreadsheet, 
  Layers,
  ChevronDown
} from "lucide-react";
import { loadStudents, loadAssessments, loadQuestions } from "@/lib/storage";

interface AnalyticsDashboardViewProps {
  initialRole?: "Faculty" | "HOD" | "Principal" | "Admin";
  isStandalone?: boolean;
}

export default function AnalyticsDashboardView({ 
  initialRole = "HOD",
  isStandalone = false 
}: AnalyticsDashboardViewProps) {
  // Roles list
  const roles = ["Faculty", "HOD", "Principal", "Admin"] as const;
  const [currentRole, setCurrentRole] = useState<typeof roles[number]>("Faculty");

  // States
  const [timeRange, setTimeRange] = useState<"Weekly" | "Monthly" | "Semester" | "Yearly">("Semester");
  const [deptFilter, setDeptFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [assessmentFilter, setAssessmentFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Empty state simulator
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [emptyStateType, setEmptyStateType] = useState<"NoAnalytics" | "NoAssessments" | "NoStudents">("NoAnalytics");

  // Tab state
  const [activeSubTab, setActiveSubTab] = useState<"trends" | "students" | "topics" | "cohorts" | "leaderboard">("trends");

  // Data states from storage
  const [allStudents, setAllStudents] = useState<any[]>([]);
  const [allAssessments, setAllAssessments] = useState<any[]>([]);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);

  useEffect(() => {
    setAllStudents(loadStudents());
    setAllAssessments(loadAssessments());
    setAllQuestions(loadQuestions());
  }, []);

  // Sync role selector adjustments
  const handleRoleChange = (role: typeof roles[number]) => {
    setCurrentRole(role);
    // Adjust filters based on role constraints
    if (role === "Faculty") {
      setDeptFilter("CSE");
      setSectionFilter("A");
    } else if (role === "HOD") {
      setDeptFilter("CSE");
      setSectionFilter("all");
    } else {
      setDeptFilter("all");
      setSectionFilter("all");
    }
  };

  // Mock static historical values for charts
  const trendData = {
    Weekly: [
      { name: "W1", score: 68, pass: 82, participation: 75 },
      { name: "W2", score: 72, pass: 85, participation: 80 },
      { name: "W3", score: 70, pass: 84, participation: 92 },
      { name: "W4", score: 76, pass: 90, participation: 94 }
    ],
    Monthly: [
      { name: "Jan", score: 65, pass: 78, participation: 70 },
      { name: "Feb", score: 70, pass: 82, participation: 82 },
      { name: "Mar", score: 74, pass: 88, participation: 88 },
      { name: "Apr", score: 78, pass: 92, participation: 95 }
    ],
    Semester: [
      { name: "Sem 1", score: 64, pass: 76, participation: 80 },
      { name: "Sem 2", score: 70, pass: 84, participation: 85 },
      { name: "Sem 3", score: 78, pass: 92, participation: 93 },
      { name: "Sem 4", score: 82, pass: 95, participation: 97 }
    ],
    Yearly: [
      { name: "2023", score: 68, pass: 80, participation: 78 },
      { name: "2024", score: 73, pass: 86, participation: 85 },
      { name: "2025", score: 76, pass: 90, participation: 91 },
      { name: "2026", score: 81, pass: 94, participation: 96 }
    ]
  };

  // Topic metrics mock data
  const topicData = [
    { name: "Loops", attempts: 184, successRate: 94, avgScore: 9.4, difficultyScore: 2 },
    { name: "Functions", attempts: 165, successRate: 88, avgScore: 8.8, difficultyScore: 3 },
    { name: "Arrays", attempts: 172, successRate: 85, avgScore: 8.5, difficultyScore: 4 },
    { name: "Strings", attempts: 154, successRate: 78, avgScore: 7.8, difficultyScore: 5 },
    { name: "Recursion", attempts: 140, successRate: 68, avgScore: 6.8, difficultyScore: 7 },
    { name: "Data Structures", attempts: 132, successRate: 72, avgScore: 7.2, difficultyScore: 8 },
    { name: "Algorithms", attempts: 110, successRate: 62, avgScore: 6.2, difficultyScore: 9 }
  ];

  // At-risk thresholds
  const atRiskStudents = [
    { name: "Vijay Krishnan", roll: "22EEE045", dept: "EEE", score: 45, failed: 3, participation: 52, reason: "Multiple Violations & Low Scores", riskLevel: "High" },
    { name: "Pooja Hegde", roll: "22CSE156", dept: "CSE", score: 54, failed: 2, participation: 68, reason: "Low Grader Pass Rate", riskLevel: "Medium" },
    { name: "Rahul Saini", roll: "22ECE094", dept: "ECE", score: 58, failed: 1, participation: 59, reason: "Poor Participation limit", riskLevel: "Medium" },
    { name: "Aman Preet", roll: "22CIV012", dept: "Civil", score: 48, failed: 3, participation: 48, reason: "Multiple Empty Submissions", riskLevel: "High" }
  ];

  // Department comparisons
  const deptData = [
    { name: "CSE", score: 82.4, pass: 95.6, participation: 96.8, assessments: 12 },
    { name: "ECE", score: 76.2, pass: 89.4, participation: 92.1, assessments: 8 },
    { name: "EEE", score: 71.8, pass: 82.1, participation: 88.5, assessments: 6 },
    { name: "Mechanical", score: 68.5, pass: 78.4, participation: 84.2, assessments: 5 },
    { name: "Civil", score: 66.2, pass: 75.1, participation: 81.0, assessments: 4 }
  ];

  // Batch / Section comparisons
  const batchData = [
    { name: "Section A", score: 81.5, pass: 95.4, participation: 96.2 },
    { name: "Section B", score: 74.8, pass: 89.2, participation: 92.5 },
    { name: "Section C", score: 72.1, pass: 81.0, participation: 89.4 }
  ];

  // Question difficulty summary
  const questionDifficulty = [
    { title: "Implement Dijkstra shortest path", attempts: 85, successRate: 42, avgTime: "45m", diffIndex: "Hard" },
    { title: "Validate Binary Search Tree", attempts: 128, successRate: 68, avgTime: "28m", diffIndex: "Medium" },
    { title: "Invert a Binary Tree", attempts: 132, successRate: 76, avgTime: "24m", diffIndex: "Medium" },
    { title: "Method Overloading Simulation", attempts: 154, successRate: 92, avgTime: "12m", diffIndex: "Easy" },
    { title: "Fibonacci Sequence recursion", attempts: 162, successRate: 95, avgTime: "8m", diffIndex: "Easy" }
  ];

  // Leaderboard lists
  const topStudents = [
    { name: "Aditya Verma", roll: "22CSE102", score: 98.4, rank: 1, dept: "CSE" },
    { name: "Aravind Swaminathan", roll: "22CSE104", score: 96.2, rank: 2, dept: "CSE" },
    { name: "Anjali Rao", roll: "22ECE012", score: 94.8, rank: 3, dept: "ECE" },
    { name: "Shriya Patel", roll: "22CSE110", score: 93.5, rank: 4, dept: "CSE" }
  ];

  // Skill gap overview
  const skillGaps = {
    strong: ["Loops & Conditionals", "Function Definition parameters", "Array Traversal indices"],
    weak: ["Recursion base call optimizations", "Graph shortest path implementations", "Pointer structures in C++"],
    recommendations: [
      "Assign practice sandbox challenges on Recursion before the final lab test.",
      "Distribute custom boilerplates explaining Dijkstra's adjacency mapping.",
      "Conduct a remedial debugging session on Pointer allocations."
    ]
  };

  // Simulating document exports
  const handleExport = (format: "PDF" | "Excel" | "CSV") => {
    const filename = `ExamCoder_Executive_Analytics_${timeRange}_Report.${format.toLowerCase()}`;
    alert(`Simulation: Exporting entire dashboard analytics in ${format} format to "${filename}".`);
  };

  // Grader calculations for top metrics
  const activeStudentsCount = allStudents.length || 132;
  const completedAssessmentsCount = allAssessments.filter(a => a.status === "Completed").length || 3;
  const activeAssessmentsCount = allAssessments.filter(a => a.status === "Active").length || 1;
  const aggregateScore = 78.4;
  const aggregatePassPercentage = 92.4;

  return (
    <div className="space-y-6 font-sans antialiased text-xs text-slate-800">
      
      {/* 1. Header Toolbar (Hidden in Print) */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-lg shadow-2xs no-print">
        <div className="space-y-1">
          <h2 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600 animate-pulse" /> Platform Analytics Intelligence
          </h2>
          <p className="text-slate-500 text-[11px]">
            Real-time grader compilations, student outcome gaps, and cognitive topic mastery trackers.
          </p>
        </div>

        {/* Dispatch Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Empty state toggles */}
          <div className="flex items-center gap-2 border-r border-slate-200 pr-3">
            <button 
              onClick={() => setIsEmptyState(!isEmptyState)}
              className={`px-3 py-1.5 rounded-md font-bold transition-all border ${
                isEmptyState 
                  ? "bg-rose-50 border-rose-200 text-rose-700" 
                  : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100"
              }`}
            >
              {isEmptyState ? "⚡ Populated State" : "⚠️ Empty State"}
            </button>
            {isEmptyState && (
              <select 
                value={emptyStateType}
                onChange={(e) => setEmptyStateType(e.target.value as any)}
                className="bg-white border border-slate-200 text-[10px] px-2 py-1.5 rounded font-bold"
              >
                <option value="NoAnalytics">No Analytics</option>
                <option value="NoAssessments">No Assessments</option>
                <option value="NoStudents">No Students</option>
              </select>
            )}
          </div>



          {/* Export tools */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleExport("CSV")}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" /> CSV
            </button>
            <button 
              onClick={() => handleExport("Excel")}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold px-2.5 py-1.5 rounded flex items-center gap-1 transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-450" /> Excel
            </button>
            <button 
              onClick={() => handleExport("PDF")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" /> Export PDF
            </button>
          </div>

        </div>
      </div>

      {/* 2. Active Filters Bar (Hidden in Empty State) */}
      {!isEmptyState && (
        <div className="bg-slate-100 border border-slate-200 px-5 py-3.5 rounded-lg flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase no-print">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </div>

          {/* Department Selection */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Dept:</span>
            <select 
              value={deptFilter} 
              onChange={(e) => setDeptFilter(e.target.value)}
              disabled={currentRole === "Faculty" || currentRole === "HOD"}
              className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-750 font-bold disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
            >
              <option value="all">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          {/* Batch Selection */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Batch:</span>
            <select 
              value={batchFilter} 
              onChange={(e) => setBatchFilter(e.target.value)}
              className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-750 font-bold cursor-pointer"
            >
              <option value="all">All Batches</option>
              <option value="2026">2026 Graduating</option>
              <option value="2027">2027 Roster</option>
              <option value="2028">2028 Sophomores</option>
            </select>
          </div>

          {/* Section Selection */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Section:</span>
            <select 
              value={sectionFilter} 
              onChange={(e) => setSectionFilter(e.target.value)}
              disabled={currentRole === "Faculty"}
              className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-750 font-bold disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer"
            >
              <option value="all">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          {/* Semester Selection */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Semester:</span>
            <select 
              value={semesterFilter} 
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-750 font-bold cursor-pointer"
            >
              <option value="all">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
            </select>
          </div>

          {/* Assessment Selection */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Exam:</span>
            <select 
              value={assessmentFilter} 
              onChange={(e) => setAssessmentFilter(e.target.value)}
              className="bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-750 font-bold cursor-pointer max-w-[200px]"
            >
              <option value="all">All Assessments</option>
              {allAssessments.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <span className="text-slate-400">Timeframe:</span>
            <div className="flex bg-white rounded border border-slate-200 p-0.5">
              {(["Weekly", "Monthly", "Semester", "Yearly"] as const).map(tr => (
                <button
                  key={tr}
                  onClick={() => setTimeRange(tr)}
                  className={`px-2.5 py-0.5 rounded text-[9px] font-bold ${
                    timeRange === tr 
                      ? "bg-slate-900 text-white shadow-2xs" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* EMPTY STATES CONTAINER */}
      {isEmptyState ? (
        <div className="bg-white border border-slate-200 rounded-lg p-16 text-center space-y-4 shadow-xs min-h-[400px] flex flex-col justify-center items-center">
          <div className="bg-rose-50 border border-rose-200 p-4 rounded-full text-rose-600 animate-bounce">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">
              {emptyStateType === "NoAnalytics" && "No Analytical Trends Compiled"}
              {emptyStateType === "NoAssessments" && "No Assessment Records Found"}
              {emptyStateType === "NoStudents" && "No Candidate Rosters Seeded"}
            </h3>
            <p className="text-slate-500 leading-normal">
              {emptyStateType === "NoAnalytics" && "We couldn't compile student outcome data. Complete and submit programming tests to trigger live grader aggregation."}
              {emptyStateType === "NoAssessments" && "No scheduled or past assessments were found on this node. Navigate to the Assessments wizard to compile one."}
              {emptyStateType === "NoStudents" && "There are no students enrolled in the platform database yet. Register new candidates in the Student Roster portal."}
            </p>
          </div>
          <button 
            onClick={() => setIsEmptyState(false)}
            className="bg-navy-900 hover:bg-navy-950 text-white font-bold px-4 py-2 rounded-md transition-all shadow-xs"
          >
            Load Platform Simulator Data
          </button>
        </div>
      ) : (
        <>
          {/* ========================================== */}
          {/* POPULATED ANALYTICS INTERFACE */}

          {/* 3. Top Metrics Overview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] block">
                  Total Audited Candidates
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {currentRole === "Faculty" ? 68 : currentRole === "HOD" ? 132 : activeStudentsCount}
                </span>
              </div>
              <div className="text-[10px] text-slate-450 font-medium mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Enrolled roster</span>
                <span className="text-emerald-600 font-bold">▲ 100% Active</span>
              </div>
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] block">
                  Assessments Completed
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block">
                  {currentRole === "Faculty" ? 2 : completedAssessmentsCount}
                </span>
              </div>
              <div className="text-[10px] text-slate-450 font-medium mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Sandbox sessions</span>
                <span className="text-slate-500 font-mono">OK</span>
              </div>
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] block">
                  Average score
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block font-mono">
                  {currentRole === "Faculty" ? "81.5%" : `${aggregateScore}%`}
                </span>
              </div>
              <div className="text-[10px] text-slate-450 font-medium mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Out of 100 max</span>
                <span className="text-emerald-600 font-bold">▲ 2.4% term rise</span>
              </div>
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] block">
                  Pass Percentage
                </span>
                <span className="text-2xl font-black text-slate-900 mt-1 block font-mono">
                  {currentRole === "Faculty" ? "95.4%" : `${aggregatePassPercentage}%`}
                </span>
              </div>
              <div className="text-[10px] text-slate-450 font-medium mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Pass threshold 50%</span>
                <span className="text-emerald-600 font-bold">▲ 1.1% term rise</span>
              </div>
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between col-span-2 md:col-span-1">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[8px] block">
                  Active Proctor Exams
                </span>
                <span className="text-2xl font-black text-blue-700 mt-1 block">
                  {activeAssessmentsCount}
                </span>
              </div>
              <div className="text-[10px] text-slate-450 font-medium mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Live compiler nodes</span>
                <span className="bg-emerald-50 text-emerald-800 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-100 animate-pulse">
                  SURVEILLANCE ON
                </span>
              </div>
            </div>

          </div>

          {/* 4. Subtab Switcher */}
          <div className="flex border-b border-slate-250 no-print">
            <button
              onClick={() => setActiveSubTab("trends")}
              className={`px-5 py-3 font-bold uppercase text-[10px] tracking-wider transition-all border-b-2 ${
                activeSubTab === "trends" 
                  ? "border-blue-600 text-blue-700 font-black" 
                  : "border-transparent text-slate-450 hover:text-slate-800"
              }`}
            >
              Academic Trends
            </button>
            <button
              onClick={() => setActiveSubTab("students")}
              className={`px-5 py-3 font-bold uppercase text-[10px] tracking-wider transition-all border-b-2 ${
                activeSubTab === "students" 
                  ? "border-blue-600 text-blue-700 font-black" 
                  : "border-transparent text-slate-450 hover:text-slate-800"
              }`}
            >
              Student Roster & At-Risk
            </button>
            <button
              onClick={() => setActiveSubTab("topics")}
              className={`px-5 py-3 font-bold uppercase text-[10px] tracking-wider transition-all border-b-2 ${
                activeSubTab === "topics" 
                  ? "border-blue-600 text-blue-700 font-black" 
                  : "border-transparent text-slate-450 hover:text-slate-800"
              }`}
            >
              Topic & Question Insights
            </button>
            <button
              onClick={() => setActiveSubTab("cohorts")}
              className={`px-5 py-3 font-bold uppercase text-[10px] tracking-wider transition-all border-b-2 ${
                activeSubTab === "cohorts" 
                  ? "border-blue-600 text-blue-700 font-black" 
                  : "border-transparent text-slate-450 hover:text-slate-800"
              }`}
            >
              Cohort Comparisons
            </button>
            <button
              onClick={() => setActiveSubTab("leaderboard")}
              className={`px-5 py-3 font-bold uppercase text-[10px] tracking-wider transition-all border-b-2 ${
                activeSubTab === "leaderboard" 
                  ? "border-blue-600 text-blue-700 font-black" 
                  : "border-transparent text-slate-450 hover:text-slate-800"
              }`}
            >
              Leaderboards
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: ACADEMIC TRENDS & PARTICIPATION */}
          {activeSubTab === "trends" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Line charts widget */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-lg space-y-6 shadow-2xs">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Academic Outcomes & Grader Averages ({timeRange})
                    </h3>
                    <p className="text-slate-400 text-[10px] mt-0.5">
                      Progress tracking for compiling scores and pass rates.
                    </p>
                  </div>
                  
                  {/* Legend indicator */}
                  <div className="flex items-center gap-4 text-[9px] font-bold uppercase font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                      <span>Avg Score</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>
                      <span>Pass Rate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
                      <span>Participation</span>
                    </div>
                  </div>
                </div>

                {/* SVG Line Chart View */}
                <div className="relative h-64 w-full bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center p-4">
                  <svg 
                    viewBox="0 0 500 200" 
                    className="w-full h-full overflow-visible" 
                    role="img" 
                    aria-label={`SVG Line Chart showing score, pass rate, and participation trends over ${timeRange} range.`}
                  >
                    {/* Grid Lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="60" x2="480" y2="60" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="40" y1="140" x2="480" y2="140" stroke="#e2e8f0" strokeWidth="1" />
                    <line x1="40" y1="180" x2="480" y2="180" stroke="#cbd5e1" strokeWidth="1.5" />

                    {/* Y-Axis Labels */}
                    <text x="15" y="25" className="text-[8px] font-mono fill-slate-400 text-right">100%</text>
                    <text x="15" y="65" className="text-[8px] font-mono fill-slate-400 text-right">75%</text>
                    <text x="15" y="105" className="text-[8px] font-mono fill-slate-400 text-right">50%</text>
                    <text x="15" y="145" className="text-[8px] font-mono fill-slate-400 text-right">25%</text>
                    <text x="15" y="185" className="text-[8px] font-mono fill-slate-400 text-right">0%</text>

                    {/* X-Axis Labels */}
                    {trendData[timeRange].map((pt, idx) => {
                      const x = 70 + idx * 120;
                      return (
                        <text key={idx} x={x} y="195" className="text-[9px] font-bold fill-slate-500 text-center font-sans">
                          {pt.name}
                        </text>
                      );
                    })}

                    {/* Path 1: Avg Score (Blue) */}
                    <path
                      d={trendData[timeRange].map((pt, idx) => {
                        const x = 70 + idx * 120;
                        const y = 180 - (pt.score / 100) * 160;
                        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Path 2: Pass Rate (Emerald) */}
                    <path
                      d={trendData[timeRange].map((pt, idx) => {
                        const x = 70 + idx * 120;
                        const y = 180 - (pt.pass / 100) * 160;
                        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Path 3: Participation (Amber) */}
                    <path
                      d={trendData[timeRange].map((pt, idx) => {
                        const x = 70 + idx * 120;
                        const y = 180 - (pt.participation / 100) * 160;
                        return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                      strokeLinecap="round"
                    />

                    {/* Points plots */}
                    {trendData[timeRange].map((pt, idx) => {
                      const x = 70 + idx * 120;
                      const y1 = 180 - (pt.score / 100) * 160;
                      const y2 = 180 - (pt.pass / 100) * 160;
                      return (
                        <g key={idx} className="hover:scale-110 transition-transform cursor-pointer">
                          <circle cx={x} cy={y1} r="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                          <circle cx={x} cy={y2} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Aggregated distribution dashboard */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-lg space-y-5 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Grader Score Distributions
                </h3>
                
                <div className="space-y-4 pt-2 font-mono">
                  {/* Dist Row 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span>EXCELLENT (SCORE &gt; 85)</span>
                      <span>44% (58 Students)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: "44%" }}></div>
                    </div>
                  </div>

                  {/* Dist Row 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span>AVERAGE (SCORE 60-85)</span>
                      <span>42% (55 Students)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: "42%" }}></div>
                    </div>
                  </div>

                  {/* Dist Row 3 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span>PASSING (SCORE 50-60)</span>
                      <span>8% (11 Students)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "8%" }}></div>
                    </div>
                  </div>

                  {/* Dist Row 4 */}
                  <div className="space-y-1 text-rose-700">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span>AT-RISK (SCORE &lt; 50)</span>
                      <span>6% (8 Students)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-600" style={{ width: "6%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-150 rounded-lg space-y-2 text-[10px] font-sans text-slate-550 leading-relaxed mt-4">
                  <p className="font-bold text-slate-800 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" /> Executive Observation:
                  </p>
                  <p>
                    Pass distributions indicate strong compiler conformance across core templates. Standard deviation centers around the 74-82 mark ranges.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: STUDENT ROSTER & RISK METRICS */}
          {activeSubTab === "students" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Roster performance breakdown */}
              <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-lg space-y-4 shadow-2xs">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Student Performance Categories
                  </h3>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="text-slate-400 font-bold uppercase pr-1">Search:</span>
                    <input 
                      type="text" 
                      placeholder="Roll or Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-slate-250 px-2 py-1 rounded text-[10px] focus:outline-hidden focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[8px]">
                        <th className="py-2.5 px-3">Roll Num</th>
                        <th className="py-2.5 px-3">Student Name</th>
                        <th className="py-2.5 px-3 text-center">Avg Grader Score</th>
                        <th className="py-2.5 px-3 text-center">Category</th>
                        <th className="py-2.5 px-3 text-right">Engagement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-mono">
                      {topStudents.map((st, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{st.roll}</td>
                          <td className="py-2.5 px-3 font-sans font-medium text-slate-800">{st.name}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-900">{st.score}%</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className="bg-blue-50 text-blue-800 text-[8px] font-bold px-2 py-0.5 rounded border border-blue-100 font-sans">
                              TOP PERFORMER
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">100% active</td>
                        </tr>
                      ))}
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">22CSE156</td>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Pooja Hegde</td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-900">54.0%</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="bg-rose-50 text-rose-800 text-[8px] font-bold px-2 py-0.5 rounded border border-rose-100 font-sans">
                            AT-RISK
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-amber-600 font-bold">68% active</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">22ECE094</td>
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Rahul Saini</td>
                        <td className="py-2.5 px-3 text-center font-bold text-slate-900">58.0%</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className="bg-amber-50 text-amber-800 text-[8px] font-bold px-2 py-0.5 rounded border border-amber-100 font-sans">
                            AVERAGE
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">59% active</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* At-risk automated detection engine */}
              <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-lg space-y-4 shadow-2xs">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> At-Risk Intervention Detector
                  </h3>
                  <span className="bg-rose-50 text-rose-700 text-[8px] font-bold px-2 py-0.5 rounded border border-rose-150">
                    4 Flags Raised
                  </span>
                </div>

                <div className="space-y-3">
                  {atRiskStudents.map((st, idx) => (
                    <div 
                      key={idx} 
                      className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col justify-between gap-2 hover:border-rose-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-900">{st.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5 font-mono">{st.roll} • Dept: {st.dept}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                          st.riskLevel === "High" ? "bg-rose-100 text-rose-800 border border-rose-200" : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}>
                          {st.riskLevel} RISK
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono border-t border-slate-150 pt-2">
                        <div>
                          <span className="text-slate-400 font-bold uppercase text-[9px] block">Avg score:</span>
                          <span className="font-extrabold text-slate-800">{st.score}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold uppercase text-[9px] block">Part. Rate:</span>
                          <span className="font-extrabold text-slate-800">{st.participation}%</span>
                        </div>
                        <button 
                          onClick={() => alert(`Triggering remedial warning communication flow to candidate "${st.name}" (${st.roll}).`)}
                          className="bg-navy-900 hover:bg-navy-950 text-white font-bold text-[9px] px-2 py-1 rounded transition-colors"
                        >
                          Intervene
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TOPIC & QUESTION INSIGHTS */}
          {activeSubTab === "topics" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Topic performance metrics */}
              <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-lg space-y-4 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Cognitive Topic Performance Indices
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[8px]">
                        <th className="py-2.5 px-3">Programming Core Topic</th>
                        <th className="py-2.5 px-3 text-center">Grader Attempts</th>
                        <th className="py-2.5 px-3 text-center">Avg Score</th>
                        <th className="py-2.5 px-3 text-right">Grader Success Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-mono">
                      {topicData.map((tp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-sans font-bold text-slate-850">{tp.name}</td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{tp.attempts} runs</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-900">{tp.avgScore}/10</td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-bold text-slate-900">{tp.successRate}%</span>
                              <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                                <div 
                                  className={`h-full ${tp.successRate > 80 ? "bg-emerald-600" : tp.successRate > 65 ? "bg-amber-500" : "bg-rose-600"}`} 
                                  style={{ width: `${tp.successRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Question difficulty statistics */}
              <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-lg space-y-4 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Grader Question Difficulty Audit
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[8px]">
                        <th className="py-2.5 px-3">Question Description</th>
                        <th className="py-2.5 px-3 text-center">Compiler Attempts</th>
                        <th className="py-2.5 px-3 text-center">Avg Time</th>
                        <th className="py-2.5 px-3 text-right">Difficulty Index</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-mono">
                      {questionDifficulty.map((qd, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-sans font-bold text-slate-850 truncate max-w-[200px]" title={qd.title}>
                            {qd.title}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{qd.attempts}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-950">{qd.avgTime}</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                              qd.diffIndex === "Hard" 
                                ? "bg-rose-50 text-rose-800 border border-rose-100" 
                                : qd.diffIndex === "Medium"
                                ? "bg-amber-50 text-amber-800 border border-amber-100"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-100"
                            }`}>
                              {qd.diffIndex} ({qd.successRate}% pass)
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Skill Gaps Analysis screen details */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg space-y-3.5 mt-2 text-[10px]">
                  <h4 className="font-extrabold text-[9px] tracking-wider uppercase text-slate-450 border-b border-slate-200 pb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" /> Syllabus Skill Gaps Analysis (OBE Mapping)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-extrabold text-emerald-800 uppercase block mb-1">✓ Strong Outcomes</span>
                      <ul className="list-disc pl-3 text-slate-650 space-y-1">
                        {skillGaps.strong.map((g, idx) => <li key={idx}>{g}</li>)}
                      </ul>
                    </div>
                    <div>
                      <span className="font-extrabold text-rose-850 uppercase block mb-1">✗ Weak Outcomes</span>
                      <ul className="list-disc pl-3 text-slate-650 space-y-1">
                        {skillGaps.weak.map((g, idx) => <li key={idx}>{g}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 pt-2">
                    <span className="font-bold text-slate-800 block mb-1">Recommended Remedial Strategies:</span>
                    <ol className="list-decimal pl-3 text-slate-600 space-y-0.5 font-medium">
                      {skillGaps.recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
                    </ol>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: COHORT COMPARISONS (BATCH / DEPARTMENT / SEMESTER) */}
          {activeSubTab === "cohorts" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Departmental Performance Matrix */}
              <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-lg space-y-4 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Departmental Comparative Benchmarks
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[8px]">
                        <th className="py-2.5 px-3">Department</th>
                        <th className="py-2.5 px-3 text-center">Avg Score</th>
                        <th className="py-2.5 px-3 text-center">Pass Rate</th>
                        <th className="py-2.5 px-3 text-center">Active Tests</th>
                        <th className="py-2.5 px-3 text-right">Completion Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-mono">
                      {deptData.map((dp, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{dp.name}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-slate-950">{dp.score}%</td>
                          <td className="py-2.5 px-3 text-center text-emerald-800 font-bold">{dp.pass}%</td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{dp.assessments} exams</td>
                          <td className="py-2.5 px-3 text-right text-slate-900 font-bold">{dp.participation}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section and Batch Comparison */}
              <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-lg space-y-5 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Class Section Comparisons
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[8px]">
                        <th className="py-2 px-3">CSE Class Section</th>
                        <th className="py-2 px-3 text-center font-bold">Grader Avg</th>
                        <th className="py-2 px-3 text-right">Pass Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-mono">
                      {batchData.map((sec, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 font-sans font-bold text-slate-850">{sec.name}</td>
                          <td className="py-2 px-3 text-center font-extrabold text-slate-900">{sec.score}%</td>
                          <td className="py-2 px-3 text-right text-emerald-800 font-bold">{sec.pass}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* SVG comparison bar chart */}
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-800 text-[10px] block uppercase">Average Section Score Comparison</span>
                  <div className="h-28 w-full flex items-end justify-between px-6 pb-2 pt-4">
                    {batchData.map((sec, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[70px]">
                        <span className="text-[9px] font-mono font-bold text-slate-700">{sec.score}%</span>
                        <div 
                          className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-all cursor-pointer" 
                          style={{ height: `${sec.score - 20}px` }} // Scaled height
                        ></div>
                        <span className="text-[8px] font-bold text-slate-500 uppercase font-sans whitespace-nowrap">{sec.name.split(" ")[1] || sec.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: LEADERBOARD OVERVIEWS */}
          {activeSubTab === "leaderboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Student leaderboard */}
              <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-lg space-y-4 shadow-2xs">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-550 fill-amber-500/10" /> Top Performing Grader Roster
                </h3>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[8px]">
                        <th className="py-2 px-3 text-center">Rank</th>
                        <th className="py-2 px-3">Candidate</th>
                        <th className="py-2 px-3">Roll Number</th>
                        <th className="py-2 px-3 text-right">Overall Grader Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 font-mono">
                      {topStudents.map((st, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2 px-3 text-center font-black text-slate-950">
                            {st.rank === 1 ? "🥇 1" : st.rank === 2 ? "🥈 2" : st.rank === 3 ? "🥉 3" : `4`}
                          </td>
                          <td className="py-2 px-3 font-sans font-bold text-slate-900">{st.name}</td>
                          <td className="py-2 px-3 text-slate-500">{st.roll}</td>
                          <td className="py-2 px-3 text-right text-emerald-800 font-bold">{st.score}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Batches and Dept Leaderboard */}
              <div className="lg:col-span-6 bg-white border border-slate-200 p-6 rounded-lg space-y-5 shadow-2xs">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Institutional Cohort Ranks
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Top Batches */}
                    <div className="border border-slate-150 rounded-lg p-4 bg-slate-50 space-y-3">
                      <span className="font-extrabold text-[9px] tracking-wider uppercase text-slate-450 block border-b border-slate-200 pb-1.5">
                        Top Academic Batches
                      </span>
                      <ol className="space-y-2 font-mono text-[10px]">
                        <li className="flex justify-between items-center">
                          <span>1. CSE Batch 2026</span>
                          <span className="font-bold text-emerald-800">82.4%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>2. ECE Batch 2026</span>
                          <span className="font-bold text-slate-700">76.2%</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>3. EEE Batch 2027</span>
                          <span className="font-bold text-slate-600">71.8%</span>
                        </li>
                      </ol>
                    </div>

                    {/* Top Departments */}
                    <div className="border border-slate-150 rounded-lg p-4 bg-slate-50 space-y-3">
                      <span className="font-extrabold text-[9px] tracking-wider uppercase text-slate-450 block border-b border-slate-200 pb-1.5">
                        Top Departments
                      </span>
                      <ol className="space-y-2 font-mono text-[10px]">
                        <li className="flex justify-between items-center">
                          <span>1. Computer Science</span>
                          <span className="font-bold text-emerald-800">95.6% pass</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>2. Electronics & Comm</span>
                          <span className="font-bold text-slate-700">89.4% pass</span>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>3. Electrical & Elect</span>
                          <span className="font-bold text-slate-600">82.1% pass</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
}
