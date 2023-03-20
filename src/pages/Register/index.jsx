import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from '../../utils/registerUser';
import "./style.css";

function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let user = {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "email": email,
        "password": password,
        "gender": gender
      }
      const data = await registerUser(user);
      console.log(data);
      if (data != undefined) {
        navigate('/login');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='py-4 signinContent'>
      <h4 className='fw-bolder text-center py-4'>Create an account</h4>
      <form onSubmit={handleSubmit} className="pt-4 border p-sm-3 p-lg-4 rounded-3 bg-white signinForm">
        <div className='row mb-2'>
          <div className='col'>
            <label>First name:</label>
            <input type="text" id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)} className="form-control border border-3" required />
          </div>
          <div className='col'>
            <label>Last name:</label>
            <input type="text" id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)} className="form-control border border-3" required />
          </div>
        </div>
        <label>Username:</label>
        <input type="text" id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} className="form-control border border-3 mb-2" required />

        <label>Email:</label>
        <input type="email" id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} className="form-control border border-3 mb-2" required />

        <label>Password:</label>
        <input type="password" id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} className="form-control border border-3 mb-2" required />

        <label>Gender:</label>
        <select className="form-select border border-3" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button type="submit" className='mt-3 mb-3 text-white btn btn-secondary formLoginBtn'>Submit</button>
      </form>
    </div>
  );
}

export default Register;
