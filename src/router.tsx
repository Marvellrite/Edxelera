import { createBrowserRouter } from "react-router";
import App from "./App";
import DashboardLayout from "./pages/dashboard/layout";
import NotFound from "./components/not-found";
import Home from "./pages/dashboard/home";
import MyCourses from "./pages/dashboard/my-courses";
import Explore from "./pages/dashboard/explore";
import Community from "./pages/dashboard/community";
import MyProfile from "./pages/dashboard/my-profile";
import Settings from "./pages/dashboard/settings";
import AuthLayout from "./pages/auth/layout";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Otp from "./pages/auth/otp";

export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "sign-in",
                element: <SignIn />
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "otp",
                element: <Otp />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "/home",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "explore",
                element: <Explore />
            },
            {
                path: "my-courses",
                element: <MyCourses />
            },
            {
                path: "community",
                element: <Community />
            },
            {
                path: "my-profile",
                element: <MyProfile />
            },
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])