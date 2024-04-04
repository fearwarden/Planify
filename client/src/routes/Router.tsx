import { createBrowserRouter } from "react-router-dom";
import { HOME, LOGIN } from "@/constants/constants";
import Login from "@/components/Login/Login";
import Home from "@/pages/Home/Home";
import Tasks from "@/pages/Tasks/tasks";

export default class Router {
  public static readonly router = createBrowserRouter([
    {
      path: HOME,
      element: <Tasks />,
    },
    {
      path: LOGIN,
      element: <Login />,
    },
  ]);
}
