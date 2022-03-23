import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UserTable from './UserTable';
import Header from './Header';
import "./SortURL.css";



async function createSortURL(credentials) {
  try {

    var token = localStorage.getItem('token');
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

function SortURL() {

  const [state, setState] = useState([]);
  const [longUrl, setLongUrl] = useState();

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

  useEffect(() => {
    console.log("2nd UserEffect");
    fetchUserData();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    await createSortURL({ "longUrl": longUrl });
    await fetchUserData();

  };

  return (
    <div className="SortURL">
      <Header />

      <div className='SortURL__inputURL'>

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

      <div className='SortURL__Table'>
        <UserTable state={state} />
      </div>

    </div>
  );
}

export default SortURL;