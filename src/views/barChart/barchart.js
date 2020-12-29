import React from 'react'
import '../scss/barchart.css'
import Card from "@material-ui/core/Card"
import {getTotalMonthAndDayStream} from '../../controller/crudModules'


function BarGroup(props) {
    let barPadding = 5
    let barColour = '#348AA7'
    let widthScale = d => d * 1.5

    let width = widthScale(props.d.value)
    let yMid = props.barHeight * 0.5
    let xMid = props.barHeight * .7

    return <g className="bar-group">
        <text className="name-label" x={xMid} y={yMid} alignmentBaseline="middle"
            transform="rotate(90)">{props.d.name}</text>
        <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
        <text className="value-label" x={width - 8} y={yMid} alignmentBaseline="middle"
        >{props.d.value}</text>
    </g>
}


export default class BarChart extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isbyday: true,
            byDay: null,
            byMonth: null,
        }
    }

    componentDidMount() {
        getTotalMonthAndDayStream(this.setMonthlyDataFromStore,this.setDalyDataFromStore);
        this.setState({ data: this.state.byDay ?? this.byDay, isbyday: true })

    }



    setDalyDataFromStore = (setbyDays) => {
        this.setState({ byDay: setbyDays})
    }
    setMonthlyDataFromStore = (setbyMonth) => {
        this.setState({byMonth: setbyMonth })
    }

    byMonth = [
        { name: 'Jan', value: 50 },
        { name: 'Feb', value: 20 },
        { name: 'Mar', value: 30 },
        { name: 'Apr', value: 40 },
        { name: 'May', value: 20 },
        { name: 'Jun', value: 5 },
        { name: 'Jul', value: 1 },
        { name: 'Aug', value: 1 },
        { name: 'Sep', value: 1 },
        { name: 'Oct', value: 1 },
        { name: 'Nov', value: 1 },
        { name: 'Dec', value: 1 },

    ]

    byDay = [
        { name: 'Mon', value: 100 },
        { name: 'Tue', value: 40 },
        { name: 'Wed', value: 35 },
        { name: 'Thu', value: 50 },
        { name: 'Fri', value: 55 },
        { name: 'Sat', value: 40 },
        { name: 'Sun', value: 30 },
    ]

    toggleByDay = () => this.setState({ data: this.state.byDay ?? this.byDay, isbyday: true }, () => console.log("byDay"));

    toggleByMonth = () => this.setState({ data: this.state.byMonth ?? this.byMonth, isbyday: false }, () => console.log("byDay"));


    render() {
        let barHeight = 60
        let barGroups = this.state.data.map((d, i) => <g key={d.name + i} transform={`translate(0, ${i * barHeight})`}>
            <BarGroup i={i} d={d} barHeight={barHeight} />
        </g>)





        return <Card className="mainCard">

            <svg className="mainChartHeadings">
                <g>
                    <text className="title" x="10" y="30">Week beginning 9th July</text>
                </g>
                <g>
                    <text className="byView" x="300" y="30" style={{ opacity: this.state.isbyday ? .5 : 1 }} onClick={this.toggleByMonth}>This year</text>
                    <text className="byView" x="450" y="30" style={{ opacity: this.state.isbyday ? 1 : .5 }} onClick={this.toggleByDay}>This week</text>

                </g>
            </svg>

            <svg className="mainChart" height="200">
                <g className="container" transform="translate(35,150) rotate(-90)">
                    {barGroups}
                </g>
            </svg>
        </Card>
    }
}

//   ReactDOM.render(
//     <BarChart />,
//     document.getElementById('app')
//   )