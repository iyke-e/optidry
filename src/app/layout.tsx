import type { Metadata } from "next";
import "./globals.css";
import "./App.css";

export const metadata: Metadata = {
  title: "optidry",
  description:
    "A web platform that uses data-driven insights to optimize drying processes, improving efficiency, reducing energy consumption, and ensuring consistent product quality across industrial and agricultural applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#58A3B]">{children}</body>
    </html>
  );
}
