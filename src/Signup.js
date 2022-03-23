import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Login.css";


async function signupUser(credentials) {
  try {
    let response = await fetch('http://localhost:5000/auth/signup', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    response = await response.json();
    console.log(response.message);
    return response;

  }
  catch (err) {
    console.error('Error:', err);
  }

}

export default function Signup() {
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertError, setAlertError] = useState("");


  const handleSubmit = async e => {
    e.preventDefault();
    let response = await signupUser({ name, email, password });
    if (response.statusCode === 200) {
      setAlertError(response.message);
    }
    if (response.statusCode === 409) {
      setAlertError(response.message);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1>Create Account</h1>
        {alertError !== ""
          ? <h3 style={{ color: "palegreen" }}> {alertError} </h3>
          : <h3></h3>
        }

        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            onChange={e => setName(e.target.value)}
          />
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
            variant="outlined"
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained">Log in</Button>
        </Box>
        <Link to='/login'>
          <h5 style={{ textDecoration: 'none' }}> Click here to LogIn </h5>
        </Link>

      </div>






    </div>
  )
}

