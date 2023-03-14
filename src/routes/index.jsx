import AllAccounts from "../pages/Employees";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";

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
    }  
]

const adminRoutes = [
    
]
export {userRoutes, adminRoutes};