"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ul/Button";
import { useDryerStore } from "@/store/useDryerStore";
import { useSensorStore } from "@/store/useSensorStore";
import OptimizationInfo from "@/components/optimization/OptimzationInfo";
import ProgressBar from "@/components/optimization/ProgressBar";
import OptimizationTips from "@/components/optimization/OptimizationTips";

interface SensorResponse {
  temperature: string;
  humidity: string;
  vibration: string;
  timestamp: string;
}

interface OptimizationResponse {
  recommendations: string[];
}

const SENSOR_URL =
  "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/sensor";
const OPTIMIZE_URL =
  "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/optimize";

export default function OptimizationRunScreen() {
  const router = useRouter();
  const { data, setData, status, setStatus } = useSensorStore();
  const { runData, setRunData } = useDryerStore();

  const [error, setError] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef<number | null>(null);
  const failCount = useRef(0);

  const stopPolling = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const failOut = () => {
    stopPolling();
    setStatus("stopped");
    router.push("/new-run/sensor-check");
  };

  const pollSensor = async () => {
    try {
      const res = await fetch(SENSOR_URL);
      if (!res.ok) {
        if (++failCount.current >= 10) failOut();
        return;
      }

      const s: SensorResponse = await res.json();
      if (!s.temperature && !s.humidity && !s.vibration) {
        if (++failCount.current >= 10) failOut();
        return;
      }

      failCount.current = 0;
      setData({
        temperature: s.temperature ?? null,
        humidity: s.humidity ?? null,
        vibration: s.vibration ?? null,
        timestamp: new Date(s.timestamp).getTime() ?? null,
      });

      if (s.humidity) {
        const h = Number(s.humidity);
        setProgress(Math.min(100, Math.max(0, 100 - h / 2)));
      }

      setLoading(false);
    } catch {
      if (++failCount.current >= 10) failOut();
      setError("Sensor fetch failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    const hours = Math.floor(Math.random() * 5) + 1;
    const total = hours * 60 * 60 * 1000;
    setEstimatedTime(total);
    startRef.current = Date.now();
    setRemainingTime(total);
  }, []);

  useEffect(() => {
    if (!estimatedTime) return;
    const timer = setInterval(() => {
      const elapsed = Date.now() - (startRef.current || 0);
      setRemainingTime(Math.max(estimatedTime - elapsed, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [estimatedTime]);

  useEffect(() => {
    const fetchOptimizations = async () => {
      try {
        const res = await fetch(OPTIMIZE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(runData),
        });
        const d: OptimizationResponse = await res.json();
        if (Array.isArray(d.recommendations)) setTips(d.recommendations);
      } catch {
        setTips([]);
      }
    };
    fetchOptimizations();
  }, [runData]);

  useEffect(() => {
    if (status === "running") {
      if (!intervalRef.current)
        intervalRef.current = setInterval(pollSensor, 1000);
    } else {
      stopPolling();
    }
    return stopPolling;
  }, [status]);

  const endRun = () => {
    stopPolling();
    setStatus("stopped");
    setRunData({
      ...runData,
      last_temperature: data.temperature ?? null,
      last_humidity: data.humidity ?? null,
      last_vibration: data.vibration ?? null,
      dryingProgress: progress,
    });
    router.push("/new-run/optimization/optimization-report");
  };

  return (
    <div>
      <h2 className="text-text-primary text-2xl text-center">
        Live Performance Feed
      </h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <OptimizationInfo
        runData={runData}
        sensorData={data}
        dryingProgress={progress}
        estimatedTime={estimatedTime}
        timeLeft={remainingTime}
      />

      <ProgressBar progress={progress} />
      <OptimizationTips />

      <div className="flex justify-evenly items-center gap-4 mt-8">
        <Button
          variant="outline"
          name={status === "paused" ? "Resume" : "Pause"}
          onClick={() => setStatus(status === "paused" ? "running" : "paused")}
          disabled={status === "stopped"}
        />
        <Button name="End Run" onClick={endRun} />
        <Button disabled name="Save Log" />
        <Button
          variant="red"
          name="Stop Monitoring"
          onClick={() => setStatus("stopped")}
          disabled={status === "stopped"}
        />
      </div>
    </div>
  );
}
