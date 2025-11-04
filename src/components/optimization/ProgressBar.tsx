"use client";
import React from "react";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="mt-4">
      <p>Drying Process:</p>
      <div className="grid gap-8 items-center grid-cols-[1fr_auto]">
        <div className="border border-black/40 bg-input-bg h-3 rounded-full">
          <div
            style={{ width: `${progress}%` }}
            className="bg-secondary h-full rounded-full transition-all duration-500"
          ></div>
        </div>
        <p className="text-text-primary">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
