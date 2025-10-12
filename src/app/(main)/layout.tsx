import SidemenuWrapper from "@/components/SideMenuWraper";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <SidemenuWrapper>{children}</SidemenuWrapper>;
};

export default MainLayout;
