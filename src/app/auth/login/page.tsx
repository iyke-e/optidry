import Button from "@/components/ul/Button";
import Input from "@/components/ul/Input";
import Link from "next/link";
import AuthWrapper from "@/components/Auth";

const LoginScreen = () => {
  return (
    <AuthWrapper
      subMessage="Login to your Account"
      message="Welcome Back!"
      googleTitle="Sign in with Google"
    >
      <form className=" grid gap-4">
        <Input label="Email" type={"email"} placeholder="Example@optidry.com" />
        <div>
          <Input
            label="Password"
            type={"password"}
            placeholder="8+ Characters"
          />
          <div className="grid place-content-end mt-2">
            <Link className="text-dark-blue" href={"/auth/forgotpassword"}>
              Forgot Password?
            </Link>
          </div>
        </div>

        <Link className="w-full" href={"/dashboard"}>
          <Button className={"w-full"} name="Login" />
        </Link>
      </form>
      <div className="mt-6">
        <p className="text-center ">
          {"Don't have an account?"}
          <Link className="text-secondary font-semibold" href={"/auth/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default LoginScreen;
