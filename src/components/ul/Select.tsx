import React from "react";

type option = {
  label: string;
  value: string;
};

interface SelectProp {
  options: option[];
  label: string;
}

const SelectInput = ({ options, label }: SelectProp) => {
  return (
    <div className="grid gap-2 w-full">
      <label htmlFor="">{label}</label>
      <select
        className="border relative outline-0  bg-input-bg border-black/20 rounded-lg px-4 py-2"
        name=""
        id=""
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
