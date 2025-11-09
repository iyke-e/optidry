"use client";

import Button from "@/components/ul/Button";
import { useDryerStore } from "@/store/useDryerStore";
import Link from "next/link";
import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import cropdata from "@/data/crop_dryer_data.json";

const MoistureScreen = () => {
  const { runData } = useDryerStore();
  const { crop } = runData;

  const selectedCrop = cropdata.find((item) => item.Crop === crop);

  const initialMC = selectedCrop ? selectedCrop["Initial MC (Max %)"] : null;
  const finalMC = selectedCrop ? selectedCrop["Final MC (Max %)"] : null;

  return (
    <div className="grid gap-6 ">
      <p className="text-xl flex items-center gap-2">
        <FaCircleExclamation className="text-text-primary" /> Typical Initial
        Moisture Content of {crop || "—"} ={" "}
        <span className="text-text-primary">
          {initialMC !== null ? `${initialMC}%` : "N/A"}
        </span>
      </p>
      <p className="text-xl flex items-center gap-2">
        <FaCircleExclamation className="text-text-primary " /> Typical Storage
        Final Moisture Content of {crop || "—"} ={" "}
        <span className="text-text-primary">
          {finalMC !== null ? `${finalMC}%` : "N/A"}
        </span>
      </p>
      <p className="text-xl text-center">
        Default values are loaded from the Material Library. You can modify them
        based on your sample analysis.
      </p>

      <div className="flex mt-10 items-center gap-10 justify-center">
        <Link href={"/new-run/moisture-content/set-value"}>
          <Button name={"Set Custom Values"} />
        </Link>
      </div>
    </div>
  );
};

export default MoistureScreen;
