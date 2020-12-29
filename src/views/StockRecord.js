import React, { useRef } from 'react';
import { StockRecordsProvider, StockRecordsConsumer } from "../modules/StockRecordsDataContext"
import { useSnackbar } from 'notistack';
import ZTable from "./zTable/Ztable"
import DiaplayDataAndTotals from "./DisplayDataAndTotal"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { monthIndex } from "../utils"
import {
    checkIfProductSalesTotalExist,
    updateProductTotal,createProductSalesTotalifNotExist,

    updateStockRecords,
     addStockRecords, isStockRecordDataExist } from "../controller/crudModules"
import { stockRecordMapOrder } from '../modules/dataMapOrder';


const useStyles = makeStyles((theme) => ({

    addButton: {
        backgroundColor: theme.palette.primary.light,
        height: "60px",
        float: "right"
    }, newlyAddedRecords: {
        backgroundColor: "#f5f5f5",
        width: "100%",
        minHeight: "75%",
        maxHeight: "90%"

    }, rootEditText: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }, dialogMain: {
        width: "100%",
        height: "100%",

    }, Table: {
        height: "50px",
        width: "100%",
        backgroundColor: "#f5f5f5",
    },
}));





export default function StockRecord({displayEdit}) {


    return (
        <StockRecordsProvider>
            <StockRecordsConsumer>

                {
                    (value) => {
                        return <DiaplayDataAndTotals 
                        total={value.productTotal}
                        mapOrder={stockRecordMapOrder}
                         displayEdit={displayEdit}
                        data={value.selecteYearData} dialogTitle={"add more Stock to store"}
                            DialogChild={AddStockRecorsPage} />
                    }
                }
            </StockRecordsConsumer>
        </StockRecordsProvider>

    );
}


function AddStockRecorsPage(props) {
    const classes = useStyles();
    const descriptionRef = useRef()
    const quantityRef = useRef()
    const unitCostRef = useRef()
    const totalCostRef = useRef()

    let presentYear = new Date().getFullYear().toString();
    let presentMonth = new Date().getMonth().toString();

    const { enqueueSnackbar } = useSnackbar();


    const handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };


    const [stkdata, setData] = React.useState([{
        Date: "",
        Description: "",
        Quantity: "",
        Unit_Cost: "",
        Total_Unit_Cost: "",
    }])

    function addDataToState(data) {

        setData(old => [...old, data]);

    }


    async function onAddButtonclick() {

        var description = descriptionRef.current?.value;
        var quantity = quantityRef.current?.value;
        var unitCost = unitCostRef.current?.value;
        var TotalCost = totalCostRef.current?.value;

        if (description &&
            quantity &&
            unitCost &&
            TotalCost
        ) {

            let stockRecord = {
                Date: new Date(),
                Description: description,
                Quantity: quantity,
                Unit_Cost: unitCost,
                Total_Cost: unitCost * quantity,
            }


            try {

                let month = getKey();
                
                let dataExist = await isStockRecordDataExist(presentYear)//todo refactor needed
                if (dataExist) {
                    updateStockRecords(presentYear, month, stockRecord).then(async (data) => {

                        let totalsExist=await checkIfProductSalesTotalExist()
                        if(totalsExist){
                          await updateProductTotal(unitCost * quantity).then(()=>{
                            handleClickVariant("data added", "success")
                            addDataToState(stockRecord)

                          })

                        }else{
                            console.log("still creating" +totalsExist)

                            createProductSalesTotalifNotExist({ProductTotal:(unitCost * quantity)}).then(()=>{
                                handleClickVariant("data added", "success")
                                addDataToState(stockRecord)

                            })
                        }

                    }).catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })

                } else {
                    addStockRecords(presentYear, {
                        years: presentYear,
                        [month]: [stockRecord],
                    }).then(async(data) => {

                        let totalsExist=await checkIfProductSalesTotalExist()
                        if(totalsExist){
                          await updateProductTotal(unitCost * quantity).then(()=>{
                            handleClickVariant("data added", "success")
                            addDataToState(stockRecord)

                          })

                        }else{
                            console.log("still creating" +totalsExist)
                            createProductSalesTotalifNotExist({ProductTotal:(unitCost * quantity)}).then(()=>{
                                handleClickVariant("data added", "success")
                                addDataToState(stockRecord)

                            })
                        }
                    

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



        descriptionRef.current.value = ""
        quantityRef.current.value = ""
        unitCostRef.current.value = ""
        totalCostRef.current.value = ""


        descriptionRef.current.focus();

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

    // this determins how the data can be arranged on the table

    return (
        <div className={classes.dialogMain}>
            <div className={classes.newlyAddedRecords}>
                <ZTable data={stkdata} className={classes.Table}
                    thStyle={{
                        position: "sticky", top: 0, zIndex: 0,

                    }}
                    tdStyle={{
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                    mapOrder={stockRecordMapOrder}
                    withFooter={false}
                />
            </div>
            <form className={classes.rootEditText} noValidate autoComplete="off">
                <TextField inputRef={descriptionRef} id="filled-basic" label="description" variant="filled" />
                <TextField inputRef={quantityRef} type="number" id="filled-basic" label="quantity" variant="filled"
                    onChange={(e) => {
                        if (unitCostRef.current.value) {
                            totalCostRef.current.value = unitCostRef.current.value * e.target.value
                        }
                    }}
                />
                <TextField inputRef={unitCostRef}
                    onChange={(e) => {
                        if (quantityRef.current.value) {
                            totalCostRef.current.value = quantityRef.current.value * e.target.value
                        }
                    }}
                    type="number" id="filled-basic" label="unitCost" variant="filled" />


                {/* <TextField  type="number" id="filled-basic" label="totalUnitCost" variant="filled" /> */}

                <FormControl variant="filled">
                    <FilledInput
                        inputRef={totalCostRef}
                        id="filled-adornment-weight"
                        // value={values.weight}
                        disabled
                        onChange={() => { }}
                        endAdornment={<InputAdornment position="start">Le:</InputAdornment>}
                        aria-describedby="filled-weight-helper-text"
                        inputProps={{
                            'aria-label': 'total',
                        }}
                    />
                    <FormHelperText id="filled-weight-helper-text">Total</FormHelperText>
                </FormControl>


                <Button className={classes.addButton}
                    onClick={onAddButtonclick}
                >Add</Button>
            </form>
        </div>
    );
}


