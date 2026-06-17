"use client";

import React, { useState, useEffect } from "react";
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
  ShieldAlert
} from "lucide-react";

interface TestCase {
  id: number;
  input: string;
  expected: string;
  actual?: string;
  status: "passed" | "failed" | "unrun";
  isHidden: boolean;
}

export default function StudentExperienceMockup() {
  const [selectedLanguage, setSelectedLanguage] = useState<"cpp" | "java" | "python">("cpp");
  const [timerString, setTimerString] = useState("01:29:45");
  const [isRunning, setIsRunning] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [warningsCount, setWarningsCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: "root = [4,2,7,1,3,6,9]", expected: "[4,7,2,9,6,3,1]", status: "unrun", isHidden: false },
    { id: 2, input: "root = [2,1,3]", expected: "[2,3,1]", status: "unrun", isHidden: false },
    { id: 3, input: "root = []", expected: "[]", status: "unrun", isHidden: false },
    { id: 4, input: "[Hidden System Test Case]", expected: "[Output Verification Hash Verified]", status: "unrun", isHidden: true }
  ]);

  // Code templates
  const codeTemplates = {
    cpp: `// Language: C++17
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == NULL) return NULL;
        
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        
        return root;
    }
};`,
    java: `// Language: Java (OpenJDK 17)
class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        
        return root;
    }
}`,
    python: `# Language: Python 3.10
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
            
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`
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

        const pad = (n: number) => String(n).padStart(2, "0");
        return `${pad(hr)}:${pad(min)}:${pad(sec)}`;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRunCode = () => {
    setIsRunning(true);
    setShowConsole(true);
    setConsoleOutput(["[1/3] Compiling solution...", "[2/3] Linking objects...", "[3/3] Running solution against test suites..."]);
    
    setTimeout(() => {
      setConsoleOutput(prev => [
        ...prev,
        "✓ Test Case 1: Passed",
        "✓ Test Case 2: Passed",
        "✓ Test Case 3: Passed",
        "⚙ Hidden System Test Case 4: Output Hash Matched",
        "",
        "Status: SUCCESS",
        "Execution Time: 4ms",
        "Memory Usage: 4.2 MB"
      ]);
      setTestCases(prev => prev.map(tc => ({ ...tc, status: "passed" })));
      setIsRunning(false);
    }, 1500);
  };

  const simulateTabSwitch = () => {
    setWarningsCount(prev => prev + 1);
    setShowWarningModal(true);
  };

  return (
    <div className="w-full bg-slate-900 text-slate-100 border border-slate-800 rounded-xl overflow-hidden flex flex-col font-mono text-xs shadow-xl relative select-none">
      
      {/* Locked Screen Security Bar */}
      <div className="bg-rose-950/80 px-4 py-2 border-b border-rose-800 flex items-center justify-between text-rose-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          <span className="font-semibold tracking-wide">SECURE ASSESSMENT LOCKDOWN ENABLED</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-rose-900/60 border border-rose-800 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-rose-300">
            Window Locked (Fullscreen)
          </span>
          <button 
            onClick={simulateTabSwitch}
            className="hover:underline text-[10px] text-rose-400 font-bold"
          >
            [Simulate Tab Switch Alert]
          </button>
        </div>
      </div>

      {/* Editor Main Menu Navigation */}
      <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-[10px] tracking-wider uppercase font-bold">Practical Examination</span>
          <span className="text-white font-semibold flex items-center gap-1.5 font-sans">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            CS201_DS_LAB_MID_EXAM
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Active Timer */}
          <div className="flex items-center gap-2 text-slate-300 font-sans font-medium">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span>Time Remaining:</span>
            <span className="font-mono text-emerald-500 font-bold bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              {timerString}
            </span>
          </div>

          <div className="text-slate-400 font-sans text-[11px]">
            Candidate ID: <span className="font-bold text-white font-mono">22CSE104</span>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex flex-col lg:flex-row min-h-[440px]">
        {/* Left Side: Question Pane */}
        <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col bg-slate-950">
          
          {/* Tabs for Question / Testcases */}
          <div className="flex border-b border-slate-800 bg-slate-900/60">
            <span className="px-4 py-2 bg-slate-950 border-r border-slate-800 border-t border-t-blue-500 text-white font-semibold font-sans">
              1. Invert Binary Tree
            </span>
            <span className="px-4 py-2 text-slate-500 cursor-not-allowed font-sans">
              2. Validate BST (Locked)
            </span>
          </div>

          {/* Description */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[360px] flex-1 font-sans text-slate-300 leading-relaxed">
            <div className="flex justify-between items-center text-xs">
              <span className="bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">
                Medium • 15 Marks
              </span>
              <span className="text-slate-500 font-mono">Category: Trees</span>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-2 font-mono">Problem Statement</h4>
              <p>
                Given the <code className="bg-slate-900 border border-slate-800 text-slate-300 px-1 rounded font-mono">root</code> of a binary tree, invert the tree, and return its root.
              </p>
            </div>

            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-3 font-mono text-[11px]">
              <div>
                <p className="text-slate-400 font-bold">Example 1:</p>
                <div className="mt-1 pl-2 border-l border-slate-700 space-y-0.5 text-slate-300">
                  <p><span className="text-slate-500">Input:</span> root = [4,2,7,1,3,6,9]</p>
                  <p><span className="text-slate-500">Output:</span> [4,7,2,9,6,3,1]</p>
                </div>
              </div>
              <div>
                <p className="text-slate-400 font-bold">Example 2:</p>
                <div className="mt-1 pl-2 border-l border-slate-700 space-y-0.5 text-slate-300">
                  <p><span className="text-slate-500">Input:</span> root = [2,1,3]</p>
                  <p><span className="text-slate-500">Output:</span> [2,3,1]</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-1 font-mono">Constraints</h4>
              <ul className="list-disc pl-4 space-y-1 text-slate-400 font-mono text-[11px]">
                <li>The number of nodes in the tree is in the range [0, 100].</li>
                <li>-100 &lt;= Node.val &lt;= 100</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: IDE & Workspace */}
        <div className="w-full lg:w-7/12 flex flex-col bg-slate-900">
          {/* Workspace Menu */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Compiler:</span>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded font-sans text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="cpp">C++17 (GCC 9.2)</option>
                <option value="java">Java (OpenJDK 17)</option>
                <option value="python">Python (3.10.2)</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-slate-400">Sandbox Compile Server Connected</span>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 p-4 bg-slate-950/40 relative font-mono text-xs overflow-hidden">
            <textarea
              value={codeTemplates[selectedLanguage]}
              readOnly
              className="w-full h-[280px] bg-transparent text-slate-300 resize-none outline-none font-mono leading-relaxed"
            />
            
            {/* Copy paste block notice overlay */}
            <div className="absolute bottom-2 right-2 text-slate-500 bg-slate-900/80 px-2 py-1 rounded text-[10px] border border-slate-800">
              * Copy Paste Restrictions Activated
            </div>
          </div>

          {/* Test Case Status Details */}
          <div className="px-4 py-3 bg-slate-950 border-t border-slate-800">
            <p className="text-slate-400 mb-2 text-[10px] uppercase font-bold tracking-wider">Evaluation Test Suites</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {testCases.map((tc) => (
                <div 
                  key={tc.id} 
                  className={`p-2 rounded border flex flex-col justify-between ${
                    tc.status === "passed"
                      ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wide text-slate-500 font-bold">
                    {tc.isHidden ? "Hidden Test" : `Case ${tc.id}`}
                  </span>
                  <div className="flex items-center justify-between mt-1 text-[10px]">
                    <span className="truncate max-w-[70px]">
                      {tc.isHidden ? "Hash-check" : tc.input}
                    </span>
                    {tc.status === "passed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Console Output Log */}
          {showConsole && (
            <div className="bg-slate-950 border-t border-slate-800 p-3 max-h-[140px] overflow-y-auto">
              <p className="text-slate-400 font-bold text-[10px] mb-1.5 uppercase flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-500" /> Sandbox Compilation Terminal
              </p>
              <div className="space-y-0.5 text-slate-300 text-[10px]">
                {consoleOutput.map((out, idx) => (
                  <p key={idx} className={out.startsWith("✓") || out.startsWith("Status") ? "text-emerald-400 font-bold" : ""}>
                    {out}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 flex items-center justify-between">
            <button 
              onClick={() => setShowConsole(!showConsole)}
              className="text-slate-400 hover:text-white px-2 py-1.5 rounded transition-all text-xs font-semibold flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              Console Logs
            </button>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleRunCode}
                disabled={isRunning}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 px-4 py-2 rounded-md font-semibold transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isRunning ? "Running..." : "Run Test Cases"}
              </button>
              <button 
                onClick={() => alert("Simulation: Solution submitted for grading node.")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Solution
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Proctor Violation Simulated Modal */}
      {showWarningModal && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-900 max-w-sm w-full rounded-lg shadow-xl overflow-hidden border border-rose-200">
            <div className="bg-rose-600 px-4 py-3 text-white flex items-center gap-2">
              <AlertOctagon className="w-5 h-5" />
              <h5 className="font-bold text-sm font-sans">PROCTOR INTEGRITY WARNING</h5>
            </div>
            <div className="p-4 space-y-3 font-sans text-xs">
              <p className="font-semibold text-slate-800">
                A system violation was detected!
              </p>
              <p className="text-slate-600">
                You unfocused the browser window or toggled tabs. Your session telemetry has logged this activity. The exam coordinator has been notified.
              </p>
              <div className="bg-rose-50 border border-rose-200 p-2.5 rounded text-rose-800 font-mono font-bold flex justify-between items-center text-[10px]">
                <span>TOTAL WARNINGS REGISTERED:</span>
                <span>{warningsCount} / 3</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                * Accumulating 3 violations will automatically suspend your exam workspace.
              </p>
              <button
                onClick={() => setShowWarningModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-md font-semibold text-xs transition-all uppercase tracking-wide mt-2"
              >
                Acknowledge Warning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
