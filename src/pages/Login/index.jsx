import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginUser from '../../utils/loginUser';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(true);
  const [errMess, setErrMess] = useState("");
  const [token, setToken] = useState(1);
  const navigate = useNavigate();
  let t = localStorage.getItem('token');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let user = {
      "username": username,
      "password": password,
    }
    try {
      const data = await loginUser(user);
      console.log(data);
      if(data){
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        localStorage.setItem("id", data._id);
        setToken(data.accessToken);
        localStorage.setItem("active", 1);
        navigate("/");
      } else {
        setIsAuth(false);
        setErrMess(data);
      }
    } catch (error) {
      console.error(error);   
    }
  };


  return (
    <div className='p-5 ms-lg-5 ms-sm-3 mt-lg-4 mt-sm-3'>
      <div className='loginForm'>
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
          isAuth == false && (
            <h5 className='text-danger pt-4'>{errMess}. Please type again.</h5>
          )
        }
      </div>
    </div>
  );
};

export default Login;
