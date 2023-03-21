import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Button, Space, Pagination, Modal, Image, Menu, message, Popconfirm } from "antd";
import "./style.css";
import "./../style.css"
import { getAllUser, getUserById } from '../../utils/getUser';
import getPaginatedData from '../../utils/paginateData';
import changeFormatDate from '../../utils/formatDate';
import deleteUser from '../../utils/deleteUser';
import { logOut } from '../../utils/logout';
import updateUser from '../../utils/updateUser';

function Students() {
    const navigate = useNavigate();
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
    const loginUserId = localStorage.getItem("id");

    const [username, setUsername] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [phone, setPhone] = useState();
    const [location, setLocation] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [isUpdated, setIsUpdated] = useState(false);

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

    //Show modal to update user info
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const showModalUpdate = () => {
        setIsModalUpdateOpen(true);
    };
    const handleOkUpdate = () => {
        setIsModalUpdateOpen(false);
    };
    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
    };

    //Update function
    const handleUpdate = async (event) => {
        event.preventDefault();
        let user = {
            "firstname": firstname,
            "lastname": lastname,
            "username": username,
            "email": email,
            "phone": phone,
            "location": location,
            "gender": gender,
        }
        console.log(user);
        try {
            const data = await updateUser(id, token, user);
            console.log(data);
            if (data) {
                setIsUpdated(true);
                handleOkUpdate();
                message.success(`User ${chosenUser?.username} is updated successful !!!`);
            }
        } catch (error) {
            console.error(error);
        }
    }



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
                <Link rel="noopener noreferrer" className='nav-link' onClick={showModalUpdate}>
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

    //Delete user
    async function deleteUserById(index, tokenUser) {
        const response = await deleteUser(index, tokenUser)
        if (response.ok) {
            if (loginUserId == index) {
                logOut(token);
                window.location.reload();
                navigate("/login");
            }
            setIsDeleted(true);
            setUserId("");
        } else {

        }
    }

    useEffect(() => {
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
                    setUsername(data.username);
                    setFirstname(data.firstname);
                    setLastname(data.lastname);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setLocation(data.location);
                    setGender(data.gender);
                })
        }

        console.log(isAdmin);
        getData();
        if (userId && userId != "") {
            getUserChosen();
        }
        console.log(isDeleted);
        setIsDeleted(false);
        setIsUpdated(false);
    }, [currentPage, collapsedContent, userId, isDeleted, isUpdated])

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
                                                        <Dropdown overlay={itemNormalUser} trigger={['click']}>
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
                <Button key="close" onClick={handleOk} className="okBtnModal fw-bolder">
                    OK
                </Button>,
            ]} className='modalSeeInfo'>
                <div>
                    <Image src={chosenUser?.avatar} className='avatarUserChosen rounded-circle border border-2'></Image>
                    <h4>{chosenUser?.firstname != "" ? (
                        <>{chosenUser?.firstname} {chosenUser?.lastname}</>
                    ) : (<>Unknown</>)}</h4>
                    <div className='row mt-3'>
                        <div className="col-lg-6 col-sm-12 mb-1">
                            <img src="https://cdn-icons-png.flaticon.com/128/9533/9533813.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.username} readOnly></input>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <img src="https://i.ibb.co/4MSQKGX/Capture-removebg-preview.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.gender == null ? ("Unkown") : (chosenUser?.gender)} readOnly></input>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-6 col-sm-12 mb-1">
                            <img src="https://cdn-icons-png.flaticon.com/128/9533/9533772.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.email} readOnly></input>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <img src="https://cdn-icons-png.flaticon.com/128/9533/9533758.png" className="modalIcon"></img>
                            <span className=''></span>
                            <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.phone == "" ? ("Unkown") : (chosenUser?.phone)} readOnly></input>
                        </div>
                    </div>
                    <div className="col mb-3">
                        <img src="https://cdn-icons-png.flaticon.com/128/9533/9533739.png" className="modalIcon"></img>
                        <span className=''></span>
                        <input className='form-control border border-2 rounded-3 px-4 py-1 ms-3' value={chosenUser?.location == "" ? ("Unkown") : (chosenUser?.location)} readOnly></input>
                    </div>
                    <p><b>Created at:</b> {changeFormatDate(chosenUser?.createdAt)}</p>
                    <p><b>Last updated at:</b> {changeFormatDate(chosenUser?.updatedAt)}</p>
                </div>
            </Modal>

            {/* Modal update user information */}
            <Modal open={isModalUpdateOpen} onOk={handleOkUpdate} onCancel={handleCancelUpdate} footer={[]}>
                <div>
                    <h4 className='text-center fw-bolder titleEdit'>Account Setting</h4>
                    <div className='row pt-3'>
                        <div className="col-sm-12 col-lg-4 text-center">
                            <Image src={chosenUser?.avatar} className='avatar rounded-circle border border-2'></Image>
                        </div>
                        <div className="col">
                            <form className="mb-2" onSubmit={handleUpdate}>
                                <div className="row">
                                    <div className="col-sm-12 col-lg-6 mb-2">
                                    <label for="" className="form-label text-secondary">First name</label>
                                    <input type="text" className="form-control border border-2" name="" id="" value={firstname} placeholder="First name" onChange={(e) => setFirstname(e.target.value)}></input>
                                    </div>                   <div className="col mb-2">
                                    <label for="" className="form-label text-secondary">Last name</label>
                                    <input type="text" className="border border-2 form-control" name="" id="" value={lastname} placeholder="Last name" onChange={(e) => setLastname(e.target.value)}></input>
                                    </div>     
                                </div>
                                <div className="mb-2">
                                    
                                </div>
                                <div className="mb-2">
                                    <label for="" className="form-label text-secondary">Username</label>
                                    <input type="text" className="border border-2 form-control" name="" id="" value={username} placeholder="Username" required onChange={(e) => setUsername(e.target.value)}></input>
                                </div>
                                <div className="mb-2">
                                    <label for="" className="form-label text-secondary">Gender</label>
                                    <select className="border border-2 form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="Male" readOnly>Male</option>
                                        <option value="Female" readOnly>Female</option>
                                    </select>
                                </div>

                                <div className="mb-2">
                                    <label for="" className="form-label text-secondary">Email</label>
                                    <input type="email" className="border border-2 form-control" name="" id="" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="mb-2">
                                    <label for="" className="form-label text-secondary">Phone</label>
                                    <input type="tel" className="border border-2 form-control" name="" id="" value={phone} placeholder="0123456789" onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}"></input>
                                </div>
                                <div className="mb-2">
                                    <label for="" className="form-label text-secondary">Address</label>
                                    <input type="text" className="border border-2 form-control" name="" id="" value={location} placeholder="Home Address" onChange={(e) => setLocation(e.target.value)}></input>
                                </div>
                                <button onClick={handleCancelUpdate} className="py-2 px-3 me-3 fw-bolder border-0 rounded-3 bg-secondary fw-bolder text-white">
                                    CANCEL
                                </button>
                                <button type="submit" className="okBtnModal py-2 px-3 mt-3 fw-bolder text-white rounded-3">SAVE CHANGES</button>
                            </form>
                        </div>
                    </div>


                </div>
            </Modal>
        </div>
    )
}
export default Students;