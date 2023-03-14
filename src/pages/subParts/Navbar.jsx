import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Switch } from "antd";
import("./style.css");


function Navbar() {
    const [active, setActive] = useState({
        activeDashboard: false,
        activeEmployees: false,
        activeAccount: false,
    });
    // const [theme, setTheme] = useState("light");
    // const [isChangeTheme, setIsChangeTheme] = useState(false);

    // const changeTheme = (value) => {
    //     console.log(value);
    //     setTheme(value ? "dark" : "light");
    //     setIsChangeTheme(value);
    // };

    return (
        <div id="navigation">
            <div id="menu">
                <nav className="navbar flex-column">
                <h3 className='py-sm-3 py-lg-4'><img src='https://cdn-icons-png.flaticon.com/512/3773/3773713.png' className='logoIcon me-2'></img>Logo</h3>
                    <div className='menu'>
                        <ul className="navbar-nav">
                            <li className={active.activeDashboard == true? "active" : ""}>
                                <Link className="nav-link" to="/" onClick={() => {setActive({activeAccount: false, activeDashboard: true, activeEmployees:false})}}><FontAwesomeIcon icon={faSquarePollVertical} className='me-2'/>Dashboard</Link>
                            </li>
                            <li className={active.activeEmployees == true? "active" : ""}>
                                <Link className="nav-link" to="/employees" onClick={() => {setActive({activeAccount: false, activeDashboard: false, activeEmployees: true})}}><FontAwesomeIcon icon={faUserGroup} className='me-2'/>Employees</Link>
                            </li>
                            <li className={active.activeAccount == true? "active" : ""}>
                                <Link className="nav-link" to="#" onClick={() => {setActive({activeAccount: true, activeDashboard: false, activeEmployees: false})}}><FontAwesomeIcon icon={faUser} className='me-2'/>Account</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className='text-center pb-5'>
                {/* <Switch
                className="m-3"
                checked={theme === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                /> */}
                <Link to="/login" className='nav-link'>
                    <img src='https://cdn-icons-png.flaticon.com/512/8345/8345303.png' className='logOut me-2'></img>Login
                </Link>
            </div>
        </div>
    )
}

export default Navbar;