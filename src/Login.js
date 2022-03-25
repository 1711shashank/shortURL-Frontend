import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Login.css";


async function loginUser(credentials) {
  try {
    let response = await fetch('https://shortensurlbackend.herokuapp.com/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    response = await response.json();
    return response;

  }
  catch (err) {
    console.error('Error:', err);
  }

}

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertError, setAlertError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await loginUser({ email, password });
    console.log("Login Response", response);
    if (response.statusCode === 200) {

      if (response.message === 'Admin LogIn Successfully') {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', 'admin');
        localStorage.setItem('Name', 'admin');
        localStorage.setItem('token', response.data.token);
        history.push("/adminPage");
      }
      else if (response.message === 'LogIn Successfully') {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('Name', response.data.user.name);
        localStorage.setItem('token', response.data.token);
        history.push("/");
      }

    } else if (response.statusCode === 401) {
      setAlertError(response.message);
    } else if (response.statusCode === 403) {
      setAlertError(response.message);
    } else if (response.statusCode === 400) {
      setAlertError(response.message);
    }
  };

  return (
    <div className="login">
      <div className="login__container">

      <h1>Log-in</h1>

        {/* Below line can also be written as =>     {errorSet != '' && <h1>{errorSet}</h1>} */}
        {alertError !== '' ? <h3 style={{ color: "red" }}> {alertError} </h3> : <h3></h3>}

        
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            size="small"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">Log in</Button>
        </Box>

        <Link to='/signup'>
          <h5 style={{ textDecoration: 'none' }}> Create Account </h5>
        </Link>

      </div>

    </div>
  );
}
