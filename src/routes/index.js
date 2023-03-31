import Users from "../pages/Users";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFoundPage";
import MyAccount from "../pages/MyAccount";
import WelcomePage from "../pages/Welcome";
import Register from "../pages/Register";

const publicRoutes = [
    {
        element: <WelcomePage/>,
        path: "/"
    },
    {
        element: <Login/>,
        path: "/login"
    },
    {
        element: <Register/>,
        path: "/register"
    },
    {
        element: <NotFound/>,
        path: "/*"
    }
]

const userRoutes = [
    {
        element: DashBoard,
        path: "/home"
    },
    {
        element: MyAccount,
        path: "/users/:id"
    },
    {
        element: Users,
        path: "/users"
    },
    
]

export {publicRoutes, userRoutes};