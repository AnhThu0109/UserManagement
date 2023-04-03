import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Image, message, Button, Modal, Spin, Space, Segmented, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
// Installed by "react-uploader" for upload avatar from computer
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { getUserById } from "../../utils/getUser";
import updateUser from "../../utils/updateUser";
import { changeFormatDate } from "../../utils/formatDate";
import deleteUser from '../../utils/deleteUser';
import { logOut } from '../../utils/logout';
import Avatar from "../../utils/avatar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./../style.css";
import "./style.css";

function MyAccount() {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  //Set time for loading page
  const setLoading = () => {
    setTimeout(() => {
      setIsLoad(true);
    }, 700);
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

    localStorage.setItem("userFirstName", firstname);//set firstname again if user change firstname ==> display in nav bar
    try {
      const data = await updateUser(id, token, user);
      if (data) {
        setIsUpdated(true);
        message.success(`User ${user?.username} is updated successfully !!!`); //Show successful message after updating
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Show modal to update avatar
  const [activeOption, setActiveOption] = useState("Illustrate Images");
  const [avatarSrc, setAvatarSrc] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
 
  const uploader = Uploader({ apiKey: "public_kW15bBX9oNC7bM5zxUA86tRCTNPF" }); //Real API key of https://upload.io

  //Function get active option of segmented
  const handleOptionChange = (value) => {
    setActiveOption(value);
    console.log(value);
  };

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const showModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };

  const handleOkUpdate = () => {
    setActiveIndex(-1); //reset active avatar chosen
    setIsModalUpdateOpen(false);
  };

  const handleCancelUpdate = () => {
    setActiveIndex(-1);
    setIsModalUpdateOpen(false);
    message.error('Upload avatar is canceled !!!');
  };

  //Update avatar function
  const handleUpdateAvatar = async (file) => {
    let user;

    //If user choose update avatar from computer ==> file source != ""
    if(file != ""){
      user = {
        "avatar": file,
      }
    } else {
      user = {
        "avatar": avatarSrc,
      }
    }
    
    try {
      const data = await updateUser(id, token, user);
      console.log(data);
      if (data) {
        setIsUpdated(true);
        handleOkUpdate(); //To close pop-up
        message.success(`Avatar is updated successfully !!!`); //Show successful message after changing avatar
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Function Upload Avatar from computer
  const completeUploadAvatar = (file) => {
    console.log(file);
    handleUpdateAvatar(file);
  }

  //Confirm delete and show message when cancel delete or delete successful
  const navigate = useNavigate();
  const confirm = (e) => {
    console.log(e);
    deleteUserById(id, token);
    message.success(`Your account is deleted successfully !!!`);
  };
  const cancel = (e) => {
      console.log(e);
      message.error('Delete request is canceled !!!');
  };

  //Delete user
  async function deleteUserById(index, tokenUser) {
    const response = await deleteUser(index, tokenUser)
    if (response.ok) { 
      await Promise.all([logOut(token), window.location.replace("/login")]);
    } else {
        console.log("error delete");
    }
}

  useEffect(() => {
    async function getData() {
      //get user info
      await getUserById(id, token).then((data) => {
        console.log(data);
        setUser(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setUsername(data.username)
        setEmail(data.email);
        setGender(data.gender);
        setPhone(data.phone);
        setLocation(data.location);
      });
    }
    getData();
    setIsUpdated(false);
    setLoading();
    clearTimeout(setLoading);
  }, [isUpdated]);

  return (
    <>
      {
        isLoad == true ? (
          <div className="row userInfo py-lg-2 d-flex justify-content-center">
            <div className="col-lg-4 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 me-lg-4 rounded-4 p-0">
              <div className="firstCol text-center">
                <Image src="https://demos.creative-tim.com/paper-dashboard/assets/img/damir-bosnjak.jpg" alt="" className="w-100 bgInfoImg"></Image>

                <Image src={user?.avatar} alt="Uploaded Image" className="avatar rounded-circle border border-2" />
              </div>

              <div className="firstColInfo text-center pt-2">
                <Button icon={<UploadOutlined />} onClick={showModalUpdate}>Change Avatar</Button>
                <h3 className="pt-3 pb-2">{user?.firstname != "" && user?.lastname != "" ? (<>{user?.firstname} {user?.lastname}</>) : ("Unknown")}</h3>
                <p>{user?.email}</p>
              </div>

              <div className="ps-3 pb-3">
                <img src="https://cdn-icons-png.flaticon.com/128/4112/4112187.png" className="inconInfo"></img> <b>Created: </b>
                {changeFormatDate(user?.createdAt)}
              </div>
              <div className="ps-3 pb-3">
                <img src="https://cdn-icons-png.flaticon.com/128/4112/4112347.png" className="inconInfo"></img> <b>Last updated: </b>
                {changeFormatDate(user?.updatedAt)}
              </div>
            </div>
            <div className="col-lg-7 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 rounded-4 p-3 mb-sm-3 mb-lg-0">
              <h3 className="fw-lighter">Edit Profile</h3>
              <form className="mb-3" onSubmit={handleUpdate}>
                <div className="row mb-2">
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <label for="" className="form-label text-secondary">First name</label>
                    <input type="text" className="form-control" name="" id="" value={firstname} placeholder="First name" onChange={(e) => setFirstname(e.target.value)}></input>
                  </div>
                  <div className="col">
                    <label for="" className="form-label text-secondary">Last name</label>
                    <input type="text" className="form-control" name="" id="" value={lastname} placeholder="Last name" onChange={(e) => setLastname(e.target.value)}></input>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <label for="" className="form-label text-secondary">Username</label>
                    <input type="text" className="form-control" name="" id="" value={username} placeholder="Username" required onChange={(e) => setUsername(e.target.value)}></input>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <label for="" className="form-label text-secondary">Gender</label>
                    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="Male" readOnly>Male</option>
                      <option value="Female" readOnly>Female</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-lg-6 col-sm-12 mb-3">
                    <label for="" className="form-label text-secondary">Email</label>
                    <input type="email" className="form-control" name="" id="" value={email} placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={(e) => setEmail(e.target.value)}></input>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <label for="" className="form-label text-secondary">Phone</label>
                    <input type="tel" className="form-control" name="" id="" value={phone} placeholder="Ex: 0123456789" onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}"></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label for="" className="form-label text-secondary">Address</label>
                    <input type="text" className="form-control" name="" id="" value={location} placeholder="Home Address" onChange={(e) => setLocation(e.target.value)}></input>
                  </div>
                </div>
                <button type="submit" className="float-end border-0 rounded-pill py-2 px-4 mt-3 fw-bolder text-white savechangeBtn">UPDATE PROFILE</button>

                {/* Pop-up confirm before delete account */}
                <Popconfirm
                    placement=""
                    title="Delete user"
                    description="Are you sure to delete your account?"
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                  <Link className="float-end border-0 rounded-pill py-2 px-4 mt-3 me-2 fw-bolder text-white text-decoration-none bg-danger deleteBtnAccount">
                  DELETE
                  </Link>
                </Popconfirm>
              </form>
            </div>

            {/* Modal of update avatar */}
            <Modal open={isModalUpdateOpen} onOk={handleOkUpdate} onCancel={handleCancelUpdate} footer={[
              <Button key="close" className="okBtnModal fw-bolder" onClick={() => handleUpdateAvatar("")}>
                SAVE
              </Button>,
            ]}>

              <Segmented
                options={['Illustrate Images', 'Upload']}
                selectedIndex={activeOption}
                onChange={handleOptionChange}>
              </Segmented><br></br>

              {
                activeOption === "Illustrate Images" ? (
                  // Show images when active option is "Illustrate Images" 
                  <div className="row mt-3">
                    {
                      Avatar.map((item, index) => (
                        <div key={index} className="col-3 px-1 pb-2">
                          <img src={item} className={index === activeIndex ? "activeImg rounded-2 w-100" : "rounded-2 w-100"} onClick={() => { setAvatarSrc(item); setActiveIndex(index); }}></img>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  // Show upload button when active option is "Upload" 
                  <UploadButton uploader={uploader}
                    options={{ multi: false }}
                    onComplete={files => files.map(x => completeUploadAvatar(x.fileUrl))}>
                    {({ onClick }) =>
                      <button onClick={onClick} className="mt-3 btn btn-secondary">
                        Upload your image here...
                      </button>
                    }
                  </UploadButton>
                )
              }
            </Modal>
          </div>
        ) : (
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
            className="text-center p-5"
          >
            <Space className="pt-5">
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </Space>
          </Space>
        )
      }
    </>
  );
}

export default MyAccount;
