import React from "react";

interface ButtonProp {
  name: string;
  className?: string;
  variant?: "white" | "default";
}

const Button = ({
  name,
  className,
  variant = "default",
  ...props
}: ButtonProp) => {
  return (
    <button
      className={`px-6 py-3 cursor-pointer font-geist-mono rounded-lg & ${
        variant === "white"
          ? "bg-white  text-secondary"
          : "bg-secondary  text-white"
      } ${className}`}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
