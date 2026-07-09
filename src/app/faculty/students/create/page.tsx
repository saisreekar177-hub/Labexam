"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, User, Mail, Phone, BookOpen, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/auth-layout";
import { loadStudents, saveStudents } from "@/lib/storage";

export default function AddStudent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form inputs
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("CSE");
  const [year, setYear] = useState("3rd Year");
  const [section, setSection] = useState("A");
  
  // Account credentials (reactive)
  const [username, setUsername] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  // Sync username and password based on roll number
  useEffect(() => {
    const cleanRoll = rollNumber.trim().toUpperCase();
    if (cleanRoll) {
      setUsername(cleanRoll.toLowerCase());
      setTempPassword(`Gouthami@${cleanRoll}`);
      setEmail(`${cleanRoll.toLowerCase()}@gouthamitmw.edu`);
    } else {
      setUsername("");
      setTempPassword("");
      setEmail("");
    }
  }, [rollNumber]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!rollNumber.trim()) newErrors.rollNumber = "Roll number is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Official email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobile.replace(/\D/g, "").match(/^\d{10}$/)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!section.trim()) newErrors.section = "Section is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setIsLoading(true);

    // Save student details
    setTimeout(() => {
      const storageStudent = {
        id: Date.now().toString(),
        roll: rollNumber.toUpperCase(),
        name: fullName,
        email: email,
        dept: department,
        year: year,
        section: section,
        status: "Active" as const,
        lastLogin: "Never Logged In"
      };

      const allStudents = [storageStudent, ...loadStudents()];
      saveStudents(allStudents);

      setIsLoading(false);
      alert(`Student ${fullName} (${rollNumber.toUpperCase()}) registered successfully.`);
      router.push("/faculty/students");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none text-xs text-slate-800">
      
      {/* Header bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link 
            href="/faculty/students" 
            className="text-slate-500 hover:text-slate-800 transition-colors mr-2 p-1.5 hover:bg-slate-100 rounded-md focus-ring flex items-center gap-1.5 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Roster
          </Link>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Add Single Student Profile</h2>
        </div>

        <button 
          onClick={handleCreate}
          disabled={isLoading}
          className="bg-navy-900 hover:bg-navy-950 text-white font-bold px-4 py-2 rounded-md flex items-center gap-1.5 transition-all focus-ring"
        >
          {isLoading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Registering...
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" /> Register Student
            </>
          )}
        </button>
      </header>

      {/* Form Area */}
      <main className="max-w-2xl w-full mx-auto p-6 md:p-8 space-y-6">
        
        {Object.keys(errors).length > 0 && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-2.5 rounded-md flex gap-2 items-center" role="alert">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-bold">Missing required student details. Check highlighted fields.</span>
          </div>
        )}

        <form onSubmit={handleCreate} className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 space-y-6 shadow-2xs">
          
          {/* Section 1: Personal */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              1. Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="fullName" className="block font-bold text-slate-700">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aditya Verma"
                    className={`w-full text-slate-900 border ${errors.fullName ? "border-rose-500" : "border-slate-200"} rounded-md pl-9 pr-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-navy-900`}
                  />
                </div>
                {errors.fullName && <p className="text-rose-600 text-[10px]">{errors.fullName}</p>}
              </div>

              {/* Roll Number */}
              <div className="space-y-1">
                <label htmlFor="rollNumber" className="block font-bold text-slate-700">Roll Number *</label>
                <input 
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 22CSE102"
                  className={`w-full text-slate-900 border ${errors.rollNumber ? "border-rose-500" : "border-slate-200"} rounded-md px-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-navy-900`}
                />
                {errors.rollNumber && <p className="text-rose-600 text-[10px]">{errors.rollNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="block font-bold text-slate-700">Official Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. roll@college.edu"
                    className={`w-full text-slate-900 border ${errors.email ? "border-rose-500" : "border-slate-200"} rounded-md pl-9 pr-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-navy-900`}
                  />
                </div>
                {errors.email && <p className="text-rose-600 text-[10px]">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label htmlFor="phone" className="block font-bold text-slate-700">Contact Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="tel"
                    id="phone"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className={`w-full text-slate-900 border ${errors.mobile ? "border-rose-500" : "border-slate-200"} rounded-md pl-9 pr-3 py-2 focus:outline-hidden focus:ring-1 focus:ring-navy-900`}
                  />
                </div>
                {errors.mobile && <p className="text-rose-600 text-[10px]">{errors.mobile}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Academic */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              2. Academic Credentials
            </h4>

            <div className="grid grid-cols-3 gap-4">
              {/* Dept */}
              <div className="space-y-1">
                <label htmlFor="dept" className="block font-bold text-slate-700">Department</label>
                <select 
                  id="dept"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-hidden focus:ring-1 focus:ring-navy-900"
                >
                  <option value="CSE">CSE</option>
                  <option value="AIML">AIML</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                </select>
              </div>

              {/* Year */}
              <div className="space-y-1">
                <label htmlFor="year" className="block font-bold text-slate-700">Year of Study</label>
                <select 
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full text-slate-900 border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-hidden focus:ring-1 focus:ring-navy-900"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Section */}
              <div className="space-y-1">
                <label htmlFor="sec" className="block font-bold text-slate-700">Section *</label>
                <input 
                  type="text"
                  id="sec"
                  value={section}
                  onChange={(e) => setSection(e.target.value.toUpperCase())}
                  placeholder="e.g. A"
                  className={`w-full text-slate-900 border ${errors.section ? "border-rose-500" : "border-slate-200"} rounded-md px-3 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-navy-900`}
                />
                {errors.section && <p className="text-rose-600 text-[10px]">{errors.section}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Account info auto populated */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              3. Automated Account Security
            </h4>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="space-y-1 text-[11px] text-slate-600 leading-normal">
                <p className="font-bold text-slate-800">Generated Credentials Summary:</p>
                <p>The student will use the temporary details to access the exam console node inside the computer lab.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 font-mono text-[11px] shrink-0 w-full md:w-auto">
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-slate-400 font-bold block text-[9px]">USERNAME:</span>
                  <span className="text-slate-900 font-bold">{username || "awaiting-roll"}</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-slate-400 font-bold block text-[9px]">PASSWORD:</span>
                  <span className="text-slate-900 font-bold">{tempPassword || "awaiting-roll"}</span>
                </div>
              </div>
            </div>
          </div>

        </form>

      </main>

    </div>
  );
}
