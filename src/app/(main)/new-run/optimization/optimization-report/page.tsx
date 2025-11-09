"use client";
import Button from "@/components/ul/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDryerStore } from "@/store/useDryerStore";
import SensorGraph from "@/components/optimization/SensorGraph";

const OptimizationReportScreen = () => {
  const router = useRouter();

  const runData = useDryerStore((state) => state.runData);

  const [savedTime, setSavedTime] = useState("");

  useEffect(() => {
    setSavedTime(new Date().toLocaleString());
  }, []);

  const formatValue = (value?: string | number | null, unit = "") =>
    value !== undefined && value !== null && value !== ""
      ? `${value}${unit}`
      : "N/A";

  return (
    <div>
      <h2 className="text-text-primary text-center text-lg">
        Drying cycle optimized and completed. <br /> Performance data saved to
        Saved Runs.
      </h2>

      <div className="mt-8">
        <div className="grid gap-4">
          <p>
            Run saved on: <span className="text-text-primary">{savedTime}</span>
          </p>
          <p>
            Final Moisture:{" "}
            <span className="text-text-primary">
              {formatValue(runData?.last_humidity, "%")}
            </span>
          </p>
          <p>
            Final Temperature:{" "}
            <span className="text-text-primary">
              {formatValue(runData?.last_temperature, "°C")}
            </span>
          </p>
          <p>
            Final Vibration:{" "}
            <span className="text-text-primary">
              {formatValue(runData?.last_vibration)}
            </span>
          </p>
          <p>
            Drying Progress:{" "}
            <span className="text-text-primary">
              {Math.round(runData?.dryingProgress ?? 0)}%
            </span>
          </p>
        </div>
        <SensorGraph />
        <div>
          <h3 className="mb-4 mt-6 font-semibold text-lg">
            Performance Highlights:
          </h3>
          <ul className="grid gap-4">
            <li>✅ Optimum drying rate achieved within safe limits</li>
            <li>💧 Target moisture reached efficiently</li>
            <li>🌡️ Temperature stability maintained throughout</li>
            <li>⚙️ System operated smoothly with no major faults</li>
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
