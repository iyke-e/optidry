import React from "react";
import maize from "@/assets/svg/maize.svg";
import rice from "@/assets/svg/rice.svg";
import yam from "@/assets/svg/yam.svg";
import plantain from "@/assets/svg/plantain.svg";
import pepper from "@/assets/svg/pepper.svg";
import tomato from "@/assets/svg/tomato.svg";
import okra from "@/assets/svg/okra.svg";
import fish from "@/assets/svg/fish.svg";
import groundnut from "@/assets/svg/groundnut.svg";
import beans from "@/assets/svg/beans.svg";
import cocoa from "@/assets/svg/cocoa.svg";
import onion from "@/assets/svg/onion.svg";
import ginger from "@/assets/svg/ginger.svg";
import cassava from "@/assets/svg/cassava.svg";
import palmkernel from "@/assets/svg/palmkernel.svg";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const materialList = [
  {
    name: "Maize",
    icon: maize,
    color: "#FDBA2A",
  },
  {
    name: "Rice",
    icon: rice,
    color: "#A7D0D6",
  },
  {
    name: "Yam",
    icon: yam,
    color: "#D4396E",
  },
  {
    name: "Plantain",
    icon: plantain,
    color: "#FFC960",
  },
  {
    name: "Pepper",
    icon: pepper,
    color: "#DE5323",
  },
  {
    name: "Tomato",
    icon: tomato,
    color: "#FF2A23",
  },
  {
    name: "Okra",
    icon: okra,
    color: "#378F6C",
  },
  {
    name: "Fish",
    icon: fish,
    color: "#40C0E7",
  },
  {
    name: "Groundnut",
    icon: groundnut,
    color: "#F3AE38",
  },
  {
    name: "Beans",
    icon: beans,
    color: "#A62714",
  },
  {
    name: "Cocoa",
    icon: cocoa,
    color: "#A57939",
  },
  {
    name: "Onion",
    icon: onion,
    color: "#F8B772",
  },
  {
    name: "Ginger",
    icon: ginger,
    color: "#E5B27F",
  },
  {
    name: "Cassava",
    icon: cassava,
    color: "#472A16",
  },
  {
    name: "Palm Kernel",
    icon: palmkernel,
    color: "#F37C0B",
  },
];

const MateralScreen = () => {
  return (
    <div className="px-12 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-text-primary text-3xl font-bold">
            Material Profiles
          </h1>
          <p className="text-semibold">
            Explore your saved drying simulations. Revisit results, compare
            runs, and track your optimization progress.
          </p>
        </div>

        <div className="relative ">
          <FaSearch className="text-text-primary" />
        </div>
      </div>
      <div className="flex mt-8 flex-wrap gap-8">
        {materialList.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `linear-gradient(to top right, rgba(0,0,0,0), rgba(0,0,0,0), white, ${item.color})`,
            }}
            className="cursor-pointer relative rounded-lg  shadow-[0_0_20px_rgba(0,0,0,0.25)] hover:scale-105 w-34 h-20 grid place-content-center transition-all"
          >
            <p>{item.name}</p>
            <Image
              className="absolute top-0 right-0 translate-x-3 -translate-y-4"
              src={item.icon}
              alt=""
              width={60}
              height={60}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MateralScreen;
