"use client";
import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useDryerStore } from "@/store/useDryerStore";

interface OptimizationResponse {
  recommendations: string[];
}

const OPTIMIZE_URL =
  "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/optimize";

export default function OptimizationTips() {
  const { runData } = useDryerStore();
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    if (!runData || Object.keys(runData).length === 0) return;

    const fetchOptimizations = async () => {
      try {
        const res = await fetch(OPTIMIZE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(runData),
        });

        if (!res.ok) throw new Error(`Request failed with ${res.status}`);

        const data: OptimizationResponse = await res.json();

        if (
          Array.isArray(data.recommendations) &&
          data.recommendations.length > 0
        ) {
          setTips(data.recommendations);
        }
      } catch (error) {
        console.warn("Optimization fetch failed:", error);
      }
    };

    // Initial fetch
    fetchOptimizations();

    // Fetch every 2 minutes
    const interval = setInterval(fetchOptimizations, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [runData]);

  return (
    <div className="mt-8">
      <h3 className="text-text-primary mb-6">Optimization Tips</h3>
      {tips.length === 0 ? (
        <p className="text-text-secondary">Fetching tips...</p>
      ) : (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
