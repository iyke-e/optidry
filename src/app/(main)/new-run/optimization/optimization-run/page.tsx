"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ul/Button";
import { useDryerStore } from "@/store/useDryerStore";
import { useSensorStore } from "@/store/useSensorStore";
import OptimizationInfo from "@/components/optimization/OptimzationInfo";
import ProgressBar from "@/components/optimization/ProgressBar";
import OptimizationTips from "@/components/optimization/OptimizationTips";
import cropdata from "@/data/crop_dryer_data.json";

interface SensorResponse {
  temperature: string;
  humidity: string;
  vibration: string;
  timestamp: string;
}

const SENSOR_URL =
  "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/sensor";

export default function OptimizationRunScreen() {
  const router = useRouter();
  const { data, setData, status, setStatus } = useSensorStore();
  const { runData, setRunData } = useDryerStore();

  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef<number | null>(null);
  const failCount = useRef(0);

  // Load drying time based on crop + dryer type
  useEffect(() => {
    if (!runData.crop || !runData.dryer) return;

    const crop = cropdata.find(
      (c) => c.Crop.toLowerCase() === runData.crop.toLowerCase()
    );
    if (!crop) return;

    const dryer = crop.Dryers.find(
      (d: { "Dryer Type": string }) =>
        d["Dryer Type"].toLowerCase() === runData.dryer?.toLowerCase()
    );

    const hours = dryer ? Number(dryer["Drying Time (Max hours)"]) : 0;
    const total = hours * 60 * 60 * 1000; // convert hours to ms
    setEstimatedTime(total);
    startRef.current = Date.now();
    setRemainingTime(total);
    setProgress(0); // reset progress at start
  }, [runData.crop, runData.dryer]);

  // Countdown & progress update based on time
  useEffect(() => {
    if (!estimatedTime) return;

    const timer = setInterval(() => {
      const elapsed = Date.now() - (startRef.current || 0);
      const newRemainingTime = Math.max(estimatedTime - elapsed, 0);
      const newProgress = Math.min(100, (elapsed / estimatedTime) * 100);

      setRemainingTime(newRemainingTime);
      setProgress(newProgress);

      if (newRemainingTime === 0) {
        setStatus("stopped");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [estimatedTime, setStatus]);

  // Sensor polling every 2 seconds
  useEffect(() => {
    if (status !== "running") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(SENSOR_URL);
        if (!res.ok) throw new Error("Sensor fetch failed");

        const s: SensorResponse = await res.json();
        if (!s.temperature && !s.humidity && !s.vibration)
          throw new Error("Empty sensor data");

        failCount.current = 0;
        setData({
          temperature: s.temperature ?? null,
          humidity: s.humidity ?? null,
          vibration: s.vibration ?? null,
          timestamp: new Date(s.timestamp).getTime() ?? null,
        });
      } catch {
        if (++failCount.current >= 10) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setStatus("stopped");
          router.push("/new-run/sensor-check");
        }
        setError("Sensor fetch failed");
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, setData, setStatus, router]);

  const endRun = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

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

      <ProgressBar
        progress={progress}
        estimatedTime={estimatedTime}
        remainingTime={remainingTime}
      />

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
