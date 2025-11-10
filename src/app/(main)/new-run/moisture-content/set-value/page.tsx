"use client";

import Button from "@/components/ul/Button";
import Input from "@/components/ul/Input";
import { useDryerStore } from "@/store/useDryerStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SetValue = () => {
  const { runData, updateRunData } = useDryerStore();
  const [error, setError] = useState("");
  const router = useRouter();

  const initial = runData.initial_moisture_content;
  const final = runData.final_moisture_content;

  const canProceed =
    initial !== null && final !== null && initial !== "" && final !== "";

  const handleProceed = () => {
    if (!canProceed) {
      setError("Please enter both initial and final moisture content values.");
      return;
    }
    setError("");
    router.push("/new-run/sensor-check");
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
          value={initial ?? ""}
          onChange={(e) =>
            updateRunData("initial_moisture_content", Number(e.target.value))
          }
        />
        <Input
          label="Target / Final Moisture Content (%)"
          type="number"
          value={final ?? ""}
          onChange={(e) =>
            updateRunData("final_moisture_content", Number(e.target.value))
          }
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Button
        className={`w-full ${!canProceed ? "opacity-50" : ""}`}
        name="Proceed"
        onClick={handleProceed}
      />
    </div>
  );
};

export default SetValue;
