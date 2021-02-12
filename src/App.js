import React, { useState } from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { AuthContext } from "./context/auth";
import './App.css';

function App(props) {
  const token = localStorage.getItem("tokens");
  const existingTokens = token !== null ? JSON.parse(token) : null;
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
        
          <Redirect to="/admin" />
        
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
