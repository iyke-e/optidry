"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { useSensorStore } from "@/store/useSensorStore";

export default function SensorGraph() {
  const { data: sensorData, records, addRecord } = useSensorStore();

  useEffect(() => {
    const { timestamp, temperature, humidity } = sensorData;

    if (
      timestamp === null ||
      temperature === null ||
      humidity === null ||
      isNaN(Number(temperature)) ||
      isNaN(Number(humidity))
    )
      return;

    addRecord({
      time: new Date(timestamp).toLocaleTimeString(),
      temperature: Number(temperature),
      humidity: Number(humidity),
    });
  }, [
    sensorData.timestamp,
    sensorData.temperature,
    sensorData.humidity,
    addRecord,
  ]);

  return (
    <div className="w-full flex gap-6 mt-8">
      {/* Temperature Graph */}
      <div className="flex-1 h-64 bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={records.slice(-30)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{
                value: "Temp (°C)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#ff7300"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity Graph */}
      <div className="flex-1 h-64 bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={records.slice(-30)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis
              label={{
                value: "Humidity (%)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#387908"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
