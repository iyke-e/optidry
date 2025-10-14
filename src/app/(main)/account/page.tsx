import Input from "@/components/ul/Input";
import React from "react";

const Account = () => {
  return (
    <div>
      <div className="grid mx-auto w-40 h-40 bg-gray-200 rounded-full "></div>
      <h1 className="text-center text-text-primary mt-2">Mrs Megan</h1>
      <div className="grid gap-4 mt-8">
        <Input
          disabled={true}
          value={"Mrs Megan"}
          type="text"
          label="Display Name"
        />

        <Input
          disabled={true}
          value={"Jane Megan"}
          type="text"
          label="Full Name"
        />
        <Input
          disabled={true}
          value={"janenemeg@optidry.ng"}
          type="email"
          label="Email"
        />
        <Input
          disabled={true}
          value={"+2348109092029"}
          type="email"
          label="Phone Number"
        />
      </div>
    </div>
  );
};

export default Account;
