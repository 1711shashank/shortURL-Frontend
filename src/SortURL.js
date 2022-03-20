import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

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
      setState(response.res.urlData);

      console.log("response dashboard: ", response);

    }
  }

  useEffect(() => {
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
  },[])

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

      <button onClick={handleAuth}> {buttonValue} </button>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setLongUrl(e.target.value)} />
        <button type="submit"> Sort this URL</button>
      </form>

      <table>
        <tr key={"header"}>
          <th>Long Url</th>
          <th>Sort URL</th>
          <th>URL Created Before</th>
          <th>Short URL Used</th>
        </tr>

        {state.map((item) => (
          // <tr key={item.id}>
          <tr>
            <td>{item.longUrl}</td>
            <td>{item.sortUrl}</td>
            <td>{item.urlCreatedCount}</td>
            <td>{item.urlUsedCount}</td>
          </tr>
        ))}
      </table>

    </div>
  );
}

export default SortURL;