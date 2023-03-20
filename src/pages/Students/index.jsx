import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Dropdown, Button, Space, Pagination, Modal, Image, Menu, message, Popconfirm } from "antd";
import "./style.css";
import "./../style.css"
import { getAllUser, getUserById } from '../../utils/getUser';
import getPaginatedData from '../../utils/paginateData';
import changeFormatDate from '../../utils/formatDate';
import deleteUser from '../../utils/deleteUser';

function Students() {
    const token = localStorage.getItem("token");
    // const collapsed = localStorage.getItem("collapsed");
    const isAdmin = localStorage.getItem("isAdmin");
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [paginateUser, setPaginateUser] = useState();
    const [collapsedContent, setCollapsedContent] = useState(false);
    const [userId, setUserId] = useState();
    const [chosenUser, setChosenUser] = useState();
    const [isDeleted, setIsDeleted] = useState(false);
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
    const showModalSeeInfo = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Confirm delete and show message when cancel delete or delete successful
    const confirm = (e) => {
        console.log(e);
        deleteUserById(id, token);
        message.success(`User ${chosenUser?.username} is deleted successful !!!`);
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Delete request is canceled !!!');
    };

    //Items in button of each user row
    const items = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" className='nav-link' onClick={showModalSeeInfo}>
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
                <Popconfirm
                    placement=""
                    title="Delete user"
                    description="Are you sure to delete this user?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Link rel="noopener noreferrer" className='nav-link'>

                        Delete
                    </Link>
                </Popconfirm>
            ),
        },
    ];

    const itemNormalUser = (
        <Menu>
            <Menu.Item key="1">
                <Link rel="noopener noreferrer" className='nav-link' onClick={showModalSeeInfo}>
                    See Detail
                </Link>
            </Menu.Item>
        </Menu>
    );

    //Show message when delete successful
    // const [messageApi, contextHolder] = message.useMessage();
    // const success = (username) => {
    //     messageApi.open({
    //         type: 'success',
    //         content: `User ${username} is deleted successful!!!`,
    //     });
    // };

    //Delete user
    async function deleteUserById(index, tokenUser) {
        const response = await deleteUser(index, tokenUser)
        if (response.ok) {
            setIsDeleted(true);
            setUserId("");
        } else {

        }
    }

    useEffect(() => {
        // setUserId(id);
        console.log("newId", id);
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
                    localStorage.setItem("chosenUsername", data.username);
                    console.log("chosen user", data);
                })
        }

        console.log(isAdmin);
        getData();
        if (userId && userId != "") {
            getUserChosen();
        }

        console.log(isDeleted);
        setIsDeleted(false);
    }, [currentPage, collapsedContent, userId, isDeleted])

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
                                    <th scope="col"><p>No.</p></th>
                                    <th scope="col"><p>NAME</p></th>
                                    <th scope="col"><p>GENDER</p></th>
                                    <th scope="col"><p>EMAIL</p></th>
                                    <th scope="col"><p>CREATED AT</p></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginateUser && paginateUser?.map((item, index) => (
                                        <tr key={index}>
                                            <td scope="row" className='py-3'>
                                                {index + 1}
                                            </td>
                                            <td className='py-3'>{item.username}</td>
                                            <td className='py-3'>{item.gender != null ? (item.gender) : (<>Unknown</>)}</td>
                                            <td className='py-3'>{item.email}</td>
                                            <td className='d-flex py-3 justify-content-between'>{changeFormatDate(item.createdAt)}
                                                {
                                                    isAdmin == "false" ? (
                                                        <Dropdown menu={itemNormalUser} trigger={['click']}>
                                                            <Button onClick={() => userChosen(item._id)}>
                                                                <Space>
                                                                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-black" />
                                                                </Space>
                                                            </Button>
                                                        </Dropdown>
                                                    ) : (
                                                        <Dropdown
                                                            menu={{ items, }} trigger={['click']} 
                                                        >
                                                            <Button onClick={() => { userChosen(item._id); }}>
                                                                <Space>
                                                                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-black" />
                                                                </Space>
                                                            </Button>
                                                        </Dropdown>
                                                    )
                                                }
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
                        <div className="col mb-1">
                            <img src="https://cdn-icons-png.flaticon.com/128/9533/9533813.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.username}></input>
                        </div>
                        <div className="col">
                            <img src="https://cdn-icons-png.flaticon.com/512/9533/9533820.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.gender == null ? ("Unkown") : (chosenUser?.gender)}></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col mb-1">
                            <img src="https://cdn-icons-png.flaticon.com/128/9533/9533772.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.email}></input>
                        </div>
                        <div className="col">
                            <img src="https://cdn-icons-png.flaticon.com/128/9533/9533758.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.phone == null ? ("Unkown") : (chosenUser?.phone)}></input>
                        </div>
                    </div>
                    <div className="col mb-3">
                        <img src="https://cdn-icons-png.flaticon.com/128/9533/9533739.png" className="modalIcon"></img>
                        <span className=''></span>
                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.location == null ? ("Unkown") : (chosenUser?.location)}></input>
                    </div>
                    <p><b>Created at:</b> {changeFormatDate(chosenUser?.createdAt)}</p>
                    <p><b>Last updated at:</b> {changeFormatDate(chosenUser?.updatedAt)}</p>
                </div>
            </Modal>
        </div>
    )
}
export default Students;