import React, { useState, useEffect } from "react";
import { getUserById } from "../../utils/getUser";
import updateUser from "../../utils/updateUser";
import { Image, notification, Space } from "antd";
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
  const [text, setText] = useState("");
  const Context = React.createContext({
    name: 'Default',
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification`,
      description: <Context.Consumer>{() => `Hello, user's info was updated !!!`}</Context.Consumer>,
      placement,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    let user = {
      "firstname": firstname,
      "lastname": lastname,
      "username": username,
      "email": email,
      "phone": phone,
      "location": location
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
      });
    }
    getData();  
  }, []);

  return (
    <div className="row userInfo pt-lg-2">
      <div className="col-lg-3 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 ms-4 rounded-4 p-0">
        <div className="firstCol text-center">
          <Image src="https://demos.creative-tim.com/paper-dashboard/assets/img/damir-bosnjak.jpg" alt="" className="w-100 bgInfoImg"></Image>
          <Image src="https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg" className="avatar rounded-circle border border-2"></Image>
        </div>
        
        <div className="firstColInfo text-center">
          <h3 className="py-3">{user?.firstname != null && user?.lastname != null ? (<>{user?.firstname} {user?.lastname}</>) : ("Unknown")}</h3>
          <p className="pb-5">{user?.email}</p>
        </div>

      </div>
      <div className="col-lg-8 col-sm-11 border-0 bg-white mt-lg-4 mt-sm-3 ms-4 rounded-4 p-3 mb-sm-3 mb-lg-0">
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
            <div className="col">
              <label for="" className="form-label text-secondary">Email</label>
              <input type="email" className="form-control" name="" id="" value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)}></input>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-lg-6 col-sm-12 mb-3">
              <label for="" className="form-label text-secondary">Phone</label>
              <input type="phone" className="form-control" name="" id="" value={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value)}></input>
            </div>
            <div className="col">
              <label for="" className="form-label text-secondary">Address</label>
              <input type="text" className="form-control" name="" id="" value={location} placeholder="Home Address" onChange={(e) => setLocation(e.target.value)}></input>
            </div>
          </div>
          <Context.Provider>
            {contextHolder}
          <Space>
          <button type="submit" className="border-0 rounded-pill py-2 px-4 mt-3 fw-bolder text-white savechangeBtn" onClick={() => openNotification('bottomRight')}>UPDATE PROFILE</button>
          </Space>
          </Context.Provider>
        </form>
      </div>
    </div>
    
  );
}

export default MyAccount;
