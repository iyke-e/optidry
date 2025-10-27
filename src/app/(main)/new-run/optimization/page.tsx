"use client";

import Button from "@/components/ul/Button";
import Link from "next/link";
import React, { useState } from "react";
import { useDryerStore } from "@/store/useDryerStore";

const Optimization = () => {
  const { runData } = useDryerStore();
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    dryer,
    crop,
    initial_moisture_content,
    final_moisture_content,
    timestamp,
  } = runData;

  const canProceed =
    isChecked &&
    dryer.trim() &&
    crop.trim() &&
    initial_moisture_content.trim() &&
    final_moisture_content.trim();

  const handleOptimizationStart = async () => {
    if (!canProceed) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/api/optimize",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dryer,
            crop,
            initial_moisture_content,
            final_moisture_content,
            timestamp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // Show backend error message if present
        setError(data?.detail || "Optimization failed");
        return;
      }

      window.location.href = "/new-run/optimization/optimization-run";
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <p className="text-xl">Material</p>
          <p className="text-text-primary font-semibold">
            {crop || "Not selected"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl">Dryer Type</p>
          <p className="text-text-primary font-semibold">
            {dryer || "Not selected"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl">Initial Moisture Content:</p>
          <p className="text-text-primary font-semibold">
            {initial_moisture_content ? `${initial_moisture_content}%` : "N/A"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl">Target Moisture Content:</p>
          <p className="text-text-primary font-semibold">
            {final_moisture_content ? `${final_moisture_content}%` : "N/A"}
          </p>
        </div>

        <div className="flex gap-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <p className="text-text-primary">
            I have verified that sensor connections, material loading, and
            safety checks are complete and the dryer is ready to operate.
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-center font-medium mt-2">{error}</p>
        )}

        <div className="flex items-center gap-10 justify-center">
          <Link href="/new-run/sensor-check">
            <Button name="Go Back" />
          </Link>

          <Button
            name={loading ? "Starting..." : "Start Optimizing"}
            onClick={handleOptimizationStart}
            disabled={!canProceed || loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Optimization;
