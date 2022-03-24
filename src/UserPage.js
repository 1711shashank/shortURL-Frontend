import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import UserTable from './UserTable';
import TextField from '@mui/material/TextField';
import Header from './Header';
import "./App.css";

async function createSortURL(credentials) {
  console.log("Working");

  try {

    var token = localStorage.getItem('token');
    console.log("Token",token);
    var header = {};

    if (token) { header = { 'Content-Type': 'application/json', 'Authorization': token } }
    else { header = { 'Content-Type': 'application/json' } }

    let response = await fetch('http://localhost:5000/sortURL', {
      headers: header,
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    response = await response.json();
    console.log("short url response ", response);
    return response;

  }
  catch (err) {
    console.error('Error:', err);
  }

}

function UserPage() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [longUrl, setLongUrl] = useState();

  useEffect(() => {
    if (localStorage.getItem('role') === 'admin') {
      history.push("/adminPage");
    }
    if(localStorage.getItem('token') === null){
      history.push("/Login");
    }
    fetchUserData();
  }, [])

  async function fetchUserData() {
    if (localStorage.getItem('isLoggedIn')) {
      let response = await fetch('http://localhost:5000/dashboard', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      });

      response = await response.json();
      setState(response.res.urlData);

      console.log("response dashboard: ", response);

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSortURL({ "longUrl": longUrl });
    await fetchUserData();
  };

  return (
    <div className="UserPage">
      <Header />
      <div className='Page__inputURL'>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Enter URL"
            variant="outlined"
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </Box>
      </div>
      <div className='Page__Table'>
      <UserTable state={state} />
      </div>

    </div>
  );
}

export default UserPage;