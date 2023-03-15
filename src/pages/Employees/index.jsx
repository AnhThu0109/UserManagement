import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Space } from "antd";
import "./style.css";
import "./../style.css"

function Employees() {
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
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


    return (
        <div className="content">
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
                            <tr>
                                <td scope="row">R1C1</td>
                                <td>R1C2</td>
                                <td>R1C3</td>
                                <td>R1C4</td>
                                <td className='d-flex justify-content-between'>R1C5
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Employees;