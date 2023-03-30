import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { isLogin } from "../../utils/userRoutes";
function WelcomePage() {
    const [showProcess, setShowProcess] = useState(false);
    const navigate = useNavigate();
    const activePage = localStorage.getItem("active");    
    const id = localStorage.getItem("id");
    const login = isLogin();

    //if login before ==> redirect to old page || direct to login page
    const route = (index) => {
        if(login == false){
            return "/login";
        }
        else{
            if (activePage == 2){
                return "/users";
            }
            if (activePage == 3){
                return `/users/${index}`;
            }
            if (activePage == 1){
                return `/home`;
            }
        }
    }

    //Set 6s for processing bar before redirect to login page/ home page
    const myFunction = () => {
        setTimeout(() => {
            navigate(route(id));
        }, 6000);
    };

    return (
        <div className="welcomePage">
            {showProcess == false ? (
                <div className="welcomePage1">
                    <div id="container">
                        WELCOME TO
                        <div id="flip">
                            <div>
                                <div>MY</div>
                            </div>
                            <div>
                                <div>ACCOUNT MANAGEMENT</div>
                            </div>
                            <div>
                                <div>REACT</div>
                            </div>
                        </div>
                        PROJECT<br></br>
                        <button className="btn btn-info getStarted">
                            <Link
                                onClick={() => {
                                    setShowProcess(true);
                                    myFunction();
                                    clearTimeout(myFunction);
                                }}
                                className="text-white text-decoration-none"
                            >
                                Get Started!
                            </Link>
                        </button>
                    </div>

                    <p className="copyright">Copyright &copy; NguyenNgocAnhThu - 2023</p>
                </div>
            ) : (
                <div className="welcomePage2">
                    <img src="https://www.icegif.com/wp-content/uploads/icegif-500.gif"></img>
                    <div className="containerProgress">    
                        <div className="progress progress-striped">
                            <div className="progress-bar">
                            </div>                       
                        </div> 
                    </div>
                </div>
            )}
        </div>
    );
}
export default WelcomePage;
