import React, { useState, useEffect } from 'react';
import "./../style.css";

function MyAccount() {
  const [users, setUsers] = useState([]);
  const [jwtToken, setJwtToken] = useState('');
  const t = localStorage.getItem("token");

  useEffect(() => {
    setJwtToken(t);
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:8000/v1/user/', {
          headers: {
            'token': `Bearer ${t}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className='content p-sm-3 px-lg-5 py-3'>
      <h1>User Info</h1>
      <div>
        <p className='float-start'>heloo</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero debitis, facilis placeat dolorem tempore esse. Inventore possimus, tempora unde omnis laboriosam provident reiciendis molestias, cum praesentium, consequuntur dolor iure. Incidunt!</p>
      </div>
      <div className='row'>
        <div className="col">

        </div>
        <div className="col">

        </div>
      </div>
    </div>
  );
}

export default MyAccount;
