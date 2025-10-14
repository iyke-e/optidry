"use client";
import React, { useState } from "react";
import { BsFillFolderFill } from "react-icons/bs";
import { FaSortAmountUpAlt } from "react-icons/fa";

const savedrunslist = [
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
  {
    name: "Maize ",
    dryer: "Tray Dryer",
    date: "20.10.25",
  },
];

const SavedRunScreen = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  return (
    <div className="px-12 py-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-text-primary text-3xl font-bold">
            Saved Runs/Presets
          </h1>
          <p className="text-semibold">
            Explore your saved drying simulations. Revisit results, compare
            runs, and track your optimization progress.
          </p>
        </div>

        <div className="relative ">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="cursor-pointer flex gap-2 items-center"
          >
            Sort By <FaSortAmountUpAlt className="text-text-primary" />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 -bottom-24">
              <ul className="bg-secondary  rounded-lg grid px-2 text-white ">
                <li
                  onClick={() => setIsSortOpen(false)}
                  className="text-right cursor-pointer px-2"
                >
                  x
                </li>
                <li className="px-8 py-2 cursor-pointer border-b border-white">
                  Date
                </li>
                <li className="px-8 py-2 cursor-pointer border-b border-white">
                  Crop
                </li>
                <li className="px-8 py-2 cursor-pointer  border-white">
                  Dryer
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-8 flex-wrap gap-8">
        {savedrunslist.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer hover:scale-105 transition-all"
          >
            <BsFillFolderFill className="w-22 text-primary h-20" />

            <div className="text-center text-sm font-semibold">
              <p>{item.name}</p>
              <p>{item.dryer}</p>
              <p>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRunScreen;
