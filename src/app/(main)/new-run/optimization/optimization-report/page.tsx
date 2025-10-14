"use client";
import Button from "@/components/ul/Button";
import { useRouter } from "next/navigation";

const OptimizationReportScreen = () => {
  const router = useRouter();
  return (
    <div>
      <h2
        className="text-text-primary text-center text-lg
      "
      >
        Drying cycle optimized and completed. <br /> Performance data saved to
        Saved Runs.
      </h2>
      <div className="mt-8">
        <div className="grid gap-4">
          <p>
            Run saved on:{" "}
            <span className="text-text-primary">02/10/25 | 9:05am</span>
          </p>
          <p>
            Run saved on: <span className="text-text-primary">11%</span>
          </p>
        </div>
        <div>
          <h3 className="mb-4 mt-6 font-semibold text-lg ">
            Performance Highlight:
          </h3>
          <ul className="grid gap-4">
            <p>✅ Optimum drying rate achieved after 22 mins</p>
            <p>💧 Target moisture reached with minimal overshoot</p>
            <p>🌡️ Temperature stability maintained within ±2 °C</p>
            <p>⚠1 optimization alert — system compensated automatically</p>
          </ul>
        </div>
        <div className="flex gap-4 items-center mt-8 justify-between">
          <Button
            onClick={() => router.push("/new-run")}
            name="Start New Run"
          />
          <Button
            onClick={() => router.push("/new-run/notes")}
            name="Add Notes"
          />
        </div>
      </div>
    </div>
  );
};

export default OptimizationReportScreen;
