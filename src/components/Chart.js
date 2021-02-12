import React from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

function Chart(props) {
    if(props.username == 'john'){
        return <BarChart data={props.dy} dataX={props.dx} size={[600, 500]} />;
    }
    else if(props.username == 'micky'){
        return <PieChart data={props.dy} dataX={props.dx} size={[600, 500]} />;
    }
}

export default Chart;