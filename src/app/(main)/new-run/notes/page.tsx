import Button from "@/components/ul/Button";
import React from "react";

const NoteScreen = () => {
  return (
    <div>
      <h2 className={"mb-2 text-text-primary font-semibold"}>Add User Notes</h2>
      <textarea
        className="w-full h-50 rounded-lg bg-input-bg"
        name=""
        id=""
        cols={5}
      ></textarea>
      <Button className="mt-4 ml-auto" name="Save" />
    </div>
  );
};

export default NoteScreen;
