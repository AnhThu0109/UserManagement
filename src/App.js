import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AllAccounts from "./pages/Students";
import Login from "./pages/Login";
import User from "./pages/MyAccount";
import NotFound from "./pages/NotFoundPage";
import Register from "./pages/Register";
import Layout from "./pages/subParts/Layout";
import { publicRoutes, userRoutes, adminRoutes } from "./routes";
import UserRoutes from "./utils/userRoutes";
import "./index.css";
import WelcomePage from "./pages/Welcome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
