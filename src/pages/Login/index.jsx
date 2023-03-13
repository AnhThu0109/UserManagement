import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(1);
  const navigate = useNavigate();
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
};

  useEffect(() => {

  }, [])
  

  return (
    <div className='p-5'>
      <h2 className='fw-bolder'>Login to your account</h2>
      <p className='fw-bolder'>Please log in to see more information.</p>
      <form onSubmit={handleSubmit} className="pt-4">
        <div>
          <label htmlFor="text" className='form-label'>Username:</label>
          <input
            className='form-control'
            type="input"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className='form-label'>Password:</label>
          <input
            className='form-control'
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className='mt-3 text-white btn btn-info'>Login</button>
      </form>
      {
        session == undefined? (
            <h5 className='text-danger pt-4'>Incorrect username or password. Please type again.</h5>
        ) : (
            <></>
        )
      }
    </div>
  );
};

export default Login;
