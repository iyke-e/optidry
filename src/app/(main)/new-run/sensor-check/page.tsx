import Button from "@/components/ul/Button";
import Logo from "@/components/ul/Logo";
import Link from "next/link";
import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";

const SensorCheck = () => {
  return (
    <div>
      <div className="flex items-center mb-8">
        <Logo height={16} width={100} />

        <p className="text-text-primary font-semibold">
          Has Detected some sensors
        </p>
      </div>
      <div className="grid gap-6 ">
        <p className="text-xl flex items-center gap-2">
          <FaCircleExclamation className="text-text-primary" /> Temperature
          Sensor - Connected
        </p>
        <p className="text-xl flex items-center gap-2">
          <FaCircleExclamation className="text-text-primary " /> Humidity Sensor
          - Connected
        </p>
        <p className="text-xl flex items-center gap-2">
          <FaCircleExclamation className="text-text-primary " /> Vibration
          Sensor - Not Connected
        </p>
        <p className="text-xl text-center">
          Please confirm all sensors are properly mounted before proceeding
        </p>

        <div className="flex  items-center gap-10 justify-center">
          <Link href={"/new-run/sensor-check"}>
            <Button name={"Recheck"} />
          </Link>
          <Link href={"/new-run/optimization"}>
            <Button name={"Continue"} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SensorCheck;
