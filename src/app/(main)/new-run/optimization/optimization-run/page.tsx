"use client";
import Button from "@/components/ul/Button";
import Link from "next/link";
import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const OptimizationRunScreen = () => {
  const [dryingProgress, setDryingProgress] = useState(45);
  return (
    <div>
      <h2 className="text-text-primary text-2xl text-center">
        Live Performance feed
      </h2>
      <div>
        <div className="grid grid-cols-2 gap-4 mt-8 border-x border-b-3 rounded-2xl p-6 border-secondary">
          <p>
            Material: <span className="text-text-primary">Peas</span>
          </p>
          <p>
            Dryer Type: <span className="text-text-primary">Tray Dryer</span>
          </p>

          <p>
            Initial Moisture Content:{" "}
            <span className="text-text-primary">50%</span>
          </p>
          <p>
            Target Moisture Content:
            <span className="text-text-primary">5%</span>
          </p>
          <p>
            Temperature: <span className="text-text-primary">50°C</span>
          </p>
          <p>
            Relative Humidity:
            <span className="text-text-primary">50</span>
          </p>
          <p>
            Drying Rate : <span className="text-text-primary">534</span>
          </p>

          <p>
            Vibration : <span className="text-text-primary">05</span>
          </p>
          <p>
            Estimated Drying Time :{" "}
            <span className="text-text-primary"> 05h 34min</span>
          </p>
          <p>
            Estimated Time Left :
            <span className="text-text-primary"> 05h 34min</span>
          </p>
          <p>
            Estimated Current Moisture :
            <span className="text-text-primary"> 34% </span>
          </p>
        </div>
        {/* progress bar */}
        <div className="mt-4">
          <p className="">Drying Process:</p>
          <div className="grid gap-8 items-center grid-cols-[1fr_auto]">
            <div className="border  border-black/40  bg-input-bg h-3 rounded-full">
              <div
                className={`bg-secondary w-[${dryingProgress}%]  h-full rounded-full`}
              ></div>
            </div>
            <p className="text-text-primary">{dryingProgress}%</p>
          </div>
        </div>

        {/* charts */}
        <div className="grid grid-cols-2 gap-20 items-center mt-8">
          <div>
            <div className="bg-input-bg h-40 rounded-xl "></div>
            <p className="text-text-primary text-center">Temperature Trend</p>
          </div>
          <div>
            <div className="bg-input-bg h-40 rounded-xl"></div>
            <p className="text-text-primary text-center">Humidity Trend</p>
          </div>
        </div>

        {/* optimization tips */}
        <div className="mt-8">
          <h3 className="text-text-primary mb-6">Optimization tips </h3>
          <ul className="grid gap-4">
            <li className="flex justify-between items-center border-b  border-b-secondary/20 pb-2">
              <div className="flex gap-2">
                <FaCircleExclamation className="text-text-primary w-5 h-6" />
                <p> Target Moisture Reached: Stop Drying. </p>
              </div>
              <span className="text-text-primary">1s</span>
            </li>
            <li className="flex justify-between border-b  border-b-secondary/20 pb-2">
              <div className="flex gap-2">
                <FaCircleExclamation className="text-text-primary w-6 h-6" />
                <p>
                  Rapid Heating Detected: Sudden temperature increase may damage
                  material. Verify heat control.
                </p>
              </div>
              <span className="text-text-primary">2s</span>
            </li>
            <li className="flex justify-between  border-b  border-b-secondary/20 pb-2">
              <div className="flex gap-2">
                <FaCircleExclamation className="text-text-primary w-6 h-6" />{" "}
                <p>
                  Rapid Heating Detected: Sudden temperature increase may damage
                  material. Verify heat control.
                </p>
              </div>
              <span className="text-text-primary">5s</span>
            </li>
          </ul>
        </div>

        {/* control buttons */}
        <div className="flex justify-evenly items-center gap-4 mt-8">
          <Button variant="outline" name={"Pause"} />
          <Link href={"/new-run/optimization/optimization-report"}>
            <Button name={"End Run"} />
          </Link>
          <Button disabled={true} name={"Save Log"} />
          <Button variant="red" name={"Stop Monitoring"} />
        </div>
      </div>
    </div>
  );
};

export default OptimizationRunScreen;
