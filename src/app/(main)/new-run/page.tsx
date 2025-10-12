"use client";

import Link from "next/link";
import Button from "@/components/ul/Button";

const materialsToDry = [
  { label: "Select Material", value: "" },
  { label: "Wood", value: "wood" },
  { label: "Grains", value: "grains" },
  { label: "Clay", value: "clay" },
  { label: "Paper", value: "paper" },
  { label: "Textiles", value: "textiles" },
  { label: "Paint Coatings", value: "paint_coatings" },
  { label: "Ceramics", value: "ceramics" },
  { label: "Fruits", value: "fruits" },
  { label: "Herbs", value: "herbs" },
  { label: "Seeds", value: "seeds" },
  { label: "Pharmaceutical Powders", value: "pharma_powders" },
  { label: "Concrete Mix", value: "concrete_mix" },
  { label: "Leather", value: "leather" },
  { label: "Compost", value: "compost" },
  { label: "Fish", value: "fish" },
];

const dryerTypes = [
  { label: "Select Dryer Type", value: "" },
  { label: "Tray Dryer", value: "tray_dryer" },
  { label: "Rotary Dryer", value: "rotary_dryer" },
  { label: "Fluidized Bed Dryer", value: "fluidized_bed_dryer" },
  { label: "Spray Dryer", value: "spray_dryer" },
  { label: "Drum Dryer", value: "drum_dryer" },
  { label: "Vacuum Dryer", value: "vacuum_dryer" },
  { label: "Freeze Dryer", value: "freeze_dryer" },
  { label: "Belt Dryer", value: "belt_dryer" },
];

const DashboardScreen = () => {
  return (
    <>
      <h2 className="text-xl mb-6 text-dark-blue font-semibold">
        Select Material and Dryer
      </h2>
      <div className="grid gap-4">
        <div className="grid gap-2 w-full">
          <label htmlFor="">Select Material</label>
          <select
            className="border relative outline-0  bg-input-bg border-black/20 rounded-lg px-4 py-2"
            name=""
            id=""
          >
            {materialsToDry.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Link
            href={"/dryer-library"}
            className="text-text-primary font-semibold ml-auto"
          >
            Go to Material Library
          </Link>
        </div>
        <div className="grid gap-2 w-full">
          <label htmlFor="">Select Dryer</label>
          <select
            className="border relative outline-0  bg-input-bg border-black/20 rounded-lg px-4 py-2"
            name=""
            id=""
          >
            {dryerTypes.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Link
            href={"/dryer-library"}
            className="text-text-primary font-semibold ml-auto"
          >
            Go to Dryer Library
          </Link>
        </div>

        <p>
          OR{" "}
          <Link
            href={"/dryer-library"}
            className="text-text-primary font-semibold ml-auto"
          >
            Choose From Saved Runs
          </Link>
        </p>
      </div>
      <div></div>
      <Link className="w-full" href={"/new-run/moisture-content"}>
        {" "}
        <Button className="w-full mt-4" name="Proceed" />
      </Link>
    </>
  );
};

export default DashboardScreen;
