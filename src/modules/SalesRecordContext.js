import React from 'react'
import { SalesRecordContext } from "../controller/contexts"
import { SalesData, years } from "./fakeData"
import { getAllSalesRecordsByYearStream,getAllSalesAwaitingAprovalStream,getTotalProductAndSalesStream } from "../controller/crudModules"

export default class SalesRecordsProvider extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            presentYear: this.presentYear,
            presentMonth: this.presentMonth,
            allYearData: [],
            selecteYearData: {},
            selectedMonthData: [],
            awaitingAproval:{},
            salesTotal:0
        }

    }

    componentDidMount() {

        getAllSalesAwaitingAprovalStream(this.presentYear,this.setawaitingData)

        getAllSalesRecordsByYearStream(this.presentYear, this.setData)

        getTotalProductAndSalesStream(this.setSalesTotal)
    }

    setSalesTotal = (total) => {
        this.setState({ salesTotal: total["SalesTotal"] })
    }



      setawaitingData = (data) => {
    this.setState({ awaitingAproval: data.data() })
       }


    presentYear = new Date().getFullYear().toString();
    presentMonth = new Date().getMonth().toString();



    setData = (data) => {
        this.setState({ selecteYearData: data.data() })
    }

    setSelectedYear = (Year) => {
        this.setState({ presentYear: Year})
    }

    render() {

        return (<SalesRecordContext.Provider
            value={{
                selecteYearData: this.state.selecteYearData,
                awaitingAproval: this.state.awaitingAproval,
                salesTotal:this.state.salesTotal

            }}>
            {
                this.props.children
            }
        </SalesRecordContext.Provider>
        )
    }
}
const SalesRecordsConsumer = SalesRecordContext.Consumer

export { SalesRecordsProvider, SalesRecordsConsumer }