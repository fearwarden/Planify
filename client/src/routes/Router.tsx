import { createBrowserRouter } from "react-router-dom";
import { HOME, LOGIN } from "@/constants/constants";
import App from "@/App";
import Login from "@/components/Login/Login";
import Tasks from "@/pages/Tasks/Tasks";

export default class Router {
  public static readonly router = createBrowserRouter([
    {
      path: HOME,
      element: (
        <App>
          <Tasks />
        </App>
      ),
    },
    {
      path: LOGIN,
      element: <Login />,
    },
  ]);
}
