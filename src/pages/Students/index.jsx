import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisVertical, faEnvelope, faClipboardUser, faSquarePhone, faMapLocationDot} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Space, Pagination, Modal, Image } from "antd";
import "./style.css";
import "./../style.css"
import { getAllUser, getUserById } from '../../utils/getUser';
import getPaginatedData from '../../utils/paginateData';

function Students() {
    const token = localStorage.getItem("token");
    const collapsed = localStorage.getItem("collapsed");
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [paginateUser, setPaginateUser] = useState();
    const [collapsedContent, setCollapsedContent] = useState(false);
    const [userId, setUserId] = useState();
    const [chosenUser, setChosenUser] = useState();
    const id = localStorage.getItem("userChosenId");

    const onChange = (p) => {
        console.log(p);
        setCurrentPage(p);
    }

    const userChosen = (id) => {
        console.log(id);
        localStorage.setItem("userChosenId", id);
        setUserId(id);
    }

    //Show modal to see user info
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Items in button of each user row
    const items = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" className='nav-link' onClick={showModal}>
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
    // const handleMenuClick = (e) => {
    //     console.log('click', e);
    // };

    // const contentClass = () => {
    //     setCollapsedContent(!collapsedContent);
    // }

    useEffect(() => {
        setUserId(id);
        //Get all users
        async function getData() {
            await getAllUser(token)
                .then(data => {
                    console.log(data);
                    setUsers(data);
                    let userPage = getPaginatedData(currentPage, 7, data);
                    console.log(userPage);
                    setPaginateUser(userPage);
                })
        }

        //Get user chosen
        async function getUserChosen() {
            await getUserById(userId, token)
                .then(data => {
                    setChosenUser(data);
                    console.log("chosen user", data);
                })
        }
        getData();
        if(userId){
            getUserChosen();
            
        }
        
    }, [currentPage, collapsedContent, userId])

    return (
        <div className='allAcountContent'>
            <div className='accountTable'>
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
                                                    <Button onMouseEnter={() => userChosen(item._id)}>
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
                pageSize={7}
                onChange={onChange} className="text-center pb-2 paginateBar"
            />

            {/* Modal user information */}
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key="close" onClick={handleOk} className="okBtnModal">
            OK
          </Button>,
        ]}>
                <div>
                    <Image src={chosenUser?.avatar} className='avatarUserChosen rounded-circle border border-2'></Image>
                    <h4>{chosenUser?.firstname != null ? (
                        <>{chosenUser?.firstname} {chosenUser?.lastname}</>
                    ) : (<>Unknown</>)}</h4>
                    <div className='row mt-3'>
                    <div className="col mb-3">
                        <FontAwesomeIcon icon={faClipboardUser} className="modalIcon"/> 
                        <span className=''></span>
                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.username}></input>
                    </div>
                    <div className="col">
                        <FontAwesomeIcon icon={faEnvelope} className="modalIcon"/> 
                        <span className=''></span>
                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.email}></input>
                    </div>
                    </div>
                    <div className='row mt-3'>
                    <div className="col mb-3">
                        <FontAwesomeIcon icon={faSquarePhone} className="modalIcon"/> 
                        <span className=''></span>
                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.phone == null? ("Unkown") : (chosenUser?.phone)}></input>
                    </div>
                    <div className="col">
                        <FontAwesomeIcon icon={faMapLocationDot} className="modalIcon"/> 
                        <span className=''></span>
                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.location == null? ("Unkown") : (chosenUser?.location)}></input>
                    </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default Students;