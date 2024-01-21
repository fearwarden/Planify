import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import backgroundImageGreen from "@/assets/img/background.jpg";
import { api } from "@/hooks/api";
import { login } from "@/store/slice/userSlice";
import { HOME } from "@/constants/constants";

//TODO: consider moving to validation/schemas.ts file
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

type LoginDataType = z.infer<typeof LoginSchema>;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageGreen})`,
    backgroundSize: "cover",
  };

  const loginMutation = useMutation({
    mutationFn: (loginData: LoginDataType) => {
      return api.post("/api/v1/auth/login", loginData);
    },
    onError: (error, variable, context) => {
      const statusCode =
        error.message.split(" ")[error.message.split(" ").length - 1];
      if (parseInt(statusCode) === 400) {
        setErrorMessage("Wrong credentials, please try again.");
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    },
    onSuccess: (data, variable, context) => {
      dispatch(login(data.data));
      navigate(HOME);
    },
  });

  async function handleLoginV2() {
    const loginData: LoginDataType = {
      email: email,
      password: password,
    };
    const validation = LoginSchema.safeParse(loginData);
    if (!validation.success) {
      setErrorMessage(
        validation.error.message
          .slice(validation.error.message.search("message"))
          .split(":")[1]
          .split(",")[0]
      );
    }
    loginMutation.mutate({ email, password });
  }

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  });

  return (
    <div className="bg-cover" style={backgroundStyle}>
      <div className="grid min-h-screen place-items-center">
        <div
          className="w-11/12 p-12 bg-blue-500 bg-opacity-20 sm:w-8/12 md:w-1/2 lg:w-5/12 rounded-3xl relative"
          style={{
            maxWidth: "690px",
            border: "3px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          <h1 className="text-xl font-semibold text-white select-none	">
            Boris Antonijev WebApp / Welcome text{" "}
            <span className="font-normal">Login</span>
          </h1>
          <h1 className="text-3xl font-semibold text-white pt-4">Login</h1>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-lg font-normal text-white select-none	"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="borisantonijevseljak123@gmail.com"
              autoComplete="email"
              className="block w-full pl-6 mt-2 text-gray-700 bg-white appearance-none focus:outline-none focus:bg-gray-100 focus:shadow-inner rounded-xl h-14 border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="block mt-8 text-lg font-normal text-white select-none	"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-6 mt-2 text-gray-700 bg-white appearance-none focus:outline-none focus:bg-gray-100 focus:shadow-inner rounded-xl h-14 border-2"
              required
            />
            <p className="flex justify-between mt-3 text-md text-white cursor-pointer hover:text-gray-200">
              Forgot password?
            </p>
            <button
              type="button"
              onClick={handleLoginV2}
              className="w-full py-4 mt-9 font-medium tracking-widest text-white uppercase bg-orange-500 shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none rounded-xl"
            >
              Sign in
            </button>

            {errorMessage && <p>{errorMessage}</p>}

            <div className="flex flex-col items-center w-full mt-10">
              <p className="text-md text-white select-none">or continue with</p>
            </div>
            <div className="flex items-center w-full mt-2">
              <div className="w-full md:w-1/3 px-3 pt-4 mx-2">
                <button className="appearance-none flex items-center justify-center w-full bg-white shadow border rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                  <svg
                    className="h-6 w-6 fill-current text-gray-700"
                    viewBox="0 0 512 512"
                  >
                    <path d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z" />
                  </svg>
                </button>
              </div>
              <div className="w-full md:w-1/3 px-3 pt-4 mx-2">
                <button className="appearance-none flex items-center justify-center w-full bg-white shadow border rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                  <svg
                    className="h-6 w-6 fill-current text-gray-700"
                    viewBox="0 0 512 512"
                  >
                    <path d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z" />
                  </svg>
                </button>
              </div>
              <div className="w-full md:w-1/3 px-3 pt-4 mx-2">
                <button className="appearance-none flex items-center justify-center w-full bg-white shadow border rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none">
                  <svg
                    className="h-6 w-6 fill-current text-gray-700"
                    viewBox="0 0 512 512"
                  >
                    <path d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mt-10">
              <p className="text-md text-white select-none">
                Don't have an account yet?{" "}
                <span className="font-semibold pl-3">Register here</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
