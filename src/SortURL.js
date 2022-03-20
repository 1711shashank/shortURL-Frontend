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

function App() {

  const history = useHistory();
  let [buttonValue, setButtonValue] = useState('Log In');
  let [checkUserAuth, setCheckUserAuth] = useState();
  let [userDate, setUserDate] = useState([]);
  let [authUserState, setAuthUserState] = useState([]);


  useEffect(() => {
    async function checking() {
      setCheckUserAuth(localStorage.getItem('isLoggedIn'));
      if (checkUserAuth === 'true') {
        let userName = localStorage.getItem('Name');

        setUserDate("Hello " + userName);
        setButtonValue('Log Out');

      }
      else {
        setUserDate("Hello ");
        setButtonValue('Log In');
      }
    }
    checking();
  });

  useEffect(() => {
    async function fetchUserData() {
      if (localStorage.getItem('isLoggedIn')) {
        let response = await fetch('http://localhost:5000/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        });
        response = await response.json();
        console.log("response dashboard: ", response.res);
        response.res.urlData.forEach(element => {
          console.log("element", element);
          setUserDate([...userData, element]);
          console.log('response userdata', userData);


        });

      }

    }

    // fetchUserData();
  }, [authUserState])

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

  const userData = [{ "Long Url ": "", "Sort URL": "", "URL Created Before": "", "Short URL Used": "" }];
  const [state, setState] = useState(userData);
  const [longUrl, setLongUrl] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataObj = await createSortURL({ "longUrl": longUrl });
    let newData = dataObj.data;
    console.log("newData", newData);
    delete newData._id;
    // if (!localStorage.getItem("isLoggined")) {
    setState([...state, newData]);
    // console.log("set State", state);
    // }
    // else
    // setAuthUserState([...authUserState,newData]);


  };




  return (
    <div className="App">
      <h1> Sort URL</h1>
      <h1 > {userDate}  </h1>

      <button onClick={handleAuth}> {buttonValue} </button>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setLongUrl(e.target.value)} />
        <button type="submit"> Sort this URL</button>
      </form>

      <table>
        <tr key={"header"}>
          {Object.keys(state[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
        {state.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
      </table>

    </div>
  );
}

export default App;
