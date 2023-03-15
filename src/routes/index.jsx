import AllAccounts from "../pages/Employees";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFoundPage";

const userRoutes = [
    {
        element: <DashBoard/>,
        path: "/"
    },
    {
        element: <AllAccounts/>,
        path: "/employees"
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

const adminRoutes = [
    
]
export {userRoutes, adminRoutes};