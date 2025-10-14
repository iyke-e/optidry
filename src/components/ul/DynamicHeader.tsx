"use client";

import { usePathname } from "next/navigation";

export default function DynamicHeader() {
  const pathname = usePathname();

  const titles: Record<string, string> = {
    "/new-run": "What are we drying today?",
    "/new-run/moisture-content": "Moisture Content",
    "/new-run/moisture-content/set-value": "Moisture Content",
    "/new-run/sensor-check": "Checking Your Sensors...",
    "/new-run/optimization": "Ready to Begin Optimzing?",
    "/new-run/optimization/optimization-run": "Optimzation Running...",
    "/new-run/optimization/optimization-report":
      "Optimization Finished Successfully!",
    "/new-run/notes": "",
    "/materials": "Material Profiles",
    "/dryer": "Dryer Profiles",
  };

  const title = titles[pathname] || "";

  return (
    <>
      <p className="text-white">Welcome, Mrs Megan</p>
      <h1 className="text-center text-3xl mt-8 text-white">{title}</h1>
    </>
  );
}
