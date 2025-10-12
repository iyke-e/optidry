import Image from "next/image";
import LogoIcon from "@/assets/svg/logo.svg";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo = ({ width = 140, height = 20, ...prop }: LogoProps) => {
  return (
    <Image
      src={LogoIcon}
      width={width}
      height={height}
      className=""
      alt="logo"
      {...prop}
    />
  );
};

export default Logo;
