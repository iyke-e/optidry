import Link from "next/link";
import Button from "./ul/Button";
import Logo from "./ul/Logo";

const Header = () => {
  return (
    <div className="bg-white px-4  mx-auto rounded-lg flex justify-between items-center max-w-[980px]">
      <Logo />

      <ul className="flex gap-6 ">
        {navlist.map((item, index) => (
          <li key={index}>
            <Link className="font-medium" href={item.url}>
              {" "}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <Button name="View Demo" />
    </div>
  );
};

export default Header;

const navlist = [
  {
    name: "How it Works",
    url: "/howitworks",
  },
  {
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    name: "View Saved Runs",
    url: "/viewsavedruns",
  },
];
