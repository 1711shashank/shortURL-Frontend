import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import AdminTable from './AdminTable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



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

function AdminPage() {
  const history = useHistory();
  let [buttonValue, setButtonValue] = useState('Log In');
  let [checkUserAuth, setCheckUserAuth] = useState();
  let [userName, setUserName] = useState([]);

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

      console.log("response  123", response.res);

      setState(response.res);

      console.log("response dashboard: ", state);

    }
  }

  useEffect(() => {
    if( localStorage.getItem('Name') !== 'admin'){
      history.push("/");
    }
    console.log("1st UserEffect");
    async function checking() {
      setCheckUserAuth(localStorage.getItem('isLoggedIn'));
      if (checkUserAuth === 'true') {
        let userName = localStorage.getItem('Name');
        setUserName("Hello " + userName);
        setButtonValue('Log Out');
      }
      else {
        setUserName("Hello ");
        setButtonValue('Log In');
      }
    }
    checking();
  });

  useEffect(() => {
    console.log("2nd UserEffect");
    fetchUserData();
  }, [])


  const handleAuth = async (e) => {
    e.preventDefault();
    if (buttonValue === 'Log In') {
      history.push('/login')
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('Name');
      localStorage.removeItem('token');
      setButtonValue('Log In');
      window.location.reload(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createSortURL({ "longUrl": longUrl });
    await fetchUserData();

  };

  return (
    <div className="App">
      <h1> Sort URL</h1>
      <h1 > {userName}  </h1>

      <Button variant="contained" onClick={handleAuth}>{buttonValue}</Button>

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

      <AdminTable state={state}/>

      {/* 
      <table>
        <tr key={"header"}>
          <th>User Name </th>
          <th>User Email ID</th>
          <th>Long Url</th>
          <th>Sort URL</th>
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