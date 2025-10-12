import Button from "@/components/ul/Button";
import Input from "@/components/ul/Input";
import Link from "next/link";
import React from "react";

const SetValue = () => {
  return (
    <div>
      <h2 className="text-center text-dark-blue text-lg font-semibold">
        Set initial and Targer final moisture content
      </h2>
      <div className="grid gap-6 my-8 ">
        <Input label="Initial Moisture Content" type="text" />
        <Input label="Target/Final Moisture Content" type="text" />
      </div>

      <Link className="w-full" href={"/new-run/sensor-check"}>
        <Button className="w-full" name={"Proceed"} />
      </Link>
    </div>
  );
};

export default SetValue;
