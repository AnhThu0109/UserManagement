import React, { useContext, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Space, Pagination } from "antd";
import "./style.css";
import "./../style.css"
import { getAllUser } from '../../utils/getUser';
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
                <form className='border-0 ps-2 py-1 m-4 d-flex justify-content-between searchForm'>
                    <input type="text" name="search" id="search" className='border-0' placeholder='Search... ' />
                    <button type="submit" className='border-0'><FontAwesomeIcon icon={faSearch} /></button>
                </form>

                <div className='px-sm-2 px-lg-4'>
                    <div className="table-responsive">
                        <table className="table border-0 bg-white rounded-3 allEmployees">
                            <thead>
                                <tr>
                                    <th scope="col"><p>ID</p></th>
                                    <th scope="col"><p>NAME</p></th>
                                    <th scope="col"><p>GENDER</p></th>
                                    <th scope="col"><p>EMAIL</p></th>
                                    <th scope="col"><p>CREATED DATE</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginateUser && paginateUser?.map((item, index) => (
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