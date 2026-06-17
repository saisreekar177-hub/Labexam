"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Play, 
  Send, 
  Clock, 
  AlertOctagon, 
  Code2, 
  CheckCircle2, 
  XCircle, 
  Terminal,
  Maximize2,
  ChevronRight,
  ShieldAlert,
  ArrowLeft
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TestCase {
  id: number;
  input: string;
  expected: string;
  actual?: string;
  status: "passed" | "failed" | "unrun";
  isHidden: boolean;
}

interface MockQuestion {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  marks: number;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  codeBoilerplate: {
    cpp: string;
    java: string;
    python: string;
  };
}

export default function StudentExamWorkspace({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  // Mock Exam details
  const examData = {
    id: id || "1",
    name: id === "1" ? "Data Structures Practical Lab Exam" :
          id === "2" ? "Object Oriented Programming Laboratory" :
          "CS101 Programming Foundations Examination",
    subject: id === "1" ? "CS201" : id === "2" ? "IT305" : "CS101",
    duration: id === "1" ? 180 : id === "2" ? 120 : 120,
    totalMarks: id === "1" ? 50 : id === "2" ? 40 : 50
  };

  // List of mock questions matching this exam
  const examQuestions: MockQuestion[] = [
    {
      id: "q1",
      title: "Invert a Binary Tree",
      difficulty: "Medium",
      topic: "Data Structures",
      marks: 15,
      description: "Given the root of a binary tree, invert the tree, and return its root. Inverting a binary tree means exchanging left and right subtrees of every node.",
      inputFormat: "First line contains N, the number of nodes. Next line contains node values in level-order traversal format.",
      outputFormat: "Output the level-order traversal array of the inverted binary tree.",
      constraints: "Number of nodes in the tree is in range [0, 1000].\nNode values range from -100 to 100.",
      sampleInput: "4 2 7 1 3 6 9",
      sampleOutput: "4 7 2 9 6 3 1",
      codeBoilerplate: {
        cpp: `// Language: C++17\n#include <iostream>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nTreeNode* invertTree(TreeNode* root) {\n    // Write your code here\n    if (root == NULL) return NULL;\n    TreeNode* temp = root->left;\n    root->left = invertTree(root->right);\n    root->right = invertTree(temp);\n    return root;\n}`,
        java: `// Language: Java (OpenJDK 17)\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Write your code here\n        if (root == null) return null;\n        TreeNode temp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(temp);\n        return root;\n    }\n}`,
        python: `# Language: Python 3.10\nclass Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        # Write your code here\n        if not root:\n            return None\n        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n        return root`
      }
    },
    {
      id: "q2",
      title: "Validate Binary Search Tree",
      difficulty: "Medium",
      topic: "Data Structures",
      marks: 15,
      description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
      inputFormat: "First line contains N, the number of nodes. Next line contains node values in level-order traversal.",
      outputFormat: "Output 'true' if the tree is a valid BST, otherwise output 'false'.",
      constraints: "Number of nodes is in range [1, 10000].\nNode values range from -2^31 to 2^31 - 1.",
      sampleInput: "2 1 3",
      sampleOutput: "true",
      codeBoilerplate: {
        cpp: `// Language: C++17\n#include <iostream>\nusing namespace std;\n\nbool isValidBST(TreeNode* root) {\n    // Write your code here\n    return true;\n}`,
        java: `// Language: Java (OpenJDK 17)\nclass Solution {\n    public boolean isValidBST(TreeNode root) {\n        // Write your code here\n        return true;\n    }\n}`,
        python: `# Language: Python 3.10\nclass Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        # Write your code here\n        return True`
      }
    }
  ];

  // Active workspace state
  const [selectedQuestion, setSelectedQuestion] = useState<MockQuestion>(examQuestions[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<"cpp" | "java" | "python">("python");
  const [codeContent, setCodeContent] = useState(examQuestions[0].codeBoilerplate.python);
  const [timerString, setTimerString] = useState(examData.id === "1" ? "02:59:45" : "01:59:45");
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "Editor initialized. Node sandbox connection secure.",
    "Ready to run compile test suits."
  ]);
  
  // Proctor alerts state
  const [warningsCount, setWarningsCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: "root = [4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]", status: "unrun", isHidden: false },
    { id: 2, input: "root = [2,1,3]", expected: "[2,3,1]", status: "unrun", isHidden: false },
    { id: 3, input: "[Hidden System Test Case]", expected: "[Output Verification Hash Verified]", status: "unrun", isHidden: true }
  ]);

  // Synchronize boilerplate code when switching languages/questions
  const handleQuestionChange = (q: MockQuestion) => {
    setSelectedQuestion(q);
    const boilerplate = q.codeBoilerplate[selectedLanguage] || q.codeBoilerplate.python;
    setCodeContent(boilerplate);
    setConsoleOutput([`Question switched to: "${q.title}". Editor ready.`]);
    setTestCases(prev => prev.map(tc => ({ ...tc, status: "unrun" })));
  };

  const handleLanguageChange = (lang: "cpp" | "java" | "python") => {
    setSelectedLanguage(lang);
    const boilerplate = selectedQuestion.codeBoilerplate[lang];
    setCodeContent(boilerplate);
    setConsoleOutput([`Language compiler switched to: ${lang === "cpp" ? "C++17" : lang === "java" ? "Java 17" : "Python 3.10"}`]);
  };

  // Timer countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimerString(prev => {
        const parts = prev.split(":").map(Number);
        let sec = parts[2];
        let min = parts[1];
        let hr = parts[0];

        sec--;
        if (sec < 0) {
          sec = 59;
          min--;
          if (min < 0) {
            min = 59;
            hr--;
          }
        }
        if (hr < 0) {
          clearInterval(timer);
          alert("Time's up! Your answers are automatically compiled and submitted.");
          router.push("/student/dashboard");
          return "00:00:00";
        }

        const pad = (n: number) => String(n).padStart(2, "0");
        return `${pad(hr)}:${pad(min)}:${pad(sec)}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Listen for window resize or tab switch to trigger proctor violations
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        triggerProctorWarning();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        triggerProctorWarning();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [warningsCount]);

  const triggerProctorWarning = () => {
    if (showSuspendModal) return;
    
    const nextCount = warningsCount + 1;
    setWarningsCount(nextCount);
    
    if (nextCount >= 3) {
      setShowSuspendModal(true);
      setShowWarningModal(false);
    } else {
      setShowWarningModal(true);
    }
  };

  // Mock code compile and run execution
  const handleRunCode = () => {
    setIsRunning(true);
    setShowConsole(true);
    setConsoleOutput([
      "[1/3] Uploading source files to sandbox compiler nodes...",
      "[2/3] Compiling solution code output...",
      "[3/3] Executing verification test suites..."
    ]);
    
    setTimeout(() => {
      setIsRunning(false);
      setConsoleOutput(prev => [
        ...prev,
        `✓ Test Case 1: PASSED [OK]`,
        `✓ Test Case 2: PASSED [OK]`,
        `⚙ System Hidden Case 3: Outputs Hash verified`,
        `-----------------------------`,
        `STATUS: RUN COMPLETED SUCCESSFULLY`,
        `Grade: Full Points (${selectedQuestion.marks} / ${selectedQuestion.marks} pts)`
      ]);
      setTestCases(prev => prev.map(tc => ({ ...tc, status: "passed" })));
    }, 1500);
  };

  const handleManualFullscreenRestore = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      alert("Browser fullscreen locking blocked. Please confirm fullscreen permissions.");
    }
  };

  const handleSubmitAssessment = () => {
    const confirmSubmit = window.confirm("Are you sure you want to finalize and submit this assessment? This will lock all edits.");
    if (confirmSubmit) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      alert("Practical lab assessment submitted successfully! Your code has been registered on the grader database.");
      router.push("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-mono text-xs select-none">
      
      {/* Lockdown Security Header Bar */}
      <div className="bg-rose-950/80 px-5 py-2 border-b border-rose-900 flex items-center justify-between text-rose-200 text-[10px]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="font-extrabold tracking-widest uppercase">Secure Proctor Mode Active</span>
        </div>
        
        <div className="flex items-center gap-3 font-sans font-bold">
          <span className="bg-rose-900/60 border border-rose-800 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-rose-300">
            Node: PSG-LAN-104
          </span>
          <button 
            onClick={triggerProctorWarning}
            className="text-rose-400 hover:text-rose-300 hover:underline"
          >
            [Simulate Tab Switch Alert]
          </button>
        </div>
      </div>

      {/* Editor Navigation Info bar */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-extrabold text-[9px] uppercase tracking-widest">Practical Exam</span>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <span className="text-white font-extrabold font-sans text-xs flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-blue-400 font-mono" />
            {examData.subject}_{examData.name.replace(/\s+/g, "_").toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-6 font-sans">
          {/* Remaining Timer */}
          <div className="flex items-center gap-2 font-medium">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-400 font-bold text-[10px] uppercase">Time Remaining:</span>
            <span className="font-mono text-emerald-500 font-extrabold bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-sm">
              {timerString}
            </span>
          </div>

          <div className="text-slate-400 text-[10px] border-l border-slate-800 pl-4 font-mono font-bold">
            Candidate: <span className="text-white">Aditya Verma (22CSE102)</span>
          </div>
        </div>
      </div>

      {/* IDE Editor Workspace Body */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        
        {/* Left Side: Dynamic Question sheet */}
        <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-950">
          
          {/* Question selection Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/60 font-sans font-bold">
            {examQuestions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => handleQuestionChange(q)}
                className={`px-4 py-2.5 border-r border-slate-800 transition-all text-[10px] uppercase ${
                  selectedQuestion.id === q.id 
                    ? "bg-slate-950 border-t border-t-blue-500 text-white font-extrabold" 
                    : "text-slate-400 hover:text-slate-350"
                }`}
              >
                Q{index + 1}: {q.title}
              </button>
            ))}
          </div>

          {/* Description workspace */}
          <div className="p-5 space-y-5 overflow-y-auto flex-1 font-sans text-slate-300 leading-relaxed text-[11px]">
            <div className="flex justify-between items-center text-[10px]">
              <span className="bg-amber-950/80 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                Difficulty: {selectedQuestion.difficulty} • {selectedQuestion.marks} pts
              </span>
              <span className="text-slate-500 font-mono font-bold">TOPIC: {selectedQuestion.topic}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-extrabold text-xs font-mono uppercase tracking-wider">Problem Statement</h4>
              <p>{selectedQuestion.description}</p>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-3 font-mono text-[10px]">
              <div>
                <p className="text-slate-400 font-bold">Sample Input:</p>
                <pre className="bg-slate-950 border border-slate-850 p-2 rounded text-slate-300 mt-1">{selectedQuestion.sampleInput}</pre>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Sample Output:</p>
                <pre className="bg-slate-950 border border-slate-850 p-2 rounded text-slate-300 mt-1">{selectedQuestion.sampleOutput}</pre>
              </div>
            </div>

            <div className="space-y-2 font-mono text-[10px]">
              <h4 className="text-white font-bold font-sans uppercase">Constraints</h4>
              <pre className="bg-slate-900/40 p-2 border border-slate-850 rounded text-slate-400 whitespace-pre-wrap">{selectedQuestion.constraints}</pre>
            </div>
          </div>

        </div>

        {/* Right Side: IDE Editor Textarea & compiler output */}
        <div className="w-full lg:w-7/12 flex flex-col bg-slate-900">
          
          {/* IDE Menu Options */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-sans font-bold">Compiler:</span>
              <select 
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-0.5 rounded font-mono focus:ring-1 focus:ring-blue-500 outline-hidden font-bold"
              >
                <option value="python">Python 3.10</option>
                <option value="java">Java (OpenJDK 17)</option>
                <option value="cpp">C++17 (G++ 9.2)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 font-sans text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 font-semibold">Compiler Sandbox Node-104 Secured</span>
            </div>
          </div>

          {/* IDE Editor Pane */}
          <div className="flex-1 p-4 bg-slate-950/40 relative font-mono text-xs overflow-hidden">
            <textarea 
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              className="w-full h-[320px] bg-transparent text-slate-250 resize-none outline-hidden font-mono leading-relaxed"
              style={{ tabSize: 4 }}
            />
            
            <div className="absolute bottom-2 right-2 text-slate-500 bg-slate-900/80 px-2.5 py-1 rounded text-[9px] border border-slate-800 font-sans font-bold uppercase tracking-wider">
              Clipboard Locks Active
            </div>
          </div>

          {/* Test cases result preview */}
          <div className="px-4 py-3 bg-slate-950 border-t border-slate-850">
            <p className="text-slate-400 mb-2 text-[9px] uppercase font-bold tracking-wider font-sans">Verification Test Cases</p>
            
            <div className="grid grid-cols-3 gap-2">
              {testCases.map((tc, idx) => (
                <div 
                  key={tc.id} 
                  className={`p-2 rounded border flex flex-col justify-between ${
                    tc.status === "passed"
                      ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                      : "bg-slate-900 border-slate-850 text-slate-400"
                  }`}
                >
                  <span className="text-[8px] uppercase tracking-wide text-slate-500 font-bold font-sans">
                    {tc.isHidden ? "Hidden Case" : `Case ${idx + 1}`}
                  </span>
                  <div className="flex items-center justify-between mt-1 text-[9px]">
                    <span className="truncate max-w-[90px] font-mono">
                      {tc.isHidden ? "Secure validation" : tc.input}
                    </span>
                    {tc.status === "passed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compile Terminal Console logs */}
          {showConsole && (
            <div className="bg-slate-950 border-t border-slate-800 p-4 max-h-[140px] overflow-y-auto">
              <p className="text-slate-400 font-bold text-[9px] mb-1.5 uppercase flex items-center gap-1.5 border-b border-slate-900 pb-1">
                <Terminal className="w-3.5 h-3.5 text-blue-500" /> Sandboxed Compiler Output logs
              </p>
              <div className="space-y-0.5 text-slate-300 text-[10px]">
                {consoleOutput.map((log, index) => (
                  <p key={index} className={log.includes("✓") || log.includes("STATUS: RUN") ? "text-emerald-400 font-bold" : ""}>
                    {log}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* IDE Bottom actions */}
          <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => setShowConsole(!showConsole)}
              className="text-slate-400 hover:text-white px-2 py-1.5 rounded transition-all text-xs font-semibold flex items-center gap-1 font-sans"
            >
              <Terminal className="w-3.5 h-3.5" />
              Terminal Logs
            </button>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleRunCode}
                disabled={isRunning}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 px-4 py-2 rounded-md font-bold transition-all flex items-center gap-1.5 font-sans"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? "Running Compiler..." : "Run Test Cases"}
              </button>
              <button 
                onClick={handleSubmitAssessment}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold transition-all flex items-center gap-1.5 font-sans"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Code Paper
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Warning Popup Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-950 max-w-sm w-full rounded-lg shadow-xl overflow-hidden border border-rose-200">
            <div className="bg-rose-600 px-4 py-3 text-white flex items-center gap-2 font-sans">
              <AlertOctagon className="w-5 h-5 animate-bounce" />
              <h5 className="font-extrabold text-sm tracking-tight">PROCTOR INTEGRITY WARNING</h5>
            </div>
            
            <div className="p-5 space-y-4 font-sans leading-relaxed text-xs">
              <p className="font-bold text-slate-800">
                A secure browser window violation was detected!
              </p>
              
              <p className="text-slate-600">
                You unfocused the browser window or toggled browser tabs. The sandboxed compiler logs this activity immediately.
              </p>
              
              <div className="bg-rose-50 border border-rose-250 p-3 rounded font-mono font-bold flex justify-between items-center text-[10px] text-rose-800">
                <span>TOTAL REGISTERED VIOLATIONS:</span>
                <span>{warningsCount} / 3</span>
              </div>
              
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded text-slate-500 font-medium text-[9px]">
                * 3 total violations will automatically submit your active solutions and lock your terminal session.
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleManualFullscreenRestore}
                  className="flex-1 bg-white hover:bg-slate-100 border border-slate-250 text-slate-800 py-2 rounded-md font-bold text-xs transition-all flex items-center justify-center gap-1"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-slate-600" /> Reset Fullscreen
                </button>
                <button
                  onClick={() => setShowWarningModal(false)}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-md font-bold text-xs transition-all uppercase"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disqualified / Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-slate-950 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-950 max-w-md w-full rounded-lg shadow-2xl overflow-hidden border border-rose-300">
            <div className="bg-rose-700 px-5 py-4 text-white flex items-center gap-2 font-sans">
              <AlertOctagon className="w-6 h-6 shrink-0" />
              <h5 className="font-extrabold text-base tracking-tight">TERMINAL ACCOUNT SUSPENDED</h5>
            </div>
            
            <div className="p-6 space-y-4 font-sans leading-relaxed text-xs">
              <p className="font-bold text-slate-900 text-sm">
                Exam Blocked Due to Proctor Violations
              </p>
              
              <p className="text-slate-650">
                Your practical exam node session has been auto-submitted and locked because the tab switch threshold ({warningsCount} violations) was reached. 
              </p>
              
              <div className="bg-rose-50 border border-rose-250 p-4 rounded font-mono text-[10px] text-rose-800 leading-normal space-y-1">
                <p className="font-bold uppercase border-b border-rose-200/50 pb-1 mb-1">Violation Logs:</p>
                <p>• Client IP: 192.168.12.104</p>
                <p>• Total tab-switch violations: {warningsCount} detected</p>
                <p>• Action: Sandbox locked, active code files submitted.</p>
              </div>
              
              <p className="text-slate-500 font-medium">
                To unlock your node session, contact your exam supervisor at the computer laboratory main desk.
              </p>

              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  router.push("/student/dashboard");
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-md font-bold text-xs transition-all uppercase tracking-wide"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
