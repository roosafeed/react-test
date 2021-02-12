import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
// import axios from 'axios';
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Login(props) {  

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

//   const referer = props.location.state.referer || '/';

  function postLogin() {
    // axios.post("/src/LoginHandle.js", {
    //   userName,
    //   password
    // }).then(result => {
    //   if (result.status === 200) {
    //     setAuthTokens(result.data);
    //     setLoggedIn(true);
    //   } else {
    //     setIsError(true);
    //   }
    // }).catch(e => {
    //   setIsError(true);
    // });
    //Above method is better, but this will do for now
    if((userName.toLowerCase() == "john" && password == "12345") || (userName.toLowerCase() == "micky" && password == "98765")){
        setAuthTokens({"username": userName.toLowerCase()});
        setLoggedIn(true);
    }
    else{
        setIsError(true);
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/admin" />;
  }

  return (
    <Card>
      <h1>Login</h1>
      <Form>
        <Input
          type="username"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;