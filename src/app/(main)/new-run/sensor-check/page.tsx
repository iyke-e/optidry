"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ul/Button";
import Logo from "@/components/ul/Logo";
import Link from "next/link";
import { FaCircleExclamation } from "react-icons/fa6";

type SensorStatus = "checking" | "connected" | "not_connected";

type SensorState = {
  temperature: SensorStatus;
  humidity: SensorStatus;
  vibration: SensorStatus;
};

const SensorCheck = () => {
  const [sensorStatus, setSensorStatus] = useState<SensorState>({
    temperature: "checking",
    humidity: "checking",
    vibration: "checking",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const checkSensors = async () => {
    setLoading(true);
    setError("");
    setSensorStatus({
      temperature: "checking",
      humidity: "checking",
      vibration: "checking",
    });

    try {
      const res = await fetch(
        "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/sensor",
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch sensor data");
      const data = await res.json();

      setSensorStatus({
        temperature: data.temperature != null ? "connected" : "not_connected",
        humidity: data.humidity != null ? "connected" : "not_connected",
        vibration: data.vibration != null ? "connected" : "not_connected",
      });
    } catch (err: unknown) {
      // Check if the error is an instance of Error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Could not check sensors");
      }

      setSensorStatus({
        temperature: "not_connected",
        humidity: "not_connected",
        vibration: "not_connected",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSensors();
  }, []);

  const renderSensor = (label: string, status: SensorStatus) => {
    let color = "text-gray-400";
    let text = "Checking...";
    if (status === "connected") {
      color = "text-green-500";
      text = "Connected";
    } else if (status === "not_connected") {
      color = "text-red-500";
      text = "Not Connected";
    }

    return (
      <p className="text-xl flex items-center gap-2">
        <FaCircleExclamation className={color} />
        {label} - <span className={color}>{text}</span>
      </p>
    );
  };

  const allConnected =
    sensorStatus.temperature === "connected" &&
    sensorStatus.humidity === "connected" &&
    sensorStatus.vibration === "connected";

  return (
    <div>
      <div className="flex items-center mb-8">
        <Logo height={16} width={100} />
        <p className="text-text-primary font-semibold ml-4">
          Sensor Status Check
        </p>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid gap-6">
        {renderSensor("Temperature Sensor", sensorStatus.temperature)}
        {renderSensor("Humidity Sensor", sensorStatus.humidity)}
        {renderSensor("Vibration Sensor", sensorStatus.vibration)}

        <p className="text-xl text-center">
          Please confirm all sensors are properly mounted before proceeding
        </p>

        <div className="flex items-center gap-10 justify-center">
          <Button name="Recheck" onClick={checkSensors} disabled={loading} />
          <Link href={allConnected ? "/new-run/optimization" : "#"}>
            <Button name="Continue" disabled={!allConnected || loading} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SensorCheck;
