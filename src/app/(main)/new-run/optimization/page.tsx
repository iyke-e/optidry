import Button from "@/components/ul/Button";
import Link from "next/link";
import React from "react";

const Optimization = () => {
  return (
    <div>
      <div className="grid gap-6 ">
        <div className="flex justify-between items-center">
          <p className="text-xl flex items-center gap-2">Material</p>
          <p className="text-text-primary font-semibold">Peas</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl flex items-center gap-2">Dryer Type</p>
          <p className="text-text-primary font-semibold">Tray dryer</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl flex items-center gap-2">
            Initial Moisture Content:
          </p>
          <p className="text-text-primary font-semibold">50%</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl flex items-center gap-2">
            Target Moisture Content:
          </p>
          <p className="text-text-primary font-semibold">5%</p>
        </div>

        <div className="flex gap-4">
          <input type="checkbox" />
          <p className="text-text-primary">
            I have verified that sensor connections, material loading, and
            safety checks are complete and the dryer is ready to operate.
          </p>
        </div>

        <div className="flex  items-center gap-10 justify-center">
          <Button name={"Go Back"} />
          <Link href={"/new-run/optimization"}>
            <Button name={"Start Optimizing"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Optimization;
