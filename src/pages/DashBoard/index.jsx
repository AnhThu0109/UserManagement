import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { getAllUser } from "../../utils/getUser";
import "./style.css";

function DashBoard() {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState();
    const [topActiveUsers, setTopActiveUsers] = useState();

    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
    labels: labels,
    datasets: [
        {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
        },
    ],
    };

    useEffect(() => {
        //Get all users
        async function getData() {
            await getAllUser(token)
                .then(data => {
                    console.log(data);
                    setUsers(data);
                    const arr = [];
                    for(let i=0; i<10; i++){
                        arr.push(data[i]);
                    }
                    setTopActiveUsers(arr);
                    console.log(arr);
                })
        }
        getData();
    }, [])

    return (
        <div className="p-3">
            <div className="row">
                <div className="col-lg-4 col-sm-12 mb-3">
                    <div className="bg-white border-0 rounded-3 card-item p-3">
                        <p className="d-flex justify-content-between align-items-center fw-bolder text-black-50">Total Number of Students
                            <img src='https://cdn-icons-png.flaticon.com/512/10156/10156019.png' className="dashboardIcon"></img>
                        </p>
                        <hr></hr>
                        <p>{users?.length} students</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12 mb-3">
                <div className="bg-white border-0 rounded-3 card-item p-3">
                        <p className="d-flex justify-content-between align-items-center fw-bolder text-black-50">Students Added Recently
                            <img src='https://cdn-icons-png.flaticon.com/512/10155/10155992.png' className="dashboardIcon"></img>
                        </p>
                        <hr></hr>
                        <p>{users?.length} students</p>
                    </div>
                </div>
                <div className="col-lg-4 col-sm-12 mb-3">
                <div className="bg-white border-0 rounded-3 card-item p-3">
                        <p className="d-flex justify-content-between align-items-center fw-bolder text-black-50">Students Deleted Recently
                            <img src='https://cdn-icons-png.flaticon.com/512/10155/10155970.png' className="dashboardIcon"></img>
                        </p>
                        <hr></hr>
                        <p>{users?.length} students</p>
                    </div>
                </div>
            </div>
            
            {/* Chart */}
            <div>
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <FontAwesomeIcon icon={faChartArea} className='me-2'></FontAwesomeIcon>
                            Area Chart Example
                        </div>
                        <div>
                            <Line data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;