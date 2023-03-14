import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import("./style.css");


function Navigation() {
    const [activeD, setActiveD] = useState(false);
    const [activeE, setActiveE] = useState(false);
    const [activeA, setActiveA] = useState(false);

    return (
        <div id="navigation">
            <div id="menu">
                <nav className="navbar flex-column">
                <h3 className='py-sm-3 py-lg-4'><img src='https://cdn-icons-png.flaticon.com/512/3773/3773713.png' className='logoIcon me-2'></img>Logo</h3>
                    <div className='menu'>
                        <ul className="navbar-nav">
                            <li className={activeD == true? "active" : ""}>
                                <Link className="nav-link" to="/" onClick={() => {setActiveD(true); setActiveA(false); setActiveE(false)}}><FontAwesomeIcon icon={faSquarePollVertical} className='me-2'/>Dashboard</Link>
                            </li>
                            <li className={activeE == true? "active" : ""}>
                                <Link className="nav-link" to="/employees" onClick={() => {setActiveE(true); setActiveD(false); setActiveA(false)}}><FontAwesomeIcon icon={faUserGroup} className='me-2'/>Employees</Link>
                            </li>
                            <li className={activeA == true? "active" : ""}>
                                <Link className="nav-link" to="#" onClick={() => {setActiveA(true); setActiveD(false); setActiveE(false)}}><FontAwesomeIcon icon={faUser} className='me-2'/>Account</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className='text-center pb-5'>
                <Link to="/login" className='nav-link'>
                    <img src='https://cdn-icons-png.flaticon.com/512/8345/8345303.png' className='logOut me-2'></img>Login
                </Link>
            </div>
        </div>
    )
}

export default Navigation;