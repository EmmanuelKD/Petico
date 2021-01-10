import React from 'react'
import '../scss/barchart.css'
import Card from "@material-ui/core/Card"
import {getTotalMonthAndDayStream} from '../../controller/crudModules'
import {useTheme} from "@material-ui/styles"
import {useMediaQuery} from "@material-ui/core"
function BarGroup(props) {
    
    const appTheme=useTheme();

    const isSmallScreen = useMediaQuery(appTheme.breakpoints.down('sm'));
  
  

    let barPadding = isSmallScreen?0:5
    let barColour =appTheme.palette.primary.main
    let widthScale = d => d * 1.5

    let width =widthScale(props.d.value)
    let yMid = isSmallScreen?(props.barHeight* 0.5)/2.5:props.barHeight* 0.5
    let xMid =isSmallScreen?(props.barHeight * .7)/2.5:props.barHeight * .7

   let height=isSmallScreen?(props.barHeight - barPadding)/2.5:props.barHeight - barPadding
   let y=isSmallScreen?0:barPadding * 0.5

    return <g className="bar-group">
        <text className="name-label" x={xMid*1.5} y={yMid*2} alignmentBaseline="middle"
            transform="rotate(90)">{isSmallScreen?props.d.name.substring(0,1):props.d.name}</text>
        <rect y={y} width={width} height={height} fill={barColour} />
        <text className="value-label" x={width - 8} y={yMid} alignmentBaseline="middle"
        >{props.d.value}</text>
    </g>
}


export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
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
       





        return <>

            <svg className="mainChartHeadings">
                <g>
                    <text className="title" x="10" y="30">Week beginning 9th July</text>
                </g>
                <g>
                    <text className="byView" x={this.props.x} y="30" style={{ opacity: this.state.isbyday ? .5 : 1 }} onClick={this.toggleByMonth}>This year</text>
                    <text className="byView" x={this.props.x2} y="30" style={{ opacity: this.state.isbyday ? 1 : .5 }} onClick={this.toggleByDay}>This week</text>

                </g>
            </svg>
            <div className="mainChartContainer" >
            <svg className="mainChart" height="200">
               <BarGroups data={this.state.data}/>
            </svg>
            </div>

        </>
    }
}

function BarGroups({data}){
    const appTheme=useTheme();

    const isSmallScreen = useMediaQuery(appTheme.breakpoints.down('sm'));
  
  
    let barHeight = isSmallScreen?(60/2.5):60
    return  <g className="container" transform={isSmallScreen?"translate(5,150) rotate(-90)":"translate(35,150) rotate(-90)"}>
   {
   data.map((d, i) => <g key={d.name + i} transform={`translate(0, ${i * barHeight})`}>
        <BarGroup i={i} d={d} barHeight={barHeight} />
    </g>)}
</g>
    
   
}