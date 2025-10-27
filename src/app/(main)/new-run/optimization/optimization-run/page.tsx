"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ul/Button";
import { useRouter } from "next/navigation";
import { useDryerStore } from "@/store/useDryerStore";
import { useSensorStore } from "@/store/useSensorStore";
import { FaCircleExclamation } from "react-icons/fa6";

interface SensorResponse {
  temperature: string;
  humidity: string;
  vibration: string;
  timestamp: string;
}

interface OptimizationResponse {
  recommendations: string[];
  estimated_moisture_content: string;
  optimal_drying_time_range: string;
}

const OptimizationRunScreen = () => {
  const router = useRouter();

  // Zustand stores (use slices for reactivity)
  const runData = useDryerStore((state) => state.runData);
  const setRunData = useDryerStore((state) => state.setRunData);

  const sensorData = useSensorStore((state) => state.data);
  const setData = useSensorStore((state) => state.setData);
  const status = useSensorStore((state) => state.status);
  const setStatus = useSensorStore((state) => state.setStatus);

  const [dryingProgress, setDryingProgress] = useState(0);
  const [error, setError] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch optimization tips once
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await fetch(
          "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/optimize",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(runData),
          }
        );
        const data: OptimizationResponse = await res.json();
        if (Array.isArray(data.recommendations)) setTips(data.recommendations);
      } catch {
        setTips([]);
      }
    };
    fetchTips();
  }, [runData]);

  // Polling for sensor data
  const startFetching = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/sensor"
        );
        if (!res.ok) return;

        const data: SensorResponse = await res.json();
        setData({
          temperature: data.temperature ?? null,
          humidity: data.humidity ?? null,
          vibration: data.vibration ?? null,
          timestamp: new Date(data.timestamp).getTime() ?? null,
        });

        if (data.humidity) {
          const h = Number(data.humidity);
          const progress = Math.max(0, Math.min(100, 100 - h / 2));
          setDryingProgress(progress);
        }
        setLoading(false);
      } catch {
        setError("Error fetching sensor data");
        setLoading(false);
      }
    }, 1000);
  };

  const stopFetching = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Control fetching behavior based on Zustand status
  useEffect(() => {
    if (status === "running") startFetching();
    else stopFetching();
    return () => stopFetching();
  }, [status]);

  const handlePauseResume = () => {
    setStatus(status === "paused" ? "running" : "paused");
  };

  const handleStopMonitoring = () => {
    setStatus("stopped");
  };

  const handleEndRun = () => {
    stopFetching();
    setStatus("stopped");

    // Save final values
    setRunData({
      ...runData,
      last_temperature: sensorData.temperature ?? null,
      last_humidity: sensorData.humidity ?? null,
      last_vibration: sensorData.vibration ?? null,
      dryingProgress,
    });

    router.push("/new-run/optimization/optimization-report");
  };

  const formatValue = (value?: string | number | null, unit = "") =>
    value !== undefined && value !== null && value !== ""
      ? `${value}${unit}`
      : "Loading...";

  return (
    <div>
      <h2 className="text-text-primary text-2xl text-center">
        Live Performance Feed
      </h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="grid grid-cols-2 gap-4 mt-8 border-x border-b-3 rounded-2xl p-6 border-secondary">
        <p>
          Material:{" "}
          <span className="text-text-primary">
            {runData.crop || "Loading..."}
          </span>
        </p>
        <p>
          Dryer Type:{" "}
          <span className="text-text-primary">
            {runData.dryer || "Loading..."}
          </span>
        </p>
        <p>
          Initial Moisture Content:{" "}
          <span className="text-text-primary">
            {formatValue(runData.initial_moisture_content, "%")}
          </span>
        </p>
        <p>
          Target Moisture Content:{" "}
          <span className="text-text-primary">
            {formatValue(runData.final_moisture_content, "%")}
          </span>
        </p>
        <p>
          Temperature:{" "}
          <span className="text-text-primary">
            {formatValue(sensorData.temperature, "°C")}
          </span>
        </p>
        <p>
          Relative Humidity:{" "}
          <span className="text-text-primary">
            {formatValue(sensorData.humidity, "%")}
          </span>
        </p>
        <p>
          Vibration:{" "}
          <span
            className={`${
              sensorData.vibration && Number(sensorData.vibration) > 5
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {formatValue(sensorData.vibration)}
          </span>
        </p>
        <p>
          Timestamp:{" "}
          <span className="text-text-primary">
            {sensorData.timestamp
              ? new Date(sensorData.timestamp).toLocaleTimeString()
              : "Loading..."}
          </span>
        </p>
        <p>
          Estimated Drying Time:{" "}
          <span className="text-text-primary">05h 34min</span>
        </p>
        <p>
          Estimated Time Left:{" "}
          <span className="text-text-primary">02h 10min</span>
        </p>
        <p>
          Estimated Current Moisture:{" "}
          <span className="text-text-primary">
            {Math.round(100 - dryingProgress)}%
          </span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <p>Drying Process:</p>
        <div className="grid gap-8 items-center grid-cols-[1fr_auto]">
          <div className="border border-black/40 bg-input-bg h-3 rounded-full">
            <div
              style={{ width: `${dryingProgress}%` }}
              className="bg-secondary h-full rounded-full transition-all duration-500"
            ></div>
          </div>
          <p className="text-text-primary">{Math.round(dryingProgress)}%</p>
        </div>
      </div>

      {/* Optimization tips */}
      <div className="mt-8">
        <h3 className="text-text-primary mb-6">Optimization Tips</h3>
        {tips.length > 0 ? (
          <ul className="grid gap-4">
            {tips.map((tip, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center border-b border-b-secondary/20 pb-2"
              >
                <div className="flex gap-2">
                  <FaCircleExclamation className="text-text-primary w-5 h-5" />
                  <p>{tip}</p>
                </div>
                <span className="text-text-primary">{idx + 1}s</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">Loading tips...</p>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex justify-evenly items-center gap-4 mt-8">
        <Button
          variant="outline"
          name={status === "paused" ? "Resume" : "Pause"}
          onClick={handlePauseResume}
          disabled={status === "stopped"}
        />
        <Button name="End Run" onClick={handleEndRun} />
        <Button disabled name="Save Log" />
        <Button
          variant="red"
          name="Stop Monitoring"
          onClick={handleStopMonitoring}
          disabled={status === "stopped"}
        />
      </div>
    </div>
  );
};

export default OptimizationRunScreen;
