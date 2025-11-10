import React from "react";
import Button from "@/components/ul/Button";

const dryerList = [
  {
    name: "Tray Dryer",
    description:
      "Uses heated air circulated through trays to remove moisture from materials. Suitable for grains, fruits, and vegetables with moderate drying times and uniform results.",
  },
  {
    name: "Cabinet Dryer",
    description:
      "An enclosed unit with controlled air temperature and velocity. Commonly used for small to medium-scale drying of crops and food products under hygienic conditions.",
  },
  {
    name: "Rotary Dryer",
    description:
      "A rotating cylindrical drum that moves materials while hot air passes through. Ideal for bulk drying of grains, chips, or powders due to high efficiency and continuous operation.",
  },
  {
    name: "Fluidized-Bed Dryer",
    description:
      "Blows hot air upward through a perforated bed, causing particles to behave like a fluid. Ensures fast and uniform drying, especially effective for small granules or seeds.",
  },
  {
    name: "Solar Dryer",
    description:
      "Uses solar energy to heat air that circulates through the drying chamber. A low-cost, eco-friendly option suitable for rural or off-grid crop drying.",
  },
  {
    name: "Oven Dryer",
    description:
      "Applies controlled heat using electrical or gas energy inside an insulated chamber. Common in laboratory or small-scale food processing for precise moisture removal.",
  },
  {
    name: "Microwave",
    description:
      "Uses electromagnetic waves to heat water molecules directly inside materials. Provides very rapid drying with minimal nutrient loss, often used for fruits and vegetables.",
  },
];

const DryerProfileScreen = () => {
  return (
    <div className=" py-8">
      <div className="grid grid-cols-3 gap-8">
        {dryerList.map((item, index) => (
          <div className=" bg-white  p-2 rounded-lg" key={index}>
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
