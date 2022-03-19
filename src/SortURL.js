import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

async function createSortURL(credentials) {
  try {
    let response = await fetch('http://localhost:5000/sortURL', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    response = await response.json();
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
      setUserDate("Hello ");
      setButtonValue('Log In');
      document.querySelector('.createAccount').style.display = 'block';
    }
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    if (buttonValue === 'Log In') {
      history.push('/login')
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('Name');
      setButtonValue('Log In');
    }



  }

  const userData = [{ "Long Url ": "", "Sort URL": "", "URL Created Before":"", "Short URL Used":"" }];
  const [state, setState] = useState(userData);
  const [longUrl, setLongUrl] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let dataObj = await createSortURL({"longUrl":longUrl});
    let newData = dataObj.urlData[0];

    delete newData._id;  

    setState([...state, newData]);

  };


  // const userData = [{ "Long Url ": "", "Sort URL": "" }];
  // const [state, setState] = useState(userData);
  // const [longUrl, setLongUrl] = useState();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   let newData = { "Long Url ": longUrl, "Sort URL": "lc.com" };
  //   setState([...state, newData]);

  // };


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


      {/* <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>URL Created</th>
            <th>URL Used</th>
          </tr>
        </thead>
        
        <thead>
          <tr>
            <th>FaceBook.com </th>
            <th>my_Sort_URL_fb</th>
            <th>1</th>
            <th>10</th>
          </tr>
        </thead>

      </table> */}
    </div>
  );
}

export default App;
