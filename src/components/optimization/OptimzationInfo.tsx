"use client";
import React from "react";
import { DryerRunData } from "@/store/useDryerStore";
import { SensorData } from "@/store/useSensorStore";

interface Props {
  runData: DryerRunData;
  sensorData: SensorData;
  dryingProgress: number;
  estimatedTime: number; // in seconds
  timeLeft: number; // in seconds
}

const formatValue = (value?: string | number | null, unit = "") =>
  value !== undefined && value !== null && value !== ""
    ? `${value}${unit}`
    : "Loading...";

const formatTimeFromMs = (ms: number) => {
  if (isNaN(ms) || ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((v) => v.toString().padStart(2, "0")).join(":");
};

export default function OptimizationInfo({
  runData,
  sensorData,
  dryingProgress,
  estimatedTime,
  timeLeft,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8 border-x border-b-3 rounded-2xl p-6 border-secondary">
      <p>
        Material:{" "}
        <span className="text-text-primary">{runData.crop || "..."}</span>
      </p>

      <p>
        Dryer Type:{" "}
        <span className="text-text-primary">{runData.dryer || "..."}</span>
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
            : "..."}
        </span>
      </p>

      <p>
        Estimated Drying Time:{" "}
        <span className="text-text-primary">
          {formatTimeFromMs(estimatedTime)}
        </span>
      </p>

      <p>
        Estimated Time Left:{" "}
        <span className="text-text-primary">{formatTimeFromMs(timeLeft)}</span>
      </p>

      <p>
        Estimated Current Moisture:{" "}
        <span className="text-text-primary">
          {Math.round(100 - dryingProgress)}%
        </span>
      </p>
    </div>
  );
}
