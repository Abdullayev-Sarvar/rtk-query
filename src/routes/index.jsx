import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import {SuspenseComponent as Suspense} from "../utils";

const Home = lazy(() => import('../routes/home/Home'));
const Profile = lazy(() => import('../routes/profile/Profile'));
const Auth = lazy(() => import('../routes/auth/Auth'));
const Login = lazy(() => import('../routes/auth/login/Login'));
const SignUp = lazy(() => import('../routes/auth/signup/SignUp'));
const NotFound = lazy(() => import('../routes/not-found/NotFound'));
const Private = lazy(() => import('../routes/private/Private'));
const Details = lazy(() => import('../routes/details/Details'));
const Search = lazy(() => import('../routes/search/Search'));
const Favorite = lazy(() => import('../routes/favorite/Favorite'));

const RouteController = () => {
  return useRoutes([
    {
        path: "/",
        element: <Suspense><Home/></Suspense>
    },
    {
        path: "/profile",
        element: <Suspense><Private/></Suspense>,
        children: [
            {
                path: "/profile/",
                element: <Suspense><Profile/></Suspense>
            }
        ]
    },
    {
        path: "/search",
        element: <Suspense><Search/></Suspense>
    },
    {
        path: "/auth",
        element: <Suspense><Auth/></Suspense>,
        children: [
            {
                path: "/auth/login",
                element: <Suspense><Login/></Suspense>
            },
            {
                path: "/auth/signup",
                element: <Suspense><SignUp/></Suspense>
            }
        ]
    },
    {
        path: "/favorite",
        element: <Suspense><Favorite/></Suspense>
    },
    {
        path: "/products/:id",
        element: <Suspense><Details/></Suspense>
    },
    {
        path: "*",
        element: <Suspense><NotFound/></Suspense>
    }
  ])
}

export default RouteController