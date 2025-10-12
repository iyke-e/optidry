import googleicon from "@/assets/svg/googleicon.svg";
import Image from "next/image";

const GoogleSignIn = ({ title }: { title: string }) => {
  return (
    <button className="flex border border-black/20 py-3 px-4 rounded-lg items-center text-dark-blue font-semibold justify-center w-full gap-2">
      <Image src={googleicon} width={20} height={20} alt="google icon" />
      {title}
    </button>
  );
};

export default GoogleSignIn;
