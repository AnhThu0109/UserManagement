import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { Calendar, theme } from "antd";
import { getAllUser } from "../../utils/getUser";
import "./style.css";

function DashBoard() {
    const userToken = localStorage.getItem("token");
    const [users, setUsers] = useState();
    const [dataTopActiveChart, setDataTopActiveChart] = useState();

    //Using antd calendar
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    useEffect(() => {
        //Get all users
        async function getData() {
            await getAllUser(userToken)
                .then(data => {
                    console.log(data);
                    setUsers(data);
                    const arr = [];

                    //Sort data based on logintime desc
                    data.sort((a, b) => b.logintime - a.logintime);
                    console.log("datasort", data);
                    //Take 10 top activity users
                    for (let i = 0; i < 10; i++) {
                        arr.push(data[i]);
                    }

                    let labels = [];
                    let dataLoginTime = [];
                    //Take labels as username and data as logintimes for chart
                    arr.map((item) => {
                        labels.push(item.username);
                        dataLoginTime.push(item.logintime);
                    })

                    let dataChart = {
                        labels: labels,
                        datasets: [
                            {
                                label: "Number of logins",
                                backgroundColor: "rgb(81, 203, 206)",
                                borderColor: "rgb(255, 99, 132)",
                                data: dataLoginTime,
                            },
                        ],
                    };

                    setDataTopActiveChart(dataChart);
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
            <div className="row">
                <div className="barChart col-sm-12 col-lg-8">
                    <div className="col-xl-6 chartContent">
                        <div className="card mb-3 chartBody">
                            <div className="card-header">
                                <FontAwesomeIcon icon={faChartColumn} className='me-2'></FontAwesomeIcon>
                                Top Active Students
                            </div>
                            <div style={{height: "100%"}}>
                                {
                                    dataTopActiveChart &&
                                    <Bar data={dataTopActiveChart} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-lg-4 calendar">
                    <div style={wrapperStyle} className='calendarBody'>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;