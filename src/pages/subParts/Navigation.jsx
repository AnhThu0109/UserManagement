import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import("./style.css");

function Navigation() {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div id="navigation">
            <div id="menu">
                <nav className="navbar navbar-expand-md navbar-light flex-column">
                    <a className="navbar-brand mb-3" href="#">Logo</a>
                    <div className='menu'>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Dashboard</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Employees</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Account</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='text-center pb-5'>Login</div>
        </div>
    )
}

export default Navigation;