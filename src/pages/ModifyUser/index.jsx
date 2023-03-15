import React, { useState, useEffect } from 'react';

function User() {
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

    // async function authenticate() {
    //   try {
    //     const response = await fetch('http://localhost:8000/v1/authenticate', {
    //       method: 'POST',
    //       body: JSON.stringify({ username: 'myusername', password: 'mypassword' }),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
    //     const { token } = await response.json();
    //     setJwtToken(token);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // authenticate();
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users && users.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
