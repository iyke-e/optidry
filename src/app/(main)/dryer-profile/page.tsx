import React from "react";
import { FaSearch } from "react-icons/fa";
import Button from "@/components/ul/Button";

const dryerList = [
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
  {
    name: "Tray Dryer",
    description: "This is a place holder descrition text for the tray type",
  },
];

const DryerProfileScreen = () => {
  return (
    <div className="px-12 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-text-primary text-3xl font-bold">
            Dryer Profile
          </h1>
        </div>

        <div className="relative ">
          <FaSearch className="text-text-primary" />
        </div>
      </div>
      <div className="flex mt-8 flex-wrap gap-8">
        {dryerList.map((item, index) => (
          <div key={index}>
            <div className="h-20 w-40 bg-gray-400 rounded-md" />
            <h3 className="text-text-primary text-xl mb-2 mt-4">{item.name}</h3>
            <p className="mb-8">{item.description}</p>

            <Button className="ml-auto" name="Select" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DryerProfileScreen;
