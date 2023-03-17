import React, { useContext, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Space, Pagination } from "antd";
import "./style.css";
import "./../style.css"
import {getAllUser} from '../../utils/getUser';
import getPaginatedData from '../../utils/paginateData';

function Employees() {
    const token = localStorage.getItem("token");
    const collapsed = localStorage.getItem("collapsed");
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [paginateUser, setPaginateUser] = useState();
    const [collapsedContent, setCollapsedContent] = useState(false);
    const buttonRef = useRef(null);

    const onChange = (p) => {
        console.log(p);
        setCurrentPage(p);
    }

    const items = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" className='nav-link' to="/">
                    See Detail
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer" className='nav-link' to="/">
                    Edit
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link rel="noopener noreferrer" className='nav-link' to="/">
                    Delete
                </Link>
            ),
        },
    ];
    const handleMenuClick = (e) => {
        console.log('click', e);
    };
    // const menuProps = {
    //     items,
    //     onClick: handleMenuClick,
    // };

    const contentClass = () => {
        setCollapsedContent(!collapsedContent);
    }

    useEffect(() => {
        async function getData() {
            await getAllUser(token)
                .then(data => {
                    console.log(data);
                    setUsers(data);
                    let userPage = getPaginatedData(currentPage, 5, data);
                    console.log(userPage);
                    setPaginateUser(userPage);
                })
        }
        getData();  
    }, [currentPage, collapsedContent])

    return (
        <div>
            <div>
                <div className="d-flex justify-content-between align-items-center p-4">
                    <h2 className='fw-bolder'>Employees</h2>
                    <form className='border border-primary rounded-4 ps-2 py-1 searchForm bg-white'>
                        <input type="text" name="search" id="search" className='border-0' placeholder='Search... ' />
                        <button type="submit" className='border-0'><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                </div>

                <div className='px-sm-2 px-lg-4'>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginateUser?.map((item, index) => (
                                        <tr key={index}>
                                            <td scope="row" className='py-3'>R1C1</td>
                                            <td className='py-3'>{item.username}</td>
                                            <td className='py-3'>R1C3</td>
                                            <td className='py-3'>{item.email}</td>
                                            <td className='d-flex py-3 justify-content-between'>R1C5
                                                <Dropdown
                                                    menu={{
                                                        items,
                                                    }}
                                                >
                                                    <Button>
                                                        <Space>
                                                            <FontAwesomeIcon icon={faEllipsisVertical} className="text-black" />
                                                        </Space>
                                                    </Button>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Pagination
                defaultCurrent={1}
                showTotal={(total) => `Total ${total} users`}
                total={users?.length}
                pageSize={5}
                onChange={onChange} className="text-center pb-1 paginateBar"
            // showSizeChanger={false}
            />
        </div>
    )
}
export default Employees;