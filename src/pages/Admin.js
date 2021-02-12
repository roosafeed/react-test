import React, { useEffect, useState } from "react";
import { SmallButton } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import {Redirect} from "react-router-dom"
import axios from "axios";
// import BarChart from "../components/BarChart";
import Chart from "../components/Chart";

function Admin(props) {
    const [isLoading, setLoading] = useState(true);
    const [dx, setDX] = useState();
    const [dy, setDY] = useState();
    
    const { setAuthTokens } = useAuth();
    const user = JSON.parse(localStorage.getItem("tokens"));

    function logOut() {
    setAuthTokens(null);
    <Redirect to="/" />
    }

    useEffect(() => {
        axios.get("https://api.github.com/repositories/19438/issues")
            .then(result => {
                var dataX = Array(),
                    dataY = Array();
                Array.from(result.data).forEach(el => {
                    dataX.push(new Date(el.created_at).toLocaleDateString());
                    dataY.push(el.comments);
                });
                setDX(dataX);
                setDY(dataY);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    if (isLoading) {
        return <div><p>Loading...</p></div>;
    }
    else {
        return (
            <div>
                <div>Welcome <b>{user.username}</b>  <SmallButton onClick={logOut}>Log out</SmallButton></div>
                <div id="chart">
                    {/* <BarChart data={dy} dataX={dx} size={[600, 500]} /> */}
                    <Chart dy={dy} dx={dx} username={user.username} />
                </div>
            </div>
        );
    }
    
}

export default Admin;