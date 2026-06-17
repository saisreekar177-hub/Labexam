"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadQuestions, saveQuestions, Question } from "@/lib/storage";
import { 
  Database, 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Copy, 
  Archive, 
  Trash2, 
  Table, 
  LayoutGrid, 
  ArrowLeft,
  X,
  FileSpreadsheet,
  TrendingUp,
  History,
  CheckCircle,
  HelpCircle,
  Menu,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import EmptyState from "@/components/empty-state";

export default function QuestionBank() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLang, setFilterLang] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterTopic, setFilterTopic] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Empty states selector
  const [emptyStateMode, setEmptyStateMode] = useState<"none" | "no-created" | "no-search">("none");

  // Modals visibility
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Mock Question Roster
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions on mount
  useEffect(() => {
    setQuestions(loadQuestions());
  }, []);

  // Actions
  const handleDuplicate = (q: Question) => {
    const dupe: Question = {
      ...q,
      id: Date.now().toString(),
      title: `${q.title} (Copy)`,
      lastUpdated: new Date().toISOString().split("T")[0],
      timesUsed: 0,
      avgScore: "N/A",
      successRate: "N/A",
      avgTime: "N/A",
      version: 1,
      createdDate: new Date().toISOString().split("T")[0]
    };
    const updated = [dupe, ...questions];
    setQuestions(updated);
    saveQuestions(updated);
  };

  const handleArchive = (id: string) => {
    const updated = questions.map(q => q.id === id ? { ...q, status: (q.status === "Active" ? "Archived" as const : "Active" as const) } : q);
    setQuestions(updated);
    saveQuestions(updated);
  };

  const handleDelete = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    setQuestions(updated);
    saveQuestions(updated);
  };

  // Filters application
  const filteredQuestions = questions.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLang = filterLang === "all" || q.language.toLowerCase() === filterLang.toLowerCase();
    const matchDiff = filterDifficulty === "all" || q.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    const matchTopic = filterTopic === "all" || q.topic.toLowerCase().replace(" ", "").includes(filterTopic.toLowerCase().replace(" ", ""));
    const matchStatus = filterStatus === "all" || q.status.toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchLang && matchDiff && matchTopic && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-xs text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link 
            href="/faculty/dashboard" 
            className="text-slate-500 hover:text-slate-800 transition-colors mr-2 p-1.5 hover:bg-slate-100 rounded-md focus-ring flex items-center gap-1.5 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Question Bank Management</h2>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-3 py-2 rounded-md flex items-center gap-1.5 transition-all focus-ring"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" /> Bulk Import
          </button>
          <Link 
            href="/faculty/question-bank/create"
            className="bg-navy-900 hover:bg-navy-950 text-white font-bold px-4 py-2 rounded-md flex items-center gap-1.5 transition-all focus-ring"
          >
            <Plus className="w-3.5 h-3.5" /> Create Question
          </Link>
        </div>
      </header>

      {/* Main Body content */}
      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6 flex-1">
        
        {/* State Toggle Selector for Preview */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-wrap gap-2 items-center justify-between">
          <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Empty State Preview Toggles:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button 
              onClick={() => setEmptyStateMode("none")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "none" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Default Populate
            </button>
            <button 
              onClick={() => setEmptyStateMode("no-created")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "no-created" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Empty: No Questions
            </button>
            <button 
              onClick={() => setEmptyStateMode("no-search")}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all ${
                emptyStateMode === "no-search" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-500"
              }`}
            >
              Empty: No Results
            </button>
          </div>
        </div>

        {emptyStateMode === "none" && (
          <>
            {/* Stats Dashboard row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs">
                <p className="text-slate-400 font-bold uppercase text-[9px]">Total Questions</p>
                <p className="text-2xl font-extrabold text-slate-950 mt-1">{questions.length}</p>
              </div>
              <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs">
                <p className="text-slate-400 font-bold uppercase text-[9px]">Easy Questions</p>
                <p className="text-2xl font-extrabold text-emerald-800 mt-1">
                  {questions.filter(q => q.difficulty === "Easy").length}
                </p>
              </div>
              <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs">
                <p className="text-slate-400 font-bold uppercase text-[9px]">Medium Questions</p>
                <p className="text-2xl font-extrabold text-amber-800 mt-1">
                  {questions.filter(q => q.difficulty === "Medium").length}
                </p>
              </div>
              <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs">
                <p className="text-slate-400 font-bold uppercase text-[9px]">Hard Questions</p>
                <p className="text-2xl font-extrabold text-rose-800 mt-1">
                  {questions.filter(q => q.difficulty === "Hard").length}
                </p>
              </div>
              <div className="bg-slate-900 text-white p-4 border border-slate-950 rounded-lg shadow-xs">
                <p className="text-slate-400 font-bold uppercase text-[9px]">Updated (30d)</p>
                <p className="text-2xl font-extrabold text-white mt-1">5 items</p>
              </div>
            </div>

            {/* Search and Filter Area */}
            <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search questions by title or topic..."
                    className="w-full text-slate-900 border border-slate-200 rounded-md pl-9 pr-3 py-2 focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>

                {/* View togglers */}
                <div className="flex bg-slate-100 p-0.5 rounded-md border border-slate-200 self-start md:self-auto">
                  <button 
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded transition-all ${viewMode === "table" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-400"}`}
                    aria-label="Switch to table view"
                  >
                    <Table className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode("card")}
                    className={`p-1.5 rounded transition-all ${viewMode === "card" ? "bg-white text-slate-950 shadow-2xs" : "text-slate-400"}`}
                    aria-label="Switch to card view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Filters list */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                {/* Language filter */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-500 uppercase text-[9px]">Language</label>
                  <select 
                    value={filterLang}
                    onChange={(e) => setFilterLang(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-hidden focus:ring-1 focus:ring-navy-900"
                  >
                    <option value="all">All Languages</option>
                    <option value="c">C</option>
                    <option value="c++">C++</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>
                </div>

                {/* Difficulty filter */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-500 uppercase text-[9px]">Difficulty</label>
                  <select 
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-hidden focus:ring-1 focus:ring-navy-900"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                {/* Topic filter */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-500 uppercase text-[9px]">Topic</label>
                  <select 
                    value={filterTopic}
                    onChange={(e) => setFilterTopic(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-hidden focus:ring-1 focus:ring-navy-900"
                  >
                    <option value="all">All Topics</option>
                    <option value="arrays">Arrays</option>
                    <option value="recursion">Recursion</option>
                    <option value="oop">OOP Concepts</option>
                    <option value="data structures">Data Structures</option>
                    <option value="algorithms">Algorithms</option>
                  </select>
                </div>

                {/* Status filter */}
                <div className="space-y-1">
                  <label className="block font-bold text-slate-500 uppercase text-[9px]">Status</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-hidden focus:ring-1 focus:ring-navy-900"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List viewport */}
            {filteredQuestions.length > 0 ? (
              viewMode === "table" ? (
                /* TABLE VIEW */
                <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                          <th className="py-3 px-4">Question Title</th>
                          <th className="py-3 px-4">Language</th>
                          <th className="py-3 px-4">Topic</th>
                          <th className="py-3 px-4 text-center">Marks</th>
                          <th className="py-3 px-4">Difficulty</th>
                          <th className="py-3 px-4">Last Updated</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {filteredQuestions.map((q) => (
                          <tr key={q.id} className="hover:bg-slate-50/50">
                            <td className="py-3 px-4">
                              <button 
                                onClick={() => setSelectedQuestion(q)}
                                className="font-bold text-slate-900 hover:text-navy-950 text-left hover:underline focus:outline-none"
                              >
                                {q.title}
                              </button>
                              {q.status === "Archived" && (
                                <span className="ml-2 bg-slate-100 text-slate-550 border border-slate-200 text-[8px] font-bold px-1 py-0.5 rounded">
                                  ARCHIVED
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-600">{q.language}</td>
                            <td className="py-3 px-4 text-slate-500 font-medium">{q.topic}</td>
                            <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">{q.marks} pts</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                q.difficulty === "Easy" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" :
                                q.difficulty === "Medium" ? "bg-amber-50 border border-amber-200 text-amber-800" :
                                "bg-rose-50 border border-rose-200 text-rose-800"
                              }`}>
                                {q.difficulty}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500 font-mono">{q.lastUpdated}</td>
                            <td className="py-3 px-4 text-right space-x-1">
                              <button 
                                onClick={() => setSelectedQuestion(q)}
                                className="text-slate-400 hover:text-slate-800 p-1 rounded hover:bg-slate-55"
                                title="View Usage & logs"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDuplicate(q)}
                                className="text-slate-400 hover:text-slate-800 p-1 rounded hover:bg-slate-55"
                                title="Duplicate"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleArchive(q.id)}
                                className="text-slate-400 hover:text-slate-800 p-1 rounded hover:bg-slate-55"
                                title={q.status === "Active" ? "Archive" : "Unarchive"}
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDelete(q.id)}
                                className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* CARD VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredQuestions.map((q) => (
                    <div key={q.id} className="academic-card flex flex-col justify-between h-full space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-slate-400">{q.language} • {q.topic}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            q.difficulty === "Easy" ? "bg-emerald-50 border border-emerald-200 text-emerald-800" :
                            q.difficulty === "Medium" ? "bg-amber-50 border border-amber-200 text-amber-800" :
                            "bg-rose-50 border border-rose-200 text-rose-800"
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mt-2">{q.title}</h4>
                        <div className="flex items-center gap-4 text-slate-500 font-medium text-[10px] pt-1">
                          <span>Allocation: <span className="font-bold text-slate-800">{q.marks} Marks</span></span>
                          <span>•</span>
                          <span>Usage: <span className="font-bold text-slate-850">{q.timesUsed} Exams</span></span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Updated: {q.lastUpdated}</span>
                        <div className="space-x-1">
                          <button 
                            onClick={() => setSelectedQuestion(q)}
                            className="text-slate-400 hover:text-slate-800 p-1 hover:bg-slate-55 rounded"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDuplicate(q)}
                            className="text-slate-400 hover:text-slate-800 p-1 hover:bg-slate-55 rounded"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(q.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 hover:bg-rose-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              /* EMPTY STATE: NO SEARCH RESULTS */
              <EmptyState
                title="No Search Results Matches"
                description="We couldn't find any questions matching your active search queries or select dropdown filters."
                secondaryDescription="Try clearing your filters or resetting the search text."
                icon={Search}
                actionLabel="Clear Search Filter"
                onAction={() => {
                  setSearchQuery("");
                  setFilterLang("all");
                  setFilterDifficulty("all");
                  setFilterTopic("all");
                  setFilterStatus("all");
                }}
              />
            )}
          </>
        )}

        {/* TAB EMPTY 1: NO QUESTIONS CREATED */}
        {emptyStateMode === "no-created" && (
          <EmptyState
            title="No Questions in Bank"
            description="Your college's departmental question bank is currently empty. Build assessments and practical sheets by authoring questions."
            secondaryDescription="Write problem statements, add compile constraints, and upload hidden test case files."
            icon={Database}
            actionLabel="Create First Question"
            onAction={() => router.push("/faculty/question-bank/create")}
          />
        )}

        {/* TAB EMPTY 2: NO SEARCH RESULTS */}
        {emptyStateMode === "no-search" && (
          <EmptyState
            title="No Search Matches"
            description="No programming question files match the selected filtration tags or query string."
            secondaryDescription="Reset the filters to view the full departmental repository list."
            icon={Filter}
            actionLabel="Reset Search Parameters"
            onAction={() => {
              setSearchQuery("");
              setFilterLang("all");
              setFilterDifficulty("all");
              setFilterTopic("all");
              setFilterStatus("all");
              setEmptyStateMode("none");
            }}
          />
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL SHEET 1: BULK IMPORT CSV */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => setShowImportModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"></div>
          <div className="bg-white border border-slate-200 rounded-lg shadow-2xl max-w-md w-full relative z-[101] overflow-hidden flex flex-col font-sans">
            
            <button 
              onClick={() => setShowImportModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-650 p-1 hover:bg-slate-100 rounded"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="px-6 pt-6 pb-4 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-navy-800 tracking-wider uppercase">CSV Bulk Uploader</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Import Questions Spreadsheet</h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Quickly add multiple coding questions at once by uploading an institutional CSV file structure.
              </p>

              {/* Mock upload dropzone */}
              <div 
                onClick={() => alert("Simulation: File upload triggered. Loaded template.csv - 4 questions parsed.")}
                className="border-2 border-dashed border-slate-200 hover:border-slate-350 bg-slate-50 rounded-lg p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center"
              >
                <FileSpreadsheet className="w-8 h-8 text-slate-400 mb-2" />
                <p className="font-bold text-slate-700 text-xs">Drag and drop your CSV file here</p>
                <p className="text-[10px] text-slate-400 mt-1">or click to browse local folders</p>
              </div>

              {/* Template details */}
              <div className="bg-slate-50 p-3 rounded border border-slate-150 space-y-1.5 text-[10px] text-slate-600">
                <p className="font-bold text-slate-800 uppercase tracking-wider">Required CSV Columns Schema:</p>
                <p className="font-mono text-slate-500">
                  Title, Language, Difficulty, Topic, Marks, ProblemStatement, InputFormat, OutputFormat, Constraints, TestCasesJson
                </p>
                <button 
                  onClick={() => alert("Simulation: Downloading CSV Template.")}
                  className="text-navy-900 font-bold hover:underline block pt-1"
                >
                  Download CSV Schema Template (.csv)
                </button>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-md font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Simulation: Imported 4 questions into the bank.");
                  setShowImportModal(false);
                }}
                className="px-4 py-2 bg-navy-900 hover:bg-navy-950 text-white rounded-md font-bold"
              >
                Start Parse & Upload
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER SHEET 2: QUESTION DETAILS - ANALYTICS & HISTORY */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div onClick={() => setSelectedQuestion(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"></div>
          
          <div className="w-full max-w-md bg-white h-full relative z-10 shadow-2xl flex flex-col justify-between font-sans border-l border-slate-200">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div>
                <span className="text-[9px] font-bold text-navy-800 uppercase tracking-wider">Question Inspector</span>
                <h3 className="text-base font-bold text-slate-950 mt-1 truncate max-w-[280px]">{selectedQuestion.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedQuestion(null)}
                className="p-1 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Usage analytics section */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <TrendingUp className="w-4 h-4 text-slate-500" /> Usage Analytics
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded border border-slate-150">
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Assessments Used</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">{selectedQuestion.timesUsed}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-150">
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Success Rate</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">{selectedQuestion.successRate}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-150">
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Avg Completion Time</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">{selectedQuestion.avgTime}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded border border-slate-150">
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Avg Student Score</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1 text-emerald-700">{selectedQuestion.avgScore}</p>
                  </div>
                </div>
              </div>

              {/* Version History section */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <History className="w-4 h-4 text-slate-500" /> Version History
                </h4>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-navy-900 mt-1.5 relative">
                      <div className="absolute top-1.5 bottom-[-24px] left-[2px] w-[1px] bg-slate-200"></div>
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Version {selectedQuestion.version}.0</span>
                        <span className="text-[9px] bg-slate-100 px-1 rounded text-slate-500 font-medium">Latest</span>
                      </div>
                      <p className="text-slate-500 mt-0.5">Updated by {selectedQuestion.createdBy} on {selectedQuestion.lastUpdated}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5"></div>
                    <div className="text-xs text-slate-400">
                      <p className="font-bold text-slate-500">Version 1.0</p>
                      <p className="text-[11px] mt-0.5">Created by {selectedQuestion.createdBy} on {selectedQuestion.createdDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Syllabus mapping */}
              <div className="bg-slate-50 p-4 border border-slate-150 rounded-lg space-y-1.5 text-[11px]">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[9px]">Syllabus Mapping Outcome:</p>
                <p className="text-slate-600 leading-normal">
                  This question matches core Course Outcomes (CO) mapping for **Algorithm Design and Implementation Correctness** certifications.
                </p>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="w-full bg-navy-900 hover:bg-navy-950 text-white font-bold py-2 rounded-md text-center focus-ring"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
