"use client";

import Link from "next/link";
import Button from "@/components/ul/Button";
import { useDryerStore } from "@/store/useDryerStore";
import { useState } from "react";

const materialsToDry = [
  { label: "Select Material", value: "" },
  { label: "Maize (Corn)", value: "maize" },
  { label: "Cassava (Chips, Garri, Flour)", value: "cassava" },
  { label: "Rice (Paddy or Parboiled)", value: "rice" },
  { label: "Yam (Flakes or Chips)", value: "yam" },
  { label: "Plantain (Chips or Powder)", value: "plantain" },
  { label: "Pepper (Chili, Red, Green)", value: "pepper" },
  { label: "Tomato", value: "tomato" },
  { label: "Okra", value: "okra" },
  { label: "Fish (Smoked or Dried)", value: "fish" },
  { label: "Groundnut (Peanut)", value: "groundnut" },
  { label: "Beans (Cowpea, Soya bean)", value: "beans" },
  { label: "Cocoa Beans", value: "cocoa_beans" },
  { label: "Onion", value: "onion" },
  { label: "Ginger", value: "ginger" },
  { label: "Palm Kernel or Palm Fruit Fiber", value: "palm_fiber" },
];

const dryerTypes = [
  { label: "Select Dryer Type", value: "" },
  { label: "Tray", value: "tray" },
  { label: "Cabinet", value: "cabinet" },
  { label: "Rotary", value: "rotary" },
  { label: "Solar", value: "solar" },
  { label: "Fluidized Bed", value: "fluidized_bed" },
  { label: "Conveyor", value: "conveyor" },
  { label: "Oven", value: "oven" },
  { label: "Hybrid Solar Electric Dryer", value: "hybrid_solar_electric" },
];

const DashboardScreen = () => {
  const { runData, updateRunData } = useDryerStore();
  const [error, setError] = useState("");

  const canProceed = runData.crop && runData.dryer;

  const handleProceed = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canProceed) {
      e.preventDefault();
      setError("Please select both material and dryer type.");
    } else {
      setError("");
    }
  };

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
            className="border relative outline-0 bg-input-bg border-black/20 rounded-lg px-4 py-2"
            value={runData.crop}
            onChange={(e) => updateRunData("crop", e.target.value)}
          >
            {materialsToDry.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Link
            href="/dryer-library"
            className="text-text-primary font-semibold ml-auto"
          >
            Go to Material Library
          </Link>
        </div>

        {/* Dryer */}
        <div className="grid gap-2 w-full">
          <label>Select Dryer</label>
          <select
            className="border relative outline-0 bg-input-bg border-black/20 rounded-lg px-4 py-2"
            value={runData.dryer}
            onChange={(e) => updateRunData("dryer", e.target.value)}
          >
            {dryerTypes.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Link
            href="/dryer-library"
            className="text-text-primary font-semibold ml-auto"
          >
            Go to Dryer Library
          </Link>
        </div>

        <p>
          OR{" "}
          <Link
            href="/dryer-library"
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
