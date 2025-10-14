import Button from "@/components/ul/Button";
import SelectInput from "@/components/ul/Select";
import React from "react";

const SettingsScren = () => {
  return (
    <div className="grid gap-6">
      <SelectInput options={languages} label="Select Language" />
      <SelectInput options={bases} label="Select Basis" />
      <SelectInput options={siUnits} label="Select System of Unit" />
      <SelectInput options={modes} label="Select Display Mode" />
      <Button name="Save" />
    </div>
  );
};

export default SettingsScren;

const languages = [
  { label: "English", value: "english" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Chinese", value: "chinese" },
  { label: "Japanese", value: "japanese" },
  { label: "Korean", value: "korean" },
  { label: "Arabic", value: "arabic" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Russian", value: "russian" },
  { label: "Italian", value: "italian" },
  { label: "Dutch", value: "dutch" },
  { label: "Turkish", value: "turkish" },
  { label: "Hindi", value: "hindi" },
  { label: "Bengali", value: "bengali" },
  { label: "Urdu", value: "urdu" },
  { label: "Swahili", value: "swahili" },
  { label: "Vietnamese", value: "vietnamese" },
  { label: "Thai", value: "thai" },
  { label: "Greek", value: "greek" },
  { label: "Hebrew", value: "hebrew" },
  { label: "Polish", value: "polish" },
  { label: "Swedish", value: "swedish" },
  { label: "Norwegian", value: "norwegian" },
  { label: "Danish", value: "danish" },
  { label: "Finnish", value: "finnish" },
  { label: "Czech", value: "czech" },
  { label: "Hungarian", value: "hungarian" },
  { label: "Romanian", value: "romanian" },
  { label: "Indonesian", value: "indonesian" },
  { label: "Malay", value: "malay" },
  { label: "Filipino", value: "filipino" },
  { label: "Persian", value: "persian" },
  { label: "Ukrainian", value: "ukrainian" },
  { label: "Tamil", value: "tamil" },
  { label: "Telugu", value: "telugu" },
  { label: "Kannada", value: "kannada" },
  { label: "Marathi", value: "marathi" },
  { label: "Gujarati", value: "gujarati" },
  { label: "Zulu", value: "zulu" },
  { label: "Afrikaans", value: "afrikaans" },
];

const siUnits = [
  { label: "meter (m)", value: "m" },
  { label: "kilogram (kg)", value: "kg" },
  { label: "second (s)", value: "s" },
  { label: "ampere (A)", value: "A" },
  { label: "kelvin (K)", value: "K" },
  { label: "mole (mol)", value: "mol" },
  { label: "candela (cd)", value: "cd" },
];

const bases = [
  { label: "wet basis", value: "wet" },
  { label: "dry basis", value: "dry" },
  { label: "mole basis", value: "mole" },
  { label: "mass basis", value: "mass" },
  { label: "volume basis", value: "volume" },
  { label: "energy basis", value: "energy" },
  { label: "atomic basis", value: "atomic" },
];

const modes = [
  { label: "light mode", value: "light" },
  { label: "dark mode", value: "dark" },
];
