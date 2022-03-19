import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>


function Header() {

  const history = useHistory();
  let [buttonValue, setButtonValue] = useState('Log In');
  let [checkUserAuth, setCheckUserAuth] = useState();
  let [userDate, setUserDate] = useState('Hello');

  useEffect(async () => {
    checkUserAuth = localStorage.getItem('isLoggedIn');
    if (checkUserAuth === 'true') {
      let userName = localStorage.getItem('Name');

      setUserDate("Hello " + userName);
      setButtonValue('Log Out');
      document.querySelector('.createAccount').style.display = 'none';

    }
    else {

      setUserDate("Hello");
      setButtonValue('Log In');
      document.querySelector('.createAccount').style.display = 'block';

    }
  });

  const handleClick = async (e) => {
    e.preventDefault();

    if (buttonValue === 'Log In') {
      history.push('/login')
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('Name');
      setButtonValue('Log In');
    }

  }

  const handleCreateAccountBtn = () => {
    history.push('/signup');
  }


  return (
    <div>
      <h1 > {userDate}  </h1>
      <button onClick={handleCreateAccountBtn} className='createAccount'> Create Account </button>
      <button onClick={handleClick}> {buttonValue} </button>
    </div>
  )
}

export default Header