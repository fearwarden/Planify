import { createBrowserRouter } from "react-router-dom";
import { HOME, LOGIN, USER_ACCOUNT } from "@/constants/constants";
import App from "@/App";
import Login from "@/components/Login/Login";
import Tasks from "@/pages/Tasks/tasks";
import UserAccount from "@/pages/User/UserAccount";

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
    {
      path: USER_ACCOUNT,
      element: (
        <App>
          <UserAccount />
        </App>
      ),
    },
  ]);
}
