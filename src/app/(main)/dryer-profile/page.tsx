import React from "react";
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
    <div className=" py-8">
      <div className="grid grid-cols-3 gap-8">
        {dryerList.map((item, index) => (
          <div className=" bg-white  p-2 rounded-lg" key={index}>
            <div className="h-30  bg-gray-400  rounded-md" />
            <div className="px-2 pb-2">
              <h3 className="text-text-primary text-xl mb-2 mt-4">
                {item.name}
              </h3>
              <p className="mb-4">{item.description}</p>
              <div className="grid place-content-end">
                <Button className="ml-auto" name="Select" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DryerProfileScreen;
