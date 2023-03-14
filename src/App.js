import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AllAccounts from "./pages/Employees";
import Login from "./pages/Login";
import Layout from "./pages/subParts/Layout";
import { publicRoutes, privateRoutes } from "./routes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route key="1" path="/" element={<DashBoard/>}></Route>
            <Route key="2" path="/employees" element={<AllAccounts/>}></Route>
            <Route key="3" path="/login" element={<Login/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
