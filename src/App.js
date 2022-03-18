import React from "react";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Signup from "./Signup";
import Login from "./Login";
import SortURL from "./SortURL";
import NoPageFound from "./NoPageFound";
import Header from "./Header";

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={SortURL} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
