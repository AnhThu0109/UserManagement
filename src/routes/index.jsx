import AllAccounts from "../pages/Students";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFoundPage";
import MyAccount from "../pages/MyAccount";
import WelcomePage from "../pages/Welcome";

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
        path: "/students/:id"
    },
    {
        element: AllAccounts,
        path: "/students"
    },
    
]

export {publicRoutes, userRoutes};