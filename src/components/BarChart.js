import React, {Component} from "react";
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props){
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount(){
        this.createBarChart();
    }

    componentDidUpdate(){
        this.createBarChart();
    }

    createBarChart() {
        const node = this.node
        const margin = ({top: 0, right: 10, bottom: 60, left: 40});

        const x = d3.scaleBand()
           .domain(d3.range(this.props.dataX.length))
           .range([margin.left, this.props.size[0] - margin.right])
           .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(this.props.data, d => d)]).nice()
            .range([this.props.size[1] - margin.bottom, margin.top]);

        const xAxis = g => g
           .attr("transform", `translate(0,${this.props.size[1] - margin.bottom})`)
           .call(d3.axisBottom(x).tickFormat(i => this.props.dataX[i]).tickSizeOuter(0));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)            
            .call(d3.axisLeft(y).ticks(null, this.props.data.format));

        const gradient = d3.select(node).append('svg:defs')
            .append("svg:linearGradient")
            .attr("id", "gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

            gradient.append("svg:stop")
                .attr("offset", "0%")
                .attr("stop-color", "#00d4ff")
                .attr("stop-opacity", 1);
        
            gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", "#020024")
                .attr("stop-opacity", 1);

        d3.select(node)
            .attr('viewBox', [0, 0, this.props.size[0], this.props.size[1]]);
        
        d3.select(node).append('g')            
            .attr('fill', 'url(#gradient)')
            .selectAll('rect')
            .data(this.props.data)
            .join('rect')
                .attr("y", d => y(d))  
                .attr("height", d => y(0) - y(d))
                .transition()
                .duration(1000)
                .ease(d3.easeBackIn)
                .attr("x", (d, i) => x(i)) 
                .attr("width", x.bandwidth());

        d3.select(node).append('g')
            .call(xAxis)
                .selectAll("text")
                .attr("transform", `translate(12, ${margin.bottom / 2}) rotate(90)`)

        d3.select(node).append('g')
            .call(yAxis);

        d3.select(node).selectAll('g')
            .attr('opacity', '0')
            .transition()
            .duration(500)
            .ease(d3.easeBackIn)
            .attr('opacity', '1');
        
    }

    render() {
        return <svg ref={node => this.node = node}
        width={600} height={600}>
        </svg>
     }
}

export default BarChart;