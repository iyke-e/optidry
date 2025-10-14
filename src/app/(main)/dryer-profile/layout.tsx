import DynamicHeader from "@/components/ul/DynamicHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, #166074, #166074, rgba(0,0,0,0))`,
      }}
      className="h-full grid grid-rows-[auto_1fr] pt-12 px-8"
    >
      <div>
        <DynamicHeader />
      </div>

      {children}
    </div>
  );
};

export default layout;
