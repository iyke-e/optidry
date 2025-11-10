"use client";

import Button from "@/components/ul/Button";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDryerStore } from "@/store/useDryerStore";

const Optimization = () => {
  const { runData } = useDryerStore();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const { dryer, crop, initial_moisture_content, final_moisture_content } =
    runData;

  // Convert possibly null or numeric values to string safely
  const initialMC = initial_moisture_content?.toString().trim() || "";
  const finalMC = final_moisture_content?.toString().trim() || "";

  const canProceed =
    isChecked && dryer.trim() && crop.trim() && initialMC && finalMC;

  const handleOptimizationStart = () => {
    if (!canProceed) return;
    router.push("/new-run/optimization/optimization-run");
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
            {initialMC ? `${initialMC}%` : "N/A"}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl">Target Moisture Content:</p>
          <p className="text-text-primary font-semibold">
            {finalMC ? `${finalMC}%` : "N/A"}
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

        <div className="flex items-center gap-10 justify-center">
          <Link href="/new-run/sensor-check">
            <Button name="Go Back" />
          </Link>

          <Button
            name="Start Optimizing"
            onClick={handleOptimizationStart}
            disabled={!canProceed}
          />
        </div>
      </div>
    </div>
  );
};

export default Optimization;
