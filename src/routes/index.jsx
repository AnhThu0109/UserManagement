import AllAccount from "../pages/AllAccount";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";

const userRoutes = [
    {
        element: <DashBoard/>,
        path: "/"
    },
    {
        element: <AllAccount/>,
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