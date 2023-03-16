import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Switch, Button } from "antd";
import logoutUser from '../../utils/logout';
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import("./style.css");


function Navbar() {
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
    const [contentWidth, setContentWidth] = useState(false);
    // const [theme, setTheme] = useState("light");
    // const [isChangeTheme, setIsChangeTheme] = useState(false);

    // const changeTheme = (value) => {
    //     console.log(value);
    //     setTheme(value ? "dark" : "light");
    //     setIsChangeTheme(value);
    // };
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {        
        setCollapsed(!collapsed);
        setContentWidth(!contentWidth);
        localStorage.setItem("collapsed", contentWidth);
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

    useEffect(() => {
        setToken(t);
    }, [token])

    return (
        <div id="navigation" className='float-start'>
            <div id="menu">
                <nav className="navbar flex-column mt-3">
                    <p className='py-sm-2 py-lg-3 px-2 logo'>
                        {/* <img src='https://cdn-icons-png.flaticon.com/512/3773/3773713.png' className='logoIcon me-2'></img> */}
                        <Button
                            onClick={toggleCollapsed}
                            className="border-0 text-white btnCollapse d-flex align-items-center"
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
                                <hr></hr>
                                <div className='menu'>
                                    <ul className="navbar-nav">
                                        <li className={active.activeDashboard == true || activeItem == 1 ? "active" : ""}>
                                            <Link className="nav-link pe-2" to="/" onClick={() => { setActive({ activeAccount: false, activeDashboard: true, activeEmployees: false }); saveActiveItem(1); }}><FontAwesomeIcon icon={faSquarePollVertical} className='me-2' />Dashboard</Link>
                                        </li>
                                        <li className={active.activeEmployees == true || activeItem == 2 ? "active" : ""}>
                                            <Link className="nav-link pe-2" to="/employees" onClick={() => { setActive({ activeAccount: false, activeDashboard: false, activeEmployees: true }); saveActiveItem(2); }}><FontAwesomeIcon icon={faUserGroup} className='me-2' />Employees</Link>
                                        </li>
                                        {
                                            t != null &&
                                            <li className={active.activeAccount == true || activeItem == 3 ? "active" : ""}>
                                                <Link className="nav-link" to={`/employees/${id}`} onClick={() => { setActive({ activeAccount: true, activeDashboard: false, activeEmployees: false }); saveActiveItem(3); }}><FontAwesomeIcon icon={faUser} className='me-2' />My Account</Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </>
                        )
                    }

                </nav>
            </div>
            {
                collapsed ? (
                    <></>
                ) : (
                    <div className='text-center pb-5'>
                        {/* <Switch
                className="m-3"
                checked={theme === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                /> */}
                        <Link to="/register" className='nav-link'>
                            Register
                        </Link>
                        {
                            (t == null || token == "") ? (
                                <Link to="/login" className='nav-link'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/8345/8345303.png' className='logIn me-2'></img>Login
                                </Link>
                            ) : (
                                <Link onClick={logOut} className='nav-link'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/8345/8345303.png' className='logOut me-2'></img>Logout
                                </Link>
                            )
                        }


                    </div>
                )
            }

        </div>
    )
}

export default Navbar;