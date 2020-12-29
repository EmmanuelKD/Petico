import React from 'react'
import { StockRecordContext } from "../controller/contexts"

import { getAllStockRecordsByYear, getAllStockRecordsByYearStream, updateProductTotal, getTotalProductAndSalesStream } from "../controller/crudModules"


export default class StockRecordsProvider extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            presentYear: this.presentYear,
            presentMonth: this.presentMonth,
            allYearData: [],
            selecteYearData: {},
            selectedMonthData: [],
            productTotal: 0
        }

    }

    componentDidMount() {

        this.loadFromFirestore(this.presentYear);

    }


    // load presentYearDataFirst 

    // on select setSelectedYear load selected into allYears ans set selected year data to the newly selected year



    presentYear = new Date().getFullYear().toString();
    presentMonth = new Date().getMonth().toString();

    loadFromFirestore = async (Year) => {

        //    var listOfData= await getAllStockRecordsByYear(this.presentYear)
        //     this.setState({selecteYearData: listOfData})

        getAllStockRecordsByYearStream(this.presentYear, this.setData);

        getTotalProductAndSalesStream(this.setProductTotal)
    }

    setProductTotal = (total) => {
        this.setState({ productTotal: total["ProductTotal"] })
    }
    setData = (data) => {
        this.setState({ selecteYearData: data.data() })
    }

    setSelectedYear = (Year) => {
        //load data from firestore
    }

    render() {



        return (<StockRecordContext.Provider
            value={{
                state: this.state,
                selecteYearData: this.state.selecteYearData,
                productTotal: this.state.productTotal
            }}>
            {
                this.props.children
            }
        </StockRecordContext.Provider>
        )
    }
}
const StockRecordsConsumer = StockRecordContext.Consumer

export { StockRecordsProvider, StockRecordsConsumer }