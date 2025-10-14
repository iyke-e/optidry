import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  className?: string;
  variant?: "white" | "default" | "red" | "outline";
}

const Button = ({
  name,
  className = "",
  variant = "default",
  disabled = false,
  ...props
}: ButtonProps) => {
  const base =
    "px-6 py-3 font-geist-mono cursor-pointer text-nowrap rounded-lg transition-all duration-200";

  const variants: Record<string, string> = {
    default: "bg-secondary text-white hover:opacity-90",
    white: "bg-white text-secondary hover:bg-gray-100",
    red: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white",
  };

  const disabledStyles =
    "bg-secondary opacity-20 text-white cursor-not-allowed opacity-70";

  return (
    <button
      disabled={disabled}
      className={`${base} ${
        disabled ? disabledStyles : variants[variant]
      } ${className}`}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
