"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Which programming languages are supported by the evaluation engine?",
      answer: "The platform features a secure compilation sandbox supporting C, C++, Java (OpenJDK 17), Python 3, JavaScript (Node.js), and Go. The compiler sandbox executes student solutions in isolated container nodes with strict CPU and execution time constraints, preventing any local file-system writes or unauthorized network requests."
    },
    {
      id: 2,
      question: "Can assessments be scheduled automatically for specific lab timetables?",
      answer: "Yes. Faculty members can schedule assessments down to the minute. You can configure automatic start/stop times, pre-allocate student slots based on IP subnets, restrict access to specific lab computers, and set grace periods for late entries (e.g., power cuts or system crashes)."
    },
    {
      id: 3,
      question: "How are students monitored during exams? What parameters trigger violations?",
      answer: "We use a multi-layered proctoring engine. It locks the browser tab in absolute fullscreen mode, blocking keyboard combinations (like Alt+Tab, Win, Ctrl+C/V). If a student attempts to resize the browser, switch focus, or connect a secondary display, the compiler issues an automated on-screen warning, logs a proctor incident with timestamps, and optionally pauses the workspace pending faculty approval."
    },
    {
      id: 4,
      question: "Is auto-evaluation supported? How do hidden test cases work?",
      answer: "Yes, our evaluation engine provides instant, automated grading. Faculty write test suites containing both visible test cases (for student runtime feedback) and hidden test cases (for grading security). The engine checks for functional correctness, runtime complexity, CPU usage, and memory overhead, immediately logging standard scores based on your customized rubrics."
    },
    {
      id: 5,
      question: "Can reports and transcripts be exported for NAAC/NBA accreditation dossiers?",
      answer: "Absolutely. All assessment data can be exported in secure PDF and CSV formats. Reports include comprehensive student-by-student analysis, rubric-level splits, compiler warning telemetry logs, question-wise failure frequencies, and outcome-based education (OBE) mapping indicators for academic compliance records."
    }
  ];

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 font-sans">
      {faqData.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div 
            key={item.id} 
            className="bg-white border border-slate-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-350 shadow-2xs"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full px-5 py-4.5 flex items-center justify-between text-left font-bold text-slate-900 text-xs md:text-sm hover:bg-slate-50/50 transition-all focus-ring"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                {item.question}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`} 
              />
            </button>

            <div 
              className={`transition-all duration-200 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
              }`}
            >
              <div className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50/30">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
