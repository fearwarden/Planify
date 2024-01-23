import { createBrowserRouter } from "react-router-dom";
import { HOME, LOGIN } from "@/constants/constants";
import Login from "@/components/Login/Login";
import Home from "@/pages/Home/Home";
import Task from "@/pages/Home/components/Task";

export default class Router {
  public static readonly router = createBrowserRouter([
    {
      path: HOME,
      element: <Home />,
    },
    {
      path: LOGIN,
      element: <Login />,
    },
    {
      path: "/task",
      element: <Task />,
    },
  ]);
}
