import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Signup from "./Signup";
import Login from "./Login";
import SortURL from "./SortURL";
import RedirectURL from "./RedirectURL";
import NoPageFound from "./NoPageFound";
import Header from "./Header";

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/" component={SortURL} />
          <Route exact path="/:url" component={RedirectURL} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
