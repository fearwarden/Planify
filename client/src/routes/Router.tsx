import {createBrowserRouter, Navigate} from "react-router-dom";
import {HOME, LOGIN, PROJECT, PROJECT_PLANNER, REGISTER, TASK, USER_ACCOUNT} from "@/constants/constants";
import App from "@/App";
import Login from "@/pages/Login/Login";
import Tasks from "@/pages/Tasks/Tasks.tsx";
import UserAccount from "@/pages/User/UserAccount";
import Register from "@/pages/Register/Register.tsx";
import Projects from "@/pages/ProjectPlanner/Projects.tsx";
import Project from "@/pages/ProjectPlanner/Project.tsx";

export default class Router {
    public static readonly router = createBrowserRouter([
        {
            path: HOME,
            element: <Navigate to={PROJECT_PLANNER} replace/>
        },
        {
            path: TASK,
            element: (
                <App>
                    <Tasks/>
                </App>
            ),
        },
        {
            path: PROJECT_PLANNER,
            element: (
                <App>
                    <Projects/>
                </App>
            )
        },
        {
            path: PROJECT,
            element: (
                <App>
                    <Project/>
                </App>
            )
        },
        {
            path: LOGIN,
            element: <Login/>,
        },
        {
            path: REGISTER,
            element: <Register/>
        },
        {
            path: USER_ACCOUNT,
            element: (
                <App>
                    <UserAccount/>
                </App>
            ),
        },
    ]);
}
