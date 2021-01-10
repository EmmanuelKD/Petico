import React, { useState } from "react"
import CustomizedInputBase from "./SearchBar"
import { makeStyles ,useTheme} from '@material-ui/core/styles';
import Ztable from "./zTable/Ztable"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import CircularButton from "./CircularZButton"
import PrintIcon from '@material-ui/icons/Print';
import { paymentsRecordMapOrder } from "../modules/dataMapOrder"
import { getAllPaymentRecordsByYearStream, updatePaymentRecords, addAllPaymentRecordsRecords, isPaymentRecordDataExist } from '../controller/crudModules'
import { useSnackbar } from 'notistack';
import { monthIndex } from "../utils"
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from "./DateYearPicker"

import { useMediaQuery } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    floatButton: {
        position: "fixed",
        bottom: "100px",
        right: "40px",
    },
    Table: {
        height: "50px",
        width: "100%",
        backgroundColor: "#f5f5f5",
    }, rootEditText: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    root: {


    }, heading: {
        display: "flex",
        justifyContent: "center",

        alignItems: 'center',
        gridRow: "1/2",
        gridColumn: "2/3",
        [theme.breakpoints.down("sm")]: {
            gridRow: "1/2",
            gridColumn: "1/2",
          },

    },

    gridMain: {

        display: "grid",
        gridTemplateRows: "15% 85%",
        gridTemplateColumns: "65% 35%",
        height: "75vh",
        // width:"70%",
        gridGap: "5px",
        [theme.breakpoints.down("sm")]: {
            gridTemplateRows: "15% 85% 85%",
        gridTemplateColumns: "100%",
          },
    },
    payMentList: {
        overflowY: "scroll",

        gridRow: "1/3",
        gridColumn: "1/2",
        width: "100%",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            gridRow: "2/3",
            gridColumn: "1/2",
          },
    }, addPayment: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gridRow: "2/3",
        gridColumn: "2/3",
        backgroundColor: "#f5f5f5",
        [theme.breakpoints.down("sm")]: {
            gridRow: "3/4",
            gridColumn: "1/2",
          },
    }

}));




export default function AccountPayment(props) {

    const classes = useStyles();
    const date = new Date()
    const defaultVal = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();


    const appTheme=useTheme();

    const isSmallScreen = useMediaQuery(appTheme.breakpoints.down('sm'));
  
  
    const { enqueueSnackbar } = useSnackbar();


    const handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };


    function getDateAsArray(string) {
        return string.split("-");
    }

    const [data, setData] = useState([{ Date: "", Deptors_Name: "", City: "", Supply_Number: "", Amount: "" }])

    const [dateState, setDate] = useState(getDateAsArray(defaultVal))


    function getDate(dateString) {
        setDate(getDateAsArray(dateString))
    }

    React.useEffect(() => {
        getAllPaymentRecordsByYearStream(dateState[0], setAllPayentDataWithFirestore)

    }, [data, dateState])

    function setAllPayentDataWithFirestore(data) {
        let newdata = data.data()[getDateKey()]
        if (newdata === null || newdata === undefined) {
            handleClickVariant("no data for " + getDateKey() + " /" + dateState[0], "error")
        } else {
            setData(newdata)
        }
    }

    function getDateKey() {// refactor needed
        let month;
        Object.keys(monthIndex).find((keys, index) => {
            if (monthIndex[keys] == (dateState[1] - 1)
            ) month = keys;
            return 0;
        })
        return month;
    }


    return (
        <div className={classes.root}>
            <DatePicker getDateArray={getDate} />
            <div className={classes.gridMain}>
                <div className={classes.heading}><CustomizedInputBase /></div>

                <div className={classes.payMentList}>
                    <Ztable data={data} className={classes.Table}
                        thStyle={{ position: "sticky", top: 0, zIndex: 0 }}
                        mapOrder={paymentsRecordMapOrder}
                        withFooter={false}

                    />
                </div>
                <div className={classes.addPayment}>
                    <div>
                   <BasicTextFields />
                    </div>
                </div>
            </div>
            <div className={classes.floatButton}>
                <CircularButton Child={PrintIcon} tip="print all payments" />

            </div>
        </div>
    )
}





function BasicTextFields() {

    const classes = useStyles();

    var supplyNumberRef = React.useRef();
    var cityRef = React.useRef();
    var NameRef = React.useRef();
    var AmountRef = React.useRef();


    const { enqueueSnackbar } = useSnackbar();


    const handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };



    async function onAddButtonclick() {

        let presentYear = new Date().getFullYear().toString();
        let presentMonth = new Date().getMonth().toString();


        var supplyNumberRefValue = supplyNumberRef.current?.value;
        var cityRefValue = cityRef.current?.value;
        var NameRefValue = NameRef.current?.value;
        var AmountRefValue = AmountRef.current?.value;

        if (supplyNumberRefValue &&
            cityRefValue &&
            NameRefValue &&
            AmountRefValue
        ) {

            let accountPayment = {
                Date: new Date(),
                Supply_Number: supplyNumberRefValue,
                City: cityRefValue,
                Deptors_Name: NameRefValue,
                Amount: AmountRefValue,
            }


            try {

                let month = getKey();
                let dataExist = await isPaymentRecordDataExist(presentYear)
                if (dataExist) {
                    updatePaymentRecords(presentYear, month, accountPayment).then((data) => {
                        handleClickVariant("data added", "success")
                        // addDataToState(stockRecord)

                    }).catch((error) => {
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })

                } else {
                    addAllPaymentRecordsRecords(presentYear, {
                        years: presentYear,
                        [month]: [accountPayment],
                    }).then((data) => {
                        handleClickVariant("data added", "success")
                        // addDataToState(stockRecord)

                    }).catch((error) => {
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })
                }

            } catch (error) {
                var errorMessage = error.message;
                handleClickVariant(errorMessage, "error")
            }

        } else {
            handleClickVariant("please check fields", "error")

        }



        supplyNumberRef.current.value = ""
        cityRef.current.value = ""
        NameRef.current.value = ""
        AmountRef.current.value = ""


        NameRef.current.focus();

        function getKey() {
            let month;
            Object.keys(monthIndex).find((keys, index) => {
                if (monthIndex[keys] == presentMonth
                ) month = keys;
                return 0;
            })
            return month;
        }

    }


    return (
        <form className={classes.rootEditText} noValidate autoComplete="off">
            <TextField
                inputRef={NameRef}
                id="filled-basic" label="Deptors name" variant="filled" />
            <TextField
                inputRef={cityRef}
                id="filled-basic" label="City" variant="filled" />
            <TextField inputRef={supplyNumberRef}
                id="filled-basic" label="Supply Number" variant="filled" />

            <FormControl variant="filled">
                <FilledInput
                    inputRef={AmountRef}
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
            <Button
                onClick={onAddButtonclick}
            >Add</Button>
        </form>
    );
}

