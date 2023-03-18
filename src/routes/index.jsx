import AllAccounts from "../pages/Employees";
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
        path: "/employees/:id"
    },
    {
        element: AllAccounts,
        path: "/employees"
    },
    
]

const adminRoutes = [
    {
        element: <MyAccount/>,
        path: "/employees/:id"
    },
    {
        element: <AllAccounts/>,
        path: "/employees"
    },
]
export {publicRoutes, userRoutes, adminRoutes};