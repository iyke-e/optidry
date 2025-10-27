"use client";

import Button from "@/components/ul/Button";
import Input from "@/components/ul/Input";
import Link from "next/link";
import { useDryerStore } from "@/store/useDryerStore";
import { useState } from "react";

const SetValue = () => {
  const { runData, updateRunData } = useDryerStore();
  const [error, setError] = useState("");

  const canProceed =
    runData.initial_moisture_content && runData.final_moisture_content;

  const handleProceed = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canProceed) {
      e.preventDefault();
      setError("Please enter both initial and final moisture content values.");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <h2 className="text-center text-dark-blue text-lg font-semibold">
        Set Initial and Target Final Moisture Content
      </h2>

      <div className="grid gap-6 my-8">
        <Input
          label="Initial Moisture Content (%)"
          type="number"
          value={runData.initial_moisture_content}
          onChange={(e) =>
            updateRunData("initial_moisture_content", e.target.value)
          }
        />
        <Input
          label="Target / Final Moisture Content (%)"
          type="number"
          value={runData.final_moisture_content}
          onChange={(e) =>
            updateRunData("final_moisture_content", e.target.value)
          }
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Link
        href="/new-run/sensor-check"
        onClick={handleProceed}
        className={`w-full ${
          !canProceed ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <Button className="w-full" name="Proceed" />
      </Link>
    </div>
  );
};

export default SetValue;
