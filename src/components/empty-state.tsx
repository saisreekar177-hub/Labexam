"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  icon: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title,
  description,
  secondaryDescription,
  icon: Icon,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="w-full border border-dashed border-slate-200 bg-white rounded-lg p-10 md:p-16 flex flex-col items-center justify-center text-center font-sans">
      {/* Icon Frame */}
      <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-2xs">
        <Icon className="w-6 h-6" />
      </div>

      {/* Copy Content */}
      <div className="space-y-1.5 max-w-sm">
        <h4 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
        <p className="text-xs text-slate-500 leading-normal">{description}</p>
        {secondaryDescription && (
          <p className="text-[10px] text-slate-400 italic mt-1 leading-normal">
            {secondaryDescription}
          </p>
        )}
      </div>

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs px-4 py-2 rounded-md transition-all shadow-2xs focus-ring"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
