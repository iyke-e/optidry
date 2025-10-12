import { redirect } from "next/navigation";

const AuthRootPage = () => {
  redirect("/auth/login");
};

export default AuthRootPage;
