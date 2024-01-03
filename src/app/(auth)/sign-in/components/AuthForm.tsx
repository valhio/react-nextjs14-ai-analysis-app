"use client"; // use client means that this file will be executed only in the browser, not in the server. What this means is that we can use browser specific code here, like the DOM API, and it will not break the build.

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle, BsFacebook } from "react-icons/bs";
import axios from "axios";
// import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

type Variant = "LOGIN" | "REGISTER" | "FORGOT_PASSWORD";

interface AuthFormProps {
  // Login or Register state
  setSelectedVariant: Dispatch<SetStateAction<Variant>>;
}

// const AuthForm = ({onSelectedVariant}: AuthFormProps) => {
const AuthForm = ({ setSelectedVariant }: AuthFormProps) => {
  const session = useSession(); // useSession is a hook from the next-auth library that returns the session object. The session object contains the user's session data (e.g. name, email, etc.). If the user is not logged in, it returns null.
  const router = useRouter();
  const searchParams = useSearchParams();
  const variantFromUrl = searchParams.get("variant")?.toUpperCase();
  const [variant, setVariant] = useState<Variant>(
    variantFromUrl && variantFromUrl === "REGISTER" ? "REGISTER" : "LOGIN"
  );
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // useEffect is a hook that runs a function after the component is rendered. In this case, it runs the function when the session changes. This is useful when you want to do something when the session changes (e.g. show a toast message when the user logs in).
    if (session?.status === "authenticated") {
      router.push(callbackUrl);
      toast({
        title: "Logged in successfully",
        description: "You are now logged in.",
      });
    }
  }, [session?.status, router, toast, callbackUrl]);

  const toggleVariant = useCallback(() => {
    // useCallback is a hook that returns a memoized callback. What this means is that the function will only be created once, and then it will be reused on subsequent renders. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).
    if (variant === "LOGIN") {
      setVariant("REGISTER");
      setSelectedVariant("REGISTER");
    } else if (variant === "REGISTER") {
      setVariant("LOGIN");
      setSelectedVariant("LOGIN");
    } else if (variant === "FORGOT_PASSWORD") {
    }
  }, [variant, setSelectedVariant]); // this variable "variant" and "setSelectedVariant" are called inside the function, so we need to add them to the dependencies array

  const {
    // These are the exported functions from react-hook-form
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Should this run on client side or server side? If it runs on client side, then the user can see the error message. If it runs on server side, then the user cannot see the error message.
    setIsLoading(true);

    if (variant === "LOGIN") {
      // NextAuth Login Call
      // signIn is a function from the next-auth library that sends a request to the server to log in the user. It returns a promise that resolves to an object with a session property that contains the user's session data (e.g. name, email, etc.). If there is an error, it rejects with an object that contains an error property that contains the error message.
      signIn("credentials", {
        // credentials is the provider, and the second argument is the data we are sending to the server. In this case, it is the form data that the user entered (email, password).
        ...data,
        redirect: false, // redirect: false means that the server will not redirect the user to the login page if there is an error. Instead, it will return the error message in the response.
      })
        .then((response) => {
          if (response?.error)
            toast({
              title: "An error occurred. Please try again.",
              description:
                "If the problem persists, please contact support or try again later.",
              variant: "destructive",
            });
          if (response?.ok && !response?.error) {
            router.push(callbackUrl);
            toast({
              title: "Logged in successfully",
              description: "You are now logged in.",
            });
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "REGISTER") {
      // Axios Register Call
      // this is the same as axios.post("http://localhost:3000/api/register", data);. The reason we can use /api/register is because we have a proxy in our package.json file that redirects all requests to /api to http://localhost:3000/api.
      // /api/register is the path because we have a route in app/api/register/route.ts that handles the request
      // data is the data we are sending to the server. In this case, it is the form data that the user entered (name, email, password).
      // Axios is a library that allows us to make HTTP requests. It is similar to fetch, but it has some extra features that make it easier to use (e.g. it automatically converts the response to JSON, it has a built-in way to handle errors, etc.)
      axios
        .post("/api/register", data)
        .then((response) => signIn("credentials", data))
        .catch((error) => {
          // error.response.data is the response from the server. In this case, it is an object with a message property that contains the error message.
          toast({
            title: "An error occurred. Please try again.",
            description:
              "If the problem persists, please contact support or try again later.",
            variant: "destructive",
          });
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "FORGOT_PASSWORD") {
      // forgot password
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth Social Login Call
    signIn(action, { redirect: false })
      .then((response) => {
        if (response?.error)
          toast({
            title: "An error occurred. Please try again.",
            variant: "destructive",
          });
        if (response?.ok && !response?.error) router.push("/");
      })
      .finally(() => setIsLoading(false));
  };

  // handleSubmit passes the form data to the onSubmit function when the form is submitted. It also prevents the default browser behavior of reloading the page.
  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}>
              {variant === "LOGIN" && "Login"}
              {variant === "REGISTER" && "Register"}
              {variant === "FORGOT_PASSWORD" && "Reset Password"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-rila-orange focus:ring-rila-orange border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            {variant === "LOGIN" && (
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex-col space-y-2">
              <AuthSocialButton
                icon={BsGithub}
                social="Github"
                text="Sign in with Github"
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                social="Google"
                text="Sign in with Google"
                onClick={() => socialAction("google")}
              />
              <AuthSocialButton
                icon={BsFacebook}
                social="Facebook"
                text="Sign in with Facebook"
                onClick={() => socialAction("facebook")}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="text-sm text-gray-600 hover:text-gray-500 hover:underline">
              {variant === "LOGIN" && (
                <a
                  href="#"
                  onClick={toggleVariant}
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Don&apos;t have an account? Register
                </a>
              )}
              {variant === "REGISTER" && (
                <a
                  href="#"
                  onClick={toggleVariant}
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Already have an account? Login
                </a>
              )}
              {variant === "FORGOT_PASSWORD" && (
                <a
                  href="#"
                  onClick={toggleVariant}
                  className="font-medium text-rila-orange hover:text-rila-orange-hover">
                  Cancel
                </a>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
