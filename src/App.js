import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Signup from "./Signup";
import Login from "./Login";
import UserPage from "./UserPage";
import RedirectURL from "./RedirectURL";
import NoPageFound from "./NoPageFound";
import AdminPage from "./AdminPage";

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/adminPage" component={AdminPage} />
          <Route exact path="/" component={UserPage} />
          <Route exact path="/:url" component={RedirectURL} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
