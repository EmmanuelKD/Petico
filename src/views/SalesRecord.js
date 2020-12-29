import React ,{useRef} from 'react';
import { SalesRecordsProvider, SalesRecordsConsumer } from "../modules/SalesRecordContext"

import DiaplayDataAndTotals from "./DisplayDataAndTotal"
import TextField from '@material-ui/core/TextField';
import { saleRecordMapOrder } from '../modules/dataMapOrder';
import { useSnackbar } from 'notistack';
import ZTable from "./zTable/Ztable"
import { monthIndex } from "../utils"

import { updateSalesAwaitingAproval, addAllSalesAwaitingAproval, isSalesAwaitingAproval } from "../controller/crudModules"

import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    addButton: {
        backgroundColor: theme.palette.primary.light,
        height: "60px",
        float: "right"
    }, newlyAddedRecords: {
        backgroundColor: "#f5f5f5",
        width: "100%",
        minHeight:"75%",
        maxHeight: "90%"

    }, rootEditText: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },dialogMain:{
        width: "100%",
height:"100%",

    }, Table: {
        height: "50px",
        width: "100%",
        backgroundColor: "#f5f5f5",
    },
}));





export default function StockRecord() {


    return (
        <SalesRecordsProvider>
            <SalesRecordsConsumer>

                {
                    (value) => {
                        return <DiaplayDataAndTotals
                        total={value.salesTotal}
                        awaitingData={value.awaitingAproval}
                        data={value.selecteYearData} DialogChild={AddsalesRecordPage} 
                        dialogTitle={"add more Stock to store"} mapOrder={saleRecordMapOrder} />
                    }
                }
            </SalesRecordsConsumer>
        </SalesRecordsProvider>

    );
}






function AddsalesRecordPage(props) {
    const classes = useStyles();

    const amountEditText = useRef()
    const receiversEditText = useRef()

    let presentYear = new Date().getFullYear().toString();
    let presentMonth = new Date().getMonth().toString();

    const { enqueueSnackbar } = useSnackbar();


    const handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };


    const [salesdata, setData] = React.useState([{
        Date: "",
        Receiver: "",
        Amount: "",

    }])

    function addDataToState(data) {
        setData(old => [...old, data]);
    }


    async function onAddButtonclick() {

        let amountEdit = amountEditText.current?.value;
        let receiversEdit = receiversEditText.current?.value;
     

        if (receiversEdit &&
            amountEdit 
        ) {

            let salesRecord = {
                Date: new Date(),
                Receiver: receiversEdit,
                Amount: amountEdit,
              
            }


            try {

                let month = getKey();
                console.log(month)
                let dataExist = await isSalesAwaitingAproval(presentYear)
                if (dataExist) {
                    updateSalesAwaitingAproval(presentYear, month, salesRecord).then((data) => {
                        handleClickVariant("data added", "success")
                        addDataToState(salesRecord)

                    }).catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })

                } else {
                    addAllSalesAwaitingAproval(presentYear, {
                        years: presentYear,
                        [month]: [salesRecord],
                    }).then((data) => {
                        handleClickVariant("data added", "success")
                        addDataToState(salesRecord)

                    }).catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })
                }

            } catch (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                handleClickVariant(errorMessage, "error")
            }

        } else {
            handleClickVariant("please check fields", "error")

        }


      amountEditText.current.value=""
      receiversEditText.current.value=""

    
      receiversEditText.current.focus();

        function getKey() {
            let month;
            // Object.keys(monthIndex).find((keys, index) => monthIndex[keys] == presentMonth && keys

            Object.keys(monthIndex).find((keys, index) => {
                if (monthIndex[keys] == presentMonth
                ) month = keys;
            })
            return month;
        }


    }





    return (
        <div className={classes.dialogMain}>
            <div className={classes.newlyAddedRecords}>
            <ZTable data={salesdata} className={classes.Table}
                    thStyle={{
                        position: "sticky", top: 0, zIndex: 0,

                    }}
                    tdStyle={{
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                    mapOrder={saleRecordMapOrder}
                    withFooter={false}
                    totalFooterVal={[]}

                />
            </div>
            <form className={classes.rootEditText} noValidate autoComplete="off">
                <TextField id="filled-basic" inputRef={receiversEditText} label="Receiver name" variant="filled" />
                <FormControl variant="filled">
                    <FilledInput
                        inputRef={amountEditText}
                        id="filled-adornment-weight"
                        
                        onChange={() => { }}
                        endAdornment={<InputAdornment position="start">Le:</InputAdornment>}
                        aria-describedby="filled-weight-helper-text"
                        inputProps={{
                            'aria-label': 'total',
                        }}
                    />
                    <FormHelperText id="filled-weight-helper-text">Amount</FormHelperText>
                </FormControl>
                <Button className={classes.addButton}
                onClick={onAddButtonclick}
                >Add</Button>
            </form>
        </div>
    );
}









// async function onAddButtonclick() {

//         let amountEdit = amountEditText.current?.value;
//         let receiversEdit = receiversEditText.current?.value;
     

//         if (receiversEdit &&
//             amountEdit 
//         ) {

//             let salesRecord = {
//                 Date: new Date(),
//                 Receiver: receiversEdit,
//                 Amount: amountEdit,
              
//             }


            // try {

            //     let month = getKey();
            //     console.log(month)
            //     let dataExist = await isSalesRecordDataExist(presentYear)
            //     if (dataExist) {
            //         updateSalesRecords(presentYear, month, salesRecord).then((data) => {
            //             handleClickVariant("data added", "success")
            //             addDataToState(salesRecord)

            //         }).catch((error) => {
            //             var errorCode = error.code;
            //             var errorMessage = error.message;
            //             handleClickVariant(errorMessage, "error")
            //         })

            //     } else {
            //         addSalesRecords(presentYear, {
            //             years: presentYear,
            //             [month]: [salesRecord],
            //         }).then((data) => {
            //             handleClickVariant("data added", "success")
            //             addDataToState(salesRecord)

            //         }).catch((error) => {
            //             var errorCode = error.code;
            //             var errorMessage = error.message;
            //             handleClickVariant(errorMessage, "error")
            //         })
            //     }

            // } catch (error) {
            //     var errorCode = error.code;
            //     var errorMessage = error.message;
            //     handleClickVariant(errorMessage, "error")
            // }

//         } else {
//             handleClickVariant("please check fields", "error")

//         }


//       amountEditText.current.value=""
//       receiversEditText.current.value=""

    
//       receiversEditText.current.focus();

//         function getKey() {
//             let month;
//             // Object.keys(monthIndex).find((keys, index) => monthIndex[keys] == presentMonth && keys

//             Object.keys(monthIndex).find((keys, index) => {
//                 if (monthIndex[keys] == presentMonth
//                 ) month = keys;
//             })
//             return month;
//         }


//     }
