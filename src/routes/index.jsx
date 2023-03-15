import AllAccounts from "../pages/Employees";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
    }
]

const adminRoutes = [
    
]
export {userRoutes, adminRoutes};