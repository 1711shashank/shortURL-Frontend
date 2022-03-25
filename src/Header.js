import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import "./Header.css";



function Header() {
  const history = useHistory();
  let [buttonValue, setButtonValue] = useState('Log In');
  let [userName, setUserName] = useState([]);
  let [checkUserAuth, setCheckUserAuth] = useState();


  useEffect(() => {
    console.log("1st UserEffect");
    async function checking() {
      setCheckUserAuth(localStorage.getItem('isLoggedIn'));
      if (checkUserAuth === 'true') {
        let userName = localStorage.getItem('Name');
        setUserName(userName);
        setButtonValue('Log Out');
      }
      else {
        setUserName("Hello ");
        setButtonValue('Log In');
      }
    }
    checking();
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    if (buttonValue === 'Log In') {
      history.push('/login')
    } else {

      setButtonValue('Log In');

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('Name');
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      window.location.reload(false);

    }
  }


  return (
    <div className='header'>
      <div className='header__userName'><h1 > {userName}  </h1></div>
      <div className='header__heading'> <h1> Sort URL </h1> </div>
      <div className='header__loginBtn'>
        <Button variant="contained" onClick={handleAuth}>{buttonValue}</Button>
      </div>

    </div>
  )
}

export default Header;