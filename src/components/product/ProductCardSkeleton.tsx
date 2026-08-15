"use client";

import React from "react";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-[rgba(23,23,23,0.12)] overflow-hidden flex flex-col justify-between animate-pulse">
      {/* 4:5 Aspect Ratio Image Skeleton */}
      <div className="aspect-[4/5] w-full bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-3.5 space-y-2">
        <div className="flex justify-between items-center">
          <div className="h-3 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
        </div>
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
          <div className="h-4 bg-slate-200 rounded w-1/4" />
          <div className="h-7 bg-slate-200 rounded-lg w-12" />
        </div>
      </div>
    </div>
  );
};
