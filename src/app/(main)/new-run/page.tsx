"use client";

import Link from "next/link";
import Button from "@/components/ul/Button";
import { useDryerStore } from "@/store/useDryerStore";
import { useEffect, useState } from "react";
import cropdata from "@/data/crop_dryer_data.json";

// Type definitions for your JSON structure
interface Dryer {
  "Dryer Type": string;
  [key: string]: unknown; // other optional fields
}

interface CropItem {
  Crop: string;
  Dryers: Dryer[];
}

interface SelectOption {
  label: string;
  value: string;
}

const DashboardScreen = () => {
  const { runData, updateRunData, resetRunData } = useDryerStore();
  const [error, setError] = useState<string>("");
  const [availableDryers, setAvailableDryers] = useState<SelectOption[]>([
    { label: "Select Dryer Type", value: "" },
  ]);

  const canProceed = runData.crop && runData.dryer;

  const handleProceed = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canProceed) {
      e.preventDefault();
      setError("Please select both material and dryer type.");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    resetRunData();
  }, [resetRunData]);

  // Generate crop options directly from JSON
  const cropOptions: SelectOption[] = [
    { label: "Select Material", value: "" },
    ...(cropdata as CropItem[]).map((item) => ({
      label: item.Crop,
      value: item.Crop,
    })),
  ];

  // Update dryer list when crop changes
  useEffect(() => {
    if (runData.crop) {
      const crop = (cropdata as CropItem[]).find(
        (item) => item.Crop === runData.crop
      );
      if (crop) {
        const dryers: SelectOption[] = crop.Dryers.map((d) => ({
          label: d["Dryer Type"],
          value: d["Dryer Type"],
        }));
        setAvailableDryers([
          { label: "Select Dryer Type", value: "" },
          ...dryers,
        ]);
      } else {
        setAvailableDryers([{ label: "Select Dryer Type", value: "" }]);
      }
    } else {
      setAvailableDryers([{ label: "Select Dryer Type", value: "" }]);
    }
    updateRunData("dryer", "");
  }, [runData.crop, updateRunData]);

  return (
    <>
      <h2 className="text-xl mb-6 text-dark-blue font-semibold">
        Select Material and Dryer
      </h2>

      <div className="grid gap-4">
        {/* Material */}
        <div className="grid gap-2 w-full">
          <label>Select Material</label>
          <select
            className="border bg-input-bg border-black/20 rounded-lg px-4 py-2 outline-0"
            value={runData.crop}
            onChange={(e) => updateRunData("crop", e.target.value)}
          >
            {cropOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Link
            href="/material-profiles"
            className="text-text-primary font-semibold ml-auto"
          >
            Go to Material Library
          </Link>
        </div>

        {/* Dryer */}
        <div className="grid gap-2 w-full">
          <label>Select Dryer</label>
          <select
            className="border bg-input-bg border-black/20 rounded-lg px-4 py-2 outline-0"
            value={runData.dryer}
            onChange={(e) => updateRunData("dryer", e.target.value)}
          >
            {availableDryers.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Link
            href="/dryer-profile"
            className="text-text-primary font-semibold ml-auto"
          >
            Go to Dryer Library
          </Link>
        </div>

        <p>
          OR{" "}
          <Link
            href="/saved-runs"
            className="text-text-primary font-semibold ml-auto"
          >
            Choose From Saved Runs
          </Link>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <Link
        className={`w-full ${
          !canProceed ? "pointer-events-none opacity-50" : ""
        }`}
        href="/new-run/moisture-content"
        onClick={handleProceed}
      >
        <Button className="w-full mt-4" name="Proceed" />
      </Link>
    </>
  );
};

export default DashboardScreen;
