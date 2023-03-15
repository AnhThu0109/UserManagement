import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../../utils/registerUser';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        let user = {
            "username": username,
            "email": email,
            "password": password,
        }
      const data = await registerUser(user);
      console.log(data);
      if(data != undefined){
        navigate('/login');
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column'>
      <label>
        Username:
        <input type="text" id="username"
        name="username"
        value={username}
        onChange={handleUsernameChange} />
      </label>
      <label>
        Email:
        <input type="email" id="email"
        name="email"
        value={email}
        onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
