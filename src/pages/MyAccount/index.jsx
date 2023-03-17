import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../utils/getUser";
import updateUser from "../../utils/updateUser";
import "./../style.css";
import "./style.css";

function MyAccount() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [username, setUsername] = useState();
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();
    let user = {
      "fullname": fullname,
      "username": username,
      "email": email,
      "password": password,
      "phone": phone,
      "location": location
    }
    try {
      const data = await updateUser(id, token, user);
      console.log(data);
      if(data){
        setText(data);
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
      });
    }
    getData();
    setUsername(user?.username)
    setEmail(user?.email);
  }, []);

  return (
    <div className="p-sm-3 px-lg-5 py-3 d-flex flex-column align-items-center">
      <h3 className="userTitle py-3 px-lg-5 px-sm-1 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4322/4322991.png"
          className="me-3"
        ></img>
        {user?.username}
      </h3>
      <form className="py-3 px-lg-5 px-sm-1 text-center" onSubmit={handleUpdate}>
        <div className="row mb-4">
          <div className="col">
            <label htmlFor="1stname">Full name</label><br></br>
            <input type="text" name="fullname" id="fullname" defaultValue={user?.fullname == null? "Unknown" : `${user?.fullname}`} value={fullname} onChange={(e) => setFullname(e.target.value)}/>
          </div>
          <div className="col">
            <label htmlFor="username">Username</label><br></br>
            <input type="text" name="username" id="username" defaultValue={user?.username} value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label htmlFor="email">Email Address</label><br></br>
            <input type="email" name="email" id="email" defaultValue={user?.email} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="col">
            <label htmlFor="password">Password</label><br></br>
            <input type="password" name="password" id="password" defaultValue={user?.password} value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="phone">Phone</label><br></br>
            <input type="phone" name="phone" id="phone" defaultValue={user?.phone == null? "Unknown" : `${user?.phone}`} value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <div className="col">
            <label htmlFor="location">Location</label><br></br>
            <input type="text" name="location" id="location" defaultValue={user?.location == null? "Unknown" : `${user?.location}`} value={location} onChange={(e) => setLocation(e.target.value)}/>
          </div>
        </div>

        <button className="btn btn-secondary mt-4 savechangeBtn">Save Changes</button>
      </form>
    </div>
  );
}

export default MyAccount;
