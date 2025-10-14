import React from "react";

const HelpScreen = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-xl mb-8">
        Welcome to OptiDry — your smart drying optimization assistant. Here’s a
        quick overview of how everything works{" "}
      </h2>
      <div className="grid gap-6">
        {helpiList.map((item, index) => (
          <div key={index}>
            <p className="text-lg text-text-primary font-semibold mb-2">
              {index + 1}. {item.title}
            </p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpScreen;

const helpiList = [
  {
    title: "Selecting a Material",
    description: `Choose the crop you’re drying.
OptiDry automatically loads its recommended drying parameters (like temperature, initial and final storage moisture content) from the Material Library.
`,
  },
  {
    title: "Choosing a Dryer",
    description: `Pick your dryer type 
The Dryer Library adjusts the control limits and readings to match your setup.

`,
  },
  {
    title: "Running a Session",
    description: `After you press Start Monitoring, OptiDry connects to the sensors and starts tracking: Temperature, Humidity, Vibration / Airflow (for performance monitoring)
You’ll see live data, trends, and optimization tips in real time.
`,
  },
  {
    title: "Saving & Presets",
    description: `Every completed run can be saved as a preset for future reference.
You can also export your data as a PDF or CSV file for reports.
`,
  },
  {
    title: "Optimization Tips",
    description: `OptiDry compares live readings with ideal drying conditions from the library and gives suggestions to: Improve drying speed, Prevent overheating, Maintain product quality.
`,
  },
  {
    title: "When Power Fails",
    description: `The system stays active using backup power. You’ll get alerts if the dryer stops receiving power or if critical readings go off range
`,
  },
];
