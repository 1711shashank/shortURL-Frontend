import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import AdminTable from './AdminTable';
import Header from './Header';
import TextField from '@mui/material/TextField';
import "./App.css";



async function createSortURL(credentials) {
  try {

    var token = localStorage.getItem('token');
    var header = {};

    if (token) { header = { 'Content-Type': 'application/json', 'Authorization': token } }
    else { header = { 'Content-Type': 'application/json' } }

    let response = await fetch('https://shorturlshashank.herokuapp.com/sortURL', {
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

function AdminPage() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [longUrl, setLongUrl] = useState();

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      history.push("/");
    }
    fetchUserData();
  }, [])

  async function fetchUserData() {
    if (localStorage.getItem('isLoggedIn')) {
      let response = await fetch('https://shorturlshashank.herokuapp.com/dashboard', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      });

      response = await response.json();
      setState(response.res);

      console.log("response dashboard: ", response);

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSortURL({ "longUrl": longUrl });
    await fetchUserData();
  };

  return (
    <div className="AdminPage">
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
        <AdminTable state={state} />
      </div>

      {/* 
      <table>
        <tr key={"header"}>
          <th>User Name </th>
          <th>User Email ID</th>
          <th>Long Url</th>
          <th>Short URL</th>
          <th>URL Created Before</th>
          <th>Short URL Used</th>
        </tr>

        {state.map((item) => (
          // <tr key={item.id}>
          <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>

            {item.urlData.map((e) => {
              <td>
                <th>{e.longUrl}</th>
                <th>{e.sortUrl}</th>
              </td>

            })}


            <td>{item.urlData[0].longUrl}</td>
            <td>{item.urlData[0].sortUrl}</td>
            <td>{item.urlData[0].urlCreatedCount}</td>
            <td>{item.urlData[0].urlUsedCount}</td> 

          </tr>
        ))}
      </table> 
    */}

    </div>
  );
}

export default AdminPage;