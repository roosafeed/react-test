import React, {Component} from "react";
import * as d3 from "d3";

class PieChart extends Component {
    constructor(props){
        super(props);
        this.createPieChart = this.createPieChart.bind(this);
    }

    componentDidMount(){
        this.createPieChart();
    }

    componentDidUpdate(){
        this.createPieChart();
    }

    createPieChart() {
        const node = this.node;

        const color = d3.scaleOrdinal()
            .domain(this.props.dataX.map(d => d))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), this.props.data.length).reverse());

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(this.props.size[0], this.props.size[1]) / 2 - 1);

        const pie = d3.pie()
            .sort(null)
            .value(d => d);

        const arcs = pie(this.props.data);

        d3.select(node)
            .attr("viewBox", [-this.props.size[0] / 2, -this.props.size[1] / 2, this.props.size[0], this.props.size[1]]);

        d3.select(node)
            .append("g")
            .attr("stroke", "white")
        .selectAll("path")
        .data(arcs)
        .join("path")
            .attr("fill", d => color(d.data))
            .attr("d", arc)
        .append("title")
            .text((d, i) => `${this.props.dataX[i]}: ${d.data.toLocaleString()}`);
            ;

        d3.select(node)
            .append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
        .selectAll("text")
        .data(arcs)
        .join("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text((d, i) => this.props.dataX[i]))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.4 || d.data != 0).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.toLocaleString()));

        d3.selectAll('g')
        .attr('transform', 'scale(0)')
        .transition()
        .duration(1000)
        .ease(d3.easeBackIn)
        .attr('transform', 'scale(1)');
    }

    render() {
        return <svg ref={node => this.node = node}
        width={600} height={600}>
        </svg>
     }
}

export default PieChart;