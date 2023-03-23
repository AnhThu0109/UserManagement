import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faUserGroup, faUser, faRightToBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { Switch, Button, Avatar, Space, Menu, Dropdown } from "antd";
import { logOut } from '../../utils/logout';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import("./style.css");

const Layout = () => {
  const [active, setActive] = useState({
    activeDashboard: false,
    activeStudents: false,
    activeAccount: false,
  });
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const t = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const firstname = localStorage.getItem("userFirstName");
  const activeItem = localStorage.getItem("active");
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isChangeTheme, setIsChangeTheme] = useState(false);
  const [title, setTitle] = useState("Dashboard");
  const [user1stName, set1stName] = useState("");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const saveActiveItem = (item) => {
    localStorage.setItem("active", item);
  }

  const logoutFunc = async () => {
    await logOut(t);
    setToken("");
    setTitle("Dashboard");
    navigate("/login");
  }

  const titleSetting = () => {
    if (activeItem == 1) {
      setTitle("Dashboard");
    }
    if (activeItem == 2) {
      setTitle("Students List");
    }
    if (activeItem == 3) {
      setTitle("My Account");
    }
  }

  const item = (
    <Menu className='dropDownLogOut'>
      <Menu.Item key="1">
        <Link rel="noopener noreferrer" className='nav-link' onClick={logoutFunc}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setActive({
      activeDashboard: false,
      activeStudents: false,
      activeAccount: false,
    });
    setToken(t);
    set1stName(firstname);
    titleSetting();
  }, [token])
  return (
    <div className={collapsed == true ? "sb-nav-fixed" : "sb-nav-fixed sb-sidenav-toggled"}>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
        <div className="d-flex align-items-center">
          {
            (t == null || token == "")? (
              <></>
            ) : (
              <p className="ps-3 titleActive fw-bolder mt-2" href="#">{title}</p>
            )
          }
          
          
          <Button
            onClick={toggleCollapsed}
            className="border-0 btnCollapse d-flex align-items-center" id="sidebarToggle"
          >
            {collapsed == true ? <MenuUnfoldOutlined /> : (
              <MenuFoldOutlined />
            )}
          </Button>
        </div>
        {
          (t == null || token == "") ? (
            <div className="float-end p-3">
              <Link to="/login" className='nav-link fw-lighter logInTitle'>
                <FontAwesomeIcon icon={faRightToBracket} className='me-2' />Login
              </Link>
            </div>

          ) : (
            <div className="d-flex justify-content-between p-2 align-items-center">
              <div className="d-flex">
                <div className="logOutTitle">
                  Hello,&nbsp;
                  {firstname != "" ? (firstname) : ("User")}&nbsp;
                </div>
                <Dropdown overlay={item} trigger={['click']}>
                  <Space size={16} wrap>
                    <Avatar className="avatarNavBar"
                      style={{
                        backgroundColor: '#51cbce',
                        marginTop: -5,
                      }}
                      icon={<UserOutlined />}
                    />
                  </Space>
                </Dropdown>
              </div>
            </div>
          )
        }
      </nav>

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <li className={active.activeDashboard == true || activeItem == 1 ? "active" : ""}>
                  <div className={isChangeTheme == true ? "menuList darkTheme" : "menuList lightTheme"}>
                    <Link className="nav-link pe-2" to="/home" onClick={t != null && (() => { setActive({ activeAccount: false, activeDashboard: true, activeStudents: false }); saveActiveItem(1); setTitle("Dashboard"); })}>
                      <FontAwesomeIcon icon={faSquarePollVertical} className='me-2' />
                      Dashboard
                    </Link>
                  </div>
                </li>

                <li className={active.activeStudents == true || activeItem == 2 ? "active" : ""}>
                  <div className={isChangeTheme == true ? "menuList darkTheme" : "menuList lightTheme"}>
                    <Link className="nav-link pe-2" to="/students" onClick={t != null && (() => { setActive({ activeAccount: false, activeDashboard: false, activeStudents: true }); saveActiveItem(2); setTitle("Students"); })}>
                      <FontAwesomeIcon icon={faUserGroup} className='me-2' />
                      Students
                    </Link>
                  </div>
                </li>

                {
                  t != null &&
                  <li className={active.activeAccount == true || activeItem == 3 ? "active" : ""}>
                    <div className={isChangeTheme == true ? "menuList darkTheme" : "menuList lightTheme"}>
                      <Link className="nav-link pe-2" to={`/students/${id}`} onClick={t != null && (() => { setActive({ activeAccount: true, activeDashboard: false, activeStudents: false }); saveActiveItem(3); setTitle("My Account"); })}><FontAwesomeIcon icon={faUser} className='me-2' />My Account</Link>
                    </div>
                  </li>
                }
              </div>
            </div>
          </nav>
        </div>

        <div id="layoutSidenav_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;