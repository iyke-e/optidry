"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/ul/Button";
import hero from "@/assets/images/heroimg.png";
import Link from "next/link";

const Home = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="bg-primary min-h-screen pt-6 relative">
      <Header setShowDemo={setShowDemo} />

      {/* Hero Section */}
      <h1 className="text-6xl leading-20 mt-20 text-center font-electrolize">
        Optimize your drying process <br />
        with <span className="text-white">Real-time Insights</span> and{" "}
        <span className="text-white">
          AI <br /> Recommendations.
        </span>
      </h1>
      <p className="text-center font-semibold text-2xl mt-6">
        Welcome to OptiDry, your smart drying optimization assistant.
      </p>

      {/* Buttons */}
      <div className="flex gap-6 items-center mt-8 justify-center">
        <Button onClick={() => setShowDemo(true)} name="View demo" />
        <Link href={"/auth/login"}>
          <Button name="Start Monitoring" />
        </Link>
      </div>

      {/* Hero Image */}
      <div
        className="h-80 relative mx-auto mt-20 max-w-222 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.src})` }}
      >
        <div className="bg-white rounded-lg font-semibold absolute bottom-20 -left-14 w-40 px-6 py-2 text-center">
          Real Time <br /> Monitoring
        </div>
        <div className="bg-white rounded-lg font-semibold absolute w-40 top-20 -right-14  px-6 py-2 text-center">
          AI <br /> Insights
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full max-w-4xl mx-4">
            <video
              src="/demo.mp4"
              controls
              autoPlay
              className="w-full rounded-lg shadow-lg"
            />
            <button
              onClick={() => setShowDemo(false)}
              className="absolute -top-10 right-0 text-white text-lg font-semibold"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
