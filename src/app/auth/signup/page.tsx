import Button from "@/components/ul/Button";
import Input from "@/components/ul/Input";
import authsideimg from "@/assets/images/authsideimg.png";
import Logo from "@/components/ul/Logo";
import Link from "next/link";
import GoogleSignIn from "@/components/ul/GoogleSignIn";
import AuthWrapper from "@/components/Auth";

const SignupScreen = () => {
  return (
    <AuthWrapper
      subMessage="Create an Account"
      message="Let's Get Started"
      googleTitle="Sign up with Google"
    >
      <form className=" grid gap-4">
        <Input
          label="Full Name"
          type={"text"}
          placeholder="e.g Micheal Jordan"
        />
        <Input label="Email" type={"email"} placeholder="Example@optidry.com" />
        <div>
          <Input
            label="Password"
            type={"password"}
            placeholder="8+ Characters"
          />
          <div className="grid mt-2 mb-4">
            <p className="text-gray-500 text-sm">
              By clicking Signup you hereby agree to the{" "}
              <Link
                className="text-secondary font-semibold"
                href={"/auth/forgotpassword"}
              >
                Terms and condition
              </Link>
            </p>
          </div>
        </div>

        <Button name="Signup" />
      </form>
      <div className="mt-6">
        <p className="text-center ">
          Already own an account?{" "}
          <Link className="text-secondary font-semibold" href={"/auth/login"}>
            Login
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default SignupScreen;
