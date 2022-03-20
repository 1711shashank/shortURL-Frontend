import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
// import Table from 'react-bootstrap/Table';
// import 'bootstrap/dist/css/bootstrap.min.css';



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
  let [userName, setUserName] = useState([]);
  let [authUserState, setAuthUserState] = useState([]);


  // const userData = [{ "Long Url ": "Long Url", "Sort URL": "Sort URL", "URL Created Before": "URL Created Before", "Short URL Used": "Short URL Used" }];
  const userData = [{ "Long Url ": "", "Sort URL": "", "URL Created Before": "", "Short URL Used": "" }];
  const [state, setState] = useState(userData);
  const [longUrl, setLongUrl] = useState();


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

    async function fetchUserData() {
      if (localStorage.getItem('isLoggedIn')) {
        let response = await fetch('http://localhost:5000/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
          }
        });

        response = await response.json();
        response = response.res.urlData;
        console.log("response dashboard: ", response);

        userData.push(response);

        console.log("userData",userData);
        console.log("state",state);


      }

    }

    fetchUserData();
  })

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
      <h1 > {userName}  </h1>

      <button onClick={handleAuth}> {buttonValue} </button>
      
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setLongUrl(e.target.value)} />
        <button type="submit"> Sort this URL</button>
      </form>


      <table >

        <tbody>
          <tr>
            <td> <th>Long Url              </th>         </td>
            <td> <th>Sort URL              </th>         </td>
            <td> <th>URL Created Before    </th>	       </td>
            <td> <th>Short URL Used        </th>         </td>
          </tr>

        </tbody>

        <tbody bordered={true}>

          {state.map((item) => (

            <tr>
              
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>

          ))}
        </tbody>


      </table>

    </div>
  );
}

export default App;