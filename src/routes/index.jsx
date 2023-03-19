import AllAccounts from "../pages/Students";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFoundPage";
import MyAccount from "../pages/MyAccount";

const publicRoutes = [
    {
        element: <Login/>,
        path: "/login"
    },
    {
        element: <NotFound/>,
        path: "/*"
    },
    {
        element: <Register/>,
        path: "/register"
    }
]

const userRoutes = [
    {
        element: DashBoard,
        path: "/"
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

const adminRoutes = [
    {
        element: <MyAccount/>,
        path: "/students/:id"
    },
    {
        element: <AllAccounts/>,
        path: "/students"
    },
]
export {publicRoutes, userRoutes, adminRoutes};