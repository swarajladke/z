import React from "react";
import Link from "next/link";
import { FolderX, ArrowRight, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 shadow-xs">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <FolderX className="w-8 h-8" />
      </div>
      <div>
        <h3 className="font-extrabold text-slate-900 text-lg">{title}</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </button>
      )}

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 bg-violet-700 hover:bg-violet-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs ml-2"
        >
          {actionText} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
};
