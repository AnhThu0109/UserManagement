import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/getUser";
import updateUser from "../../utils/updateUser";
import { Image, notification, Space } from "antd";
import changeFormatDate from "../../utils/formatDate";
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
  const [text, setText] = useState("");

  //Show noti after update success
  const Context = React.createContext({
    name: 'Default',
  });

  //Show noti when delete successful
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, placement) => {
    notification[type]({
      message: 'Notification',
      description: `Hello, user's info is updated !!!`,
      placement,
    });
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
        setText(data + ' !!!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getData() {
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
  }, []);

  return (
    <div className="row userInfo pt-lg-2">
      <div className="col-lg-4 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 ms-4 rounded-4 p-0">
        <div className="firstCol text-center">
          <Image src="https://demos.creative-tim.com/paper-dashboard/assets/img/damir-bosnjak.jpg" alt="" className="w-100 bgInfoImg"></Image>
          <Image src={user?.avatar} className="avatar rounded-circle border border-2"></Image>
        </div>
        
        <div className="firstColInfo text-center">
          <h3 className="pt-3 pb-2">{user?.firstname != null && user?.lastname != null ? (<>{user?.firstname} {user?.lastname}</>) : ("Unknown")}</h3>
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
      <div className="col-lg-7 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 ms-4 rounded-4 p-3 mb-sm-3 mb-lg-0">
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>            
          </div>

          <div className="row mb-2">
          <div className="col-lg-6 col-sm-12 mb-3">
              <label for="" className="form-label text-secondary">Email</label>
              <input type="email" className="form-control" name="" id="" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="col-lg-6 col-sm-12">
              <label for="" className="form-label text-secondary">Phone</label>
              <input type="tel" className="form-control" name="" id="" value={phone} placeholder="0123456789" onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}"></input>
            </div>         
          </div>
          <div className="row mb-3 px-3">
              <label for="" className="form-label text-secondary">Address</label>
              <input type="text" className="form-control" name="" id="" value={location} placeholder="Home Address" onChange={(e) => setLocation(e.target.value)}></input>
            </div>
          <Context.Provider>
            {contextHolder}
          <Space>
          <button type="submit" className="border-0 rounded-pill py-2 px-4 mt-3 fw-bolder text-white savechangeBtn" onClick={() => openNotificationWithIcon("success", "bottomRight")}>UPDATE PROFILE</button>
          </Space>
          </Context.Provider>
        </form>
      </div>
    </div>
    
  );
}

export default MyAccount;
