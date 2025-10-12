import authsideimg from "@/assets/images/authsideimg.png";
import Logo from "@/components/ul/Logo";
import GoogleSignIn from "@/components/ul/GoogleSignIn";
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  googleTitle: string;
  message: string;
  subMessage: string;
}

const AuthWrapper = ({
  children,
  googleTitle,
  message,
  subMessage,
}: AuthWrapperProps) => {
  return (
    <div className="grid  grid-cols-[3fr_4fr] min-h-screen p-4">
      <div
        style={{ backgroundImage: `url(${authsideimg.src})` }}
        className="w-full bg-cover sticky left-4 top-4  rounded-xl bg-no-repeat bg-center"
      />
      <div className="py-8 ml-20  max-w-140">
        <Logo />
        <h1 className="text-5xl font-bold mt-4">{message}</h1>
        <p className="text-dark-blue font-semibold mt-2">{subMessage}</p>

        <div className="mt-6 ">
          <GoogleSignIn title={googleTitle} />
        </div>
        <div className="text-center my-6 flex items-center gap-4 text-dark-blue ">
          <span className="border-b h-0.5 border-dashed border-black/40 inline-block  w-full " />
          OR
          <span className="border-b h-0.5 border-dashed border-black/40  inline-block  w-full " />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
