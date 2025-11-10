"use client";
import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useDryerStore } from "@/store/useDryerStore";

interface OptimizationResponse {
  recommendations: string[];
}

const OPTIMIZE_URL =
  "https://n7nvoksrehshlmbcoucoik7avm0xcxoa.lambda-url.eu-north-1.on.aws/optimize";

export default function OptimizationTips() {
  const { runData } = useDryerStore();
  const [tips, setTips] = useState<string[]>([
    "Ensure consistent airflow to improve drying efficiency.",
    "Avoid overloading the dryer to maintain optimal heat transfer.",
    "Clean air filters regularly for stable performance.",
    "Monitor temperature fluctuations to prevent energy waste.",
    "Use calibrated sensors for accurate humidity readings.",
    "Pause operations briefly to allow uniform moisture distribution.",
  ]);

  useEffect(() => {
    const fetchOptimizations = async () => {
      try {
        const res = await fetch(OPTIMIZE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(runData),
        });
        const data: OptimizationResponse = await res.json();

        if (
          Array.isArray(data.recommendations) &&
          data.recommendations.length > 0
        ) {
          setTips(data.recommendations);
        }
      } catch (error) {
        // fallback to static placeholder tips
        console.warn(
          "Optimization fetch failed, using placeholder tips.",
          error
        );
      }
    };

    if (runData && Object.keys(runData).length > 0) fetchOptimizations();
  }, [runData]);

  return (
    <div className="mt-8">
      <h3 className="text-text-primary mb-6">Optimization Tips</h3>
      <ul className="grid gap-4">
        {tips.map((tip, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border-b border-b-secondary/20 pb-2"
          >
            <div className="flex gap-2 items-start">
              <FaCircleExclamation className="text-text-primary w-5 h-5 shrink-0" />
              <p>{tip}</p>
            </div>
            <span className="text-text-primary">{idx + 1}s</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
