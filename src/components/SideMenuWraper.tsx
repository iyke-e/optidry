"use client";
import Logo from "@/components/ul/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { BiSolidDryer } from "react-icons/bi";
import { FaChrome, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { LuLaptopMinimalCheck, LuLogOut } from "react-icons/lu";
import { MdHelp } from "react-icons/md";
import { SiMaterialformkdocs } from "react-icons/si";

const SidemenuWrapper = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  return (
    <div className="grid grid-cols-[320px_1fr]">
      <div>
        <div className="sticky bg-[#F8FAF9] top-0 left-0 h-screen">
          <Logo />

          <nav className="grid gap-6  py-8 px-8">
            {dashboardnavlist.map((item, index) => (
              <Link
                key={index}
                className={`${
                  pathName.includes(item.url) ? "bg-primary  text-white" : ""
                } flex rounded-2xl font-semibold py-2 px-4 shadow-2xl border-b-2 border-secondary gap-4 items-center`}
                href={item.url}
              >
                <item.icon />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default SidemenuWrapper;

const dashboardnavlist = [
  {
    name: "New Run",
    icon: FaChrome,
    url: "/new-run",
  },
  {
    name: "Saved Runs",
    icon: LuLaptopMinimalCheck,
    url: "/saved-runs",
  },
  {
    name: "Material Profiles",
    icon: SiMaterialformkdocs,
    url: "/material-profiles",
  },
  {
    name: "Dryer Profiles",
    icon: BiSolidDryer,
    url: "/dryer-profile",
  },
  {
    name: "Settings",
    icon: IoMdSettings,
    url: "/settings",
  },
  {
    name: "Account",
    icon: FaUser,
    url: "/account",
  },
  {
    name: "Help",
    icon: MdHelp,
    url: "/help",
  },
  {
    name: "Logout",
    icon: LuLogOut,
    url: "/logout",
  },
];
