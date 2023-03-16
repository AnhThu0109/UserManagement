import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AllAccounts from "./pages/Employees";
import Login from "./pages/Login";
import User from "./pages/MyAccount";
import NotFound from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Layout from "./pages/subParts/Layout";
import { publicRoutes, userRoutes, adminRoutes } from "./routes";
import UserRoutes from "./utils/userRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {publicRoutes.map((item, index) => {
              return <Route key={index} path={item.path} element={item.element} />
            })}

            {userRoutes.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={<UserRoutes Component={item.element} />}
                />
              );
            })}
            <Route key="1" path="/" element={<DashBoard />}></Route>
            <Route key="2" path="/employees" element={<AllAccounts />}></Route>
            <Route key="3" path="/login" element={<Login />}></Route>
            <Route key="4" path="/register" element={<Register />}></Route>
            <Route key="5" path="/*" element={<NotFound />}></Route>
            <Route key="6" path="/user" element={<User />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
