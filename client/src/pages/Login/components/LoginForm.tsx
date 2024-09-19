import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useDispatch } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/store/slice/userSlice";
import {PROJECT_PLANNER, REGISTER} from "@/constants/constants";
import { LoginDataType } from "@/types/AuthenticationTypes";
import { LoginSchema } from "@/validation/schemas";
import LoginSvg from "@/assets/img/login.svg"
import {loginApi} from "@/api/auth/auth.ts";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onError: (error) => {
      const statusCode =
        error.message.split(" ")[error.message.split(" ").length - 1];
      if (parseInt(statusCode) === 400 || parseInt(statusCode) === 404) {
        setErrorMessage("Wrong credentials, please try again.");
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    },
    onSuccess: (data) => {
      dispatch(login(data));
      navigate(PROJECT_PLANNER);
    },
  });

  async function handleLogin() {
    const loginData: LoginDataType = {
      email: email,
      password: password,
    };
    const validation = LoginSchema.safeParse(loginData);
    if (!validation.success) {
      setErrorMessage(
        JSON.parse(
          validation.error.message
            .slice(validation.error.message.search("message"))
            .split(":")[1]
            .split(",")[0]
        )
      );
      return;
    }
    loginMutation.mutate({ email, password });
  }

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 10000);
  });
  return (
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[1000px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                      to="#"
                      className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </div>
              <Button type="submit" className="w-full" onClick={handleLogin}>
                Login
              </Button>
              {errorMessage && <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {errorMessage}
                </AlertDescription>
              </Alert>}
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={REGISTER} className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Avatar className="h-4/5 w-full object-cover">
            <AvatarImage src={LoginSvg} alt="login-image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
  );
}

export default LoginForm;
