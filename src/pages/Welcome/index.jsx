import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
function WelcomePage() {
    const [showProcess, setShowProcess] = useState(false);
    const navigate = useNavigate();

    const myFunction = () => {
        setTimeout(() => {
            navigate("/login");
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

                    <p className="copyright">@NguyenNgocAnhThu - 2023</p>
                </div>
            ) : (
                <div className="welcomePage2">
                    <img src="https://www.icegif.com/wp-content/uploads/icegif-500.gif"></img>
                    <div class="containerProgress">    
                        <div class="progress progress-striped">
                            <div class="progress-bar">
                            </div>                       
                        </div> 
                    </div>
                </div>
            )}
        </div>
    );
}
export default WelcomePage;
