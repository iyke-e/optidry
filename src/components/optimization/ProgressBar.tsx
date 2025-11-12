"use client";
import React from "react";

interface Props {
  progress?: number; // sensor-based progress
  estimatedTime: number; // total drying time in ms
  remainingTime: number; // current remaining time in ms
}

export default function ProgressBar({
  progress,
  estimatedTime,
  remainingTime,
}: Props) {
  // Calculate time-based progress
  const timeProgress =
    estimatedTime > 0
      ? ((estimatedTime - remainingTime) / estimatedTime) * 100
      : 0;

  // Use whichever is greater — sensor or time
  const displayProgress =
    progress && progress > timeProgress ? progress : timeProgress;

  return (
    <div className="mt-4">
      <p>Drying Progress:</p>
      <div className="grid gap-8 items-center grid-cols-[1fr_auto]">
        <div className="border border-black/40 bg-input-bg h-3 rounded-full overflow-hidden">
          <div
            style={{ width: `${displayProgress}%` }}
            className="bg-secondary h-full rounded-full transition-all duration-500"
          ></div>
        </div>
        <p className="text-text-primary">{displayProgress.toFixed(2)}%</p>
      </div>
    </div>
  );
}
