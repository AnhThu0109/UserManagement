import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/subParts/Layout";
import { publicRoutes, userRoutes } from "./routes";
import {UserRoutes} from "./utils/userRoutes";
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
