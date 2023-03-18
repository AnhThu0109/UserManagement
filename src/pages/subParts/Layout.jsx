import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faUserGroup, faUser, faRightToBracket, faRightFromBracket, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Switch, Button } from "antd";
import logoutUser from '../../utils/logout';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import("./style.css");

const Layout = () => {
  const [active, setActive] = useState({
    activeDashboard: false,
    activeEmployees: false,
    activeAccount: false,
  });
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const t = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const activeItem = localStorage.getItem("active");
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isChangeTheme, setIsChangeTheme] = useState(false);
  const [title, setTitle] = useState("Dashboard");

  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? "dark" : "light");
    setIsChangeTheme(value);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const saveActiveItem = (item) => {
    localStorage.setItem("active", item);
  }

  const logOut = async () => {
    let tokenUser = {
      "accessToken": t
    }
    await logoutUser(tokenUser)
    localStorage.removeItem('token');
    localStorage.removeItem('active');
    localStorage.removeItem('id');
    setToken("");
    navigate("/login");
  }

  const titleSetting = () => {
    if (activeItem == 1){
      setTitle("Dashboard");
    } 
    if (activeItem == 2){
      setTitle("Employees");
    }
    if (activeItem == 3){
      setTitle("MyAccount");
    }
  }

  useEffect(() => {
    setToken(t);
    titleSetting();
  }, [token])
  return (
    <div id="innerContent" className={isChangeTheme == true ? "darkTheme" : "lightTheme"}>
      <div className={collapsed ? "navigationCollapsed navigation" : "navigation"}>
        <div >
          <div id="menu">
            <nav className="navbar flex-column">
              <p className='px-2 logo mt-3'>
                {/* <img src='https://cdn-icons-png.flaticon.com/512/3773/3773713.png' className='logoIcon me-2'></img> */}
                <Button
                  onClick={toggleCollapsed}
                  className="border-0 btnCollapse d-flex align-items-center"
                >
                  {collapsed ? <MenuUnfoldOutlined /> : (
                    <>
                      <MenuFoldOutlined />
                      <b className='ms-2'>Menu</b>
                    </>
                  )}
                </Button>
              </p>
              {
                collapsed ? (
                  <></>
                ) : (
                  <>
                    <hr className="hrLogo"></hr>
                    <div className='menu'>
                      <ul className="navbar-nav">
                        <li className={active.activeDashboard == true || activeItem == 1 ? "active" : ""}>
                          <div className={isChangeTheme == true ? "menuList darkTheme" : "menuList lightTheme"}>
                            <Link className="nav-link pe-2" to="/" onClick={() => { setActive({ activeAccount: false, activeDashboard: true, activeEmployees: false }); saveActiveItem(1); setTitle("Dashboard"); }}><FontAwesomeIcon icon={faSquarePollVertical} className='me-2' />Dashboard</Link>
                          </div>
                        </li>

                        <li className={active.activeEmployees == true || activeItem == 2 ? "active" : ""}>
                          <div className={isChangeTheme == true ? "menuList darkTheme" : "menuList lightTheme"}>
                            <Link className="nav-link pe-2" to="/employees" onClick={() => { setActive({ activeAccount: false, activeDashboard: false, activeEmployees: true }); saveActiveItem(2); setTitle("Employees"); }}><FontAwesomeIcon icon={faUserGroup} className='me-2' />Employees</Link>
                          </div>
                        </li>

                        {
                          t != null &&
                          <li className={active.activeAccount == true || activeItem == 3 ? "active" : ""}>
                            <div className={isChangeTheme == true ? "menuList darkTheme" : "menuList lightTheme"}>
                              <Link className="nav-link pe-2" to={`/employees/${id}`} onClick={() => { setActive({ activeAccount: true, activeDashboard: false, activeEmployees: false }); saveActiveItem(3); setTitle("My Account"); }}><FontAwesomeIcon icon={faUser} className='me-2' />My Account</Link>
                            </div>
                          </li>
                        }
                      </ul>
                    </div>
                  </>
                )
              }

            </nav>
          </div>
        </div>
        {
          collapsed ? (
            <></>
          ) : (
            <div className='text-center pb-5'>
              <Switch
                className="m-3"
                checked={theme === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
              />
              <Link to="/register" className='nav-link'>
                Register
              </Link>

            </div>
          )
        }

      </div>

      <div className={collapsed == true ? "collapsedContent" : "content"}>
        {
          (t == null || token == "") ? (
            <div className="float-end p-3">
              <Link to="/login" className='nav-link fw-lighter logInTitle'>
                <FontAwesomeIcon icon={faRightToBracket} className='me-2' />Login
              </Link>
            </div>

          ) : (
            <div className="d-flex justify-content-between p-2">
              <h2 className={collapsed ? "titleActive fw-bolder ps-3 mt-2" : 'fw-bolder ps-3 mt-3'}>{title}</h2>
              <div className="d-flex">

                <div className="border-0 bg-white rounded-circle py-2 px-3 avatarLogin">
                  <FontAwesomeIcon icon={faUserTie} />
                </div>
                <div className="dropdown">
                  <button className=" border-0 mt-2 dropdown-toggle logOutTitle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Hello, user
                  </button>
                  <ul className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton1">
                    <Link onClick={logOut} className='dropdown-item nav-link fw-lighter logOutTitle pt-2'>
                      Logout
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          )
        }

        <hr className="hrLogin"></hr>
        <div >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;