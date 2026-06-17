"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Building, ShieldCheck, Mail, Phone, GraduationCap } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "HOD",
    email: "",
    phone: "",
    institution: "",
    capacity: "500-1000",
    consent: true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request to database
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      designation: "HOD",
      email: "",
      phone: "",
      institution: "",
      capacity: "500-1000",
      consent: true
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Modal Container */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xl max-w-lg w-full relative z-[101] overflow-hidden flex flex-col transition-all duration-300 font-sans transform scale-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 hover:bg-slate-100 transition-all focus-ring"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100 bg-slate-50/50">
              <span className="text-xs font-bold text-navy-800 tracking-wider uppercase">Institutional Demo Request</span>
              <h3 className="text-xl font-bold text-slate-950 mt-1">Schedule a Platform Walkthrough</h3>
              <p className="text-xs text-slate-500 mt-1">
                See how we help engineering colleges conduct secure programming exams and automate lab evaluation.
              </p>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Ramesh Kumar"
                    className="w-full text-slate-900 border border-slate-200 rounded-md px-3 py-2 text-xs focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>

                {/* Designation */}
                <div className="space-y-1">
                  <label htmlFor="designation" className="block text-xs font-bold text-slate-700">Designation *</label>
                  <select
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full text-slate-900 border border-slate-200 rounded-md px-3 py-2 text-xs bg-white focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  >
                    <option value="Principal">Principal / Director</option>
                    <option value="Dean">Dean Academics</option>
                    <option value="HOD">Head of Department (HOD)</option>
                    <option value="Faculty">Faculty Member</option>
                    <option value="Lab Coordinator">Lab Coordinator</option>
                    <option value="TPO">Training & Placement Officer</option>
                  </select>
                </div>
              </div>

              {/* Institution Name */}
              <div className="space-y-1">
                <label htmlFor="institution" className="block text-xs font-bold text-slate-700">Name of Educational Institution *</label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    id="institution"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Indian Institute of Information Technology, Madras"
                    className="w-full text-slate-900 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Institutional Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700">Official Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. hod.cse@institution.edu"
                      className="w-full text-slate-900 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700">Contact Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full text-slate-900 border border-slate-200 rounded-md pl-9 pr-3 py-2 text-xs focus:outline-hidden focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
                    />
                  </div>
                </div>
              </div>

              {/* Annual Student Capacity */}
              <div className="space-y-1">
                <label htmlFor="capacity" className="block text-xs font-bold text-slate-700">Total Engineering/CS Students Capacity</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "< 250", value: "under-250" },
                    { label: "250-500", value: "250-500" },
                    { label: "500-1500", value: "500-1500" },
                    { label: "1500+", value: "1500-plus" }
                  ].map((capOption) => (
                    <button
                      key={capOption.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, capacity: capOption.value })}
                      className={`py-2 px-1 text-center rounded border text-xs font-medium transition-all ${
                        formData.capacity === capOption.value
                          ? "bg-navy-900 text-white border-navy-900"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {capOption.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security Consent */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-navy-900 w-3.5 h-3.5"
                />
                <label htmlFor="consent" className="text-[11px] text-slate-500 leading-snug">
                  I consent to receive diagnostic reports and platform security compliance guidelines from ExamCoder.
                </label>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-navy-800" />
                Data Protected by Institutional TLS
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-md text-xs font-semibold text-slate-700 transition-all focus-ring"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="px-5 py-2 bg-navy-900 hover:bg-navy-950 text-white rounded-md text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 focus-ring"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Validating Slot...
                    </>
                  ) : (
                    "Schedule Walkthrough"
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-emerald-50 rounded-full border border-emerald-200 text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">Demo Request Submitted</h3>
              <p className="text-xs text-slate-600 max-w-sm">
                Thank you, <span className="font-semibold">{formData.fullName}</span>. We have scheduled an institutional consultation slot for <span className="font-semibold">{formData.institution}</span>.
              </p>
              <p className="text-xs text-slate-500">
                A calendar invitation with the platform details has been sent to <span className="font-semibold text-slate-700 font-mono">{formData.email}</span>.
              </p>
            </div>

            <div className="w-full bg-slate-50 p-4 rounded-lg border border-slate-100 text-[11px] text-left text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 uppercase tracking-wide">Next steps:</p>
              <p>1. Our academic solutions architect will contact you at <span className="font-semibold">{formData.phone}</span> to confirm hardware specs.</p>
              <p>2. We will set up a dedicated sandboxed trial node for your college's subnet.</p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-navy-900 hover:bg-navy-950 text-white rounded-md text-xs font-bold transition-all w-full focus-ring"
            >
              Return to Platform Page
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
