"use client";

import Button from "@/components/ul/Button";
import { useDryerStore } from "@/store/useDryerStore";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import cropdata from "@/data/crop_dryer_data.json";
import { useRouter } from "next/navigation";

const MoistureScreen = () => {
  const { runData, updateRunData } = useDryerStore();
  const { crop } = runData;
  const router = useRouter();

  const selectedCrop = cropdata.find((item) => item.Crop === crop);

  const initialMC = selectedCrop ? selectedCrop["Initial MC (Max %)"] : null;
  const finalMC = selectedCrop ? selectedCrop["Final MC (Max %)"] : null;

  useEffect(() => {
    updateRunData("initial_moisture_content", initialMC ?? null);
    updateRunData("final_moisture_content", finalMC ?? null);
  }, [initialMC, finalMC, updateRunData]);

  return (
    <div className="grid gap-6">
      <p className="text-xl flex items-center gap-2">
        <FaCircleExclamation className="text-text-primary" />
        Typical Initial Moisture Content of {crop || "—"} ={" "}
        <span className="text-text-primary">
          {initialMC !== null ? `${initialMC}%` : "N/A"}
        </span>
      </p>

      <p className="text-xl flex items-center gap-2">
        <FaCircleExclamation className="text-text-primary" />
        Typical Storage Final Moisture Content of {crop || "—"} ={" "}
        <span className="text-text-primary">
          {finalMC !== null ? `${finalMC}%` : "N/A"}
        </span>
      </p>

      <p className="text-xl text-center">
        Default values are loaded from the Material Library. You can modify them
        based on your sample analysis.
      </p>

      <div className="flex mt-10 items-center gap-4 justify-center">
        <Button
          onClick={() => {
            router.back();
          }}
          name="Go back"
        />
        <Button
          onClick={() => router.push("/new-run/sensor-check")}
          name="Set Custom Value"
        />
        <Button
          onClick={() => router.push("/new-run/sensor-check")}
          name="Proceed"
        />
      </div>
    </div>
  );
};

export default MoistureScreen;
