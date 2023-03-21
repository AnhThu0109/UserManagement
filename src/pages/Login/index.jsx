import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginUser from '../../utils/loginUser';
import "./style.css";

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
      const response = await loginUser(user);
      console.log(response);
      if (response.ok){
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        setToken(data.accessToken);
        localStorage.setItem("id", data._id);
        localStorage.setItem("userFirstName", data.firstname);
        localStorage.setItem("active", 1);
        localStorage.setItem("isAdmin", data.isAdmin);
        setToken(data.accessToken);
        navigate("/home");
      }   
      else if (response.status === 404) { // handle 404 error
      setIsAuth(false);
      setErrMess("Incorrect password");
      } else {
      setIsAuth(false);
      setErrMess("User not found");
      }
    } catch (error) {
      console.error(error);   
    }
  };


  return (
    <div className='p-5 ms-lg-5 ms-sm-3 mt-lg-4 mt-sm-3'>
      <div className='loginForm'>
        <h4 className='fw-lighter text-center'>Login to your account<br></br>
          <small className='text-black-50 textLogin'>Please log in to see more information.</small>
        </h4>     
        <div>
        <form onSubmit={handleSubmit} className="pt-4 border p-sm-3 p-lg-4 rounded-3 bg-white">
          <div className='mb-sm-2 mb-lg-3'>
            <label htmlFor="text" className='form-label'>Username:</label>
            <input
              className='form-control border border-3'
              type="input"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          
          <div className='mb-sm-2 mb-lg-3'>
            <label htmlFor="password" className='form-label'>Password:</label>
            <input
              className='form-control border border-3'
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className='mt-3 mb-3 text-white btn btn-secondary formLoginBtn'>Login</button><br></br>
          <small className='text-secondary'>Don't have an account?<Link to="/register" className='text-decoration-none'> Created here!</Link></small>
        </form>
        </div>     

        {
          isAuth == false && (
            <h5 className='text-danger pt-4 text-center'>{errMess}. Please type again.</h5>
          )
        }
      </div>
    </div>
  );
};

export default Login;
