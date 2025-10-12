"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: "email" | "password" | "text" | "number";
  label: string;
  placeholder?: string;
}

const Input = ({ type = "text", label, placeholder }: InputProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative grid gap-1">
      <label className="text-dark-blue font-semibold" htmlFor="">
        {label}
      </label>
      <div className="border relative  bg-input-bg border-black/20 rounded-lg px-4 py-2">
        <input
          className="border-0 w-full placeholder:text-gray-400 outline-0"
          placeholder={placeholder}
          type={type === "password" ? (visible ? "text" : "password") : type}
        />
        {type === "password" && (
          <div
            onClick={() => setVisible(!visible)}
            className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 p-4"
          >
            {visible ? (
              <FaEye className="text-gray-500" />
            ) : (
              <FaEyeSlash className="text-gray-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
