import React from "react"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { isdeclineSalesAwaitingAproval, updateSalesTotal, updateSalesRecords, isSalesRecordDataExist, getAllSalesAwaitingAprovalStream, deleteSalesAwaitingAproval, addSalesRecords } from "../../controller/crudModules"
import Card from "@material-ui/core/Card"
import firebase from "firebase"
import Button from "@material-ui/core/Button"
import { useSnackbar } from 'notistack';
import CircularProgressBar from "@material-ui/core/CircularProgress"

import { useMediaQuery } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"


const useStyles = makeStyles((theme) => ({

    flexMain: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "nowrap",
            flexDirection: "column",
            // marginLeft: "22%",
            // width:"calc(100% - 10%)"
        }
    }
    , FavoriteMain: {
        teansition: "500ms ease-in-out",
        height: "82vh",
        width: "40%",
        overflow: "hidden",
        [theme.breakpoints.down("sm")]: {
            height: "40vh",
            width:"100%"
        }

    }, Favheading: {
        backgroundColor: "#f5f5f5",
        height: "3vh",
        width: "93.6%",

    }, FavBody: {
        marginRight: theme.spacing(3),
        height: "80vh",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        overflowY: "scroll"
    }
    , GridMain: {

        height: "80vh",
        display: "grid",
        width: "60%",
        gridTemplateColumns: "100%",
        gridTemplateRows: `5% 36% 8% 50%`,
        gridGap: "5px",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "nowrap",
            flexDirection: "column",
        }
    }
    , grid1: {
        fontStyle: "bold",
        gridRow: "1/2",
        gridColumn: "1/3",
        margin: "0 auto",

    }
    , grid3: {

        // backgroundColor: "#f5f5f5",
        gridRow: "3/4",
        gridColumn: "1/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    }, grid4: {

        // backgroundColor: "#f5f5f5",
        gridRow: "4/5",
        gridColumn: "1/3",
        padding: theme.spacing(3),
        overflow: "hidden",
        overflowY: "scroll"
    }
    , grid2: {
        // backgroundColor: "#f5f5f5",
        display: "flex",
        width: "100%",
        gridRow: "2/3",
        gridColumn: "1/3",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: "0 auto",

    }, cardMain: {
        marginRight: "5px",
        marginLeft: "5px",
        marginTop: "10px",
        cursor: "pointer"
    }
    , cardflex: {
        display: "flex",
        justifyContent: "space-between",
        padding: "5px"

    }, btnFlx: {
        display: "flex",
        justifyContent: "space-between",
        alignSelf: "bottom"
    }, approvedBtn: {
        backgroundColor: "#00ff00",
        marginRight: "20px",
        marginLeft: "20px",
        marginTop: "15px"

    },
    declineBtn: {
        marginTop: "15px",

        backgroundColor: "#ff0000",
        marginRight: "20px",
        marginLeft: "20px",
    }

}));


export default function Dashbord(props) {
    const classes = useStyles();


    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));




    const [totalGoodsSend, setTotalGoodsSend] = React.useState({})

    const [selectedAwaitedData, setSelectedAwaited] = React.useState(null)


    const [selectemMonthAndYear, setSelectedMonthAndYear] = React.useState({ selectedYear: null, selectedMonth: null })

    function setSelectedAwaitedData(data, month, year) {
        setSelectedAwaited(data)
        setSelectedMonthAndYear({ selectedYear: year, selectedMonth: month })
    }
    let presentYear = new Date().getFullYear().toString();




    const { enqueueSnackbar } = useSnackbar();


    const handleClickVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    React.useEffect(() => {
        getAllSalesAwaitingAprovalStream(setTotalGoods)
    }, [])

    function setTotalGoods(data) {
        setTotalGoodsSend(data.data())
    }

    return (
        <div className={classes.flexMain}>
            <div className={`flex ${classes.FavoriteMain}`} style={{ display: props.drawerOpen ? "none" : "block" }}>
                <div className={classes.Favheading}>
                    <Typography>Orders To Aprove</Typography>
                </div>
                <div className={classes.FavBody}>
                    {
                        Object.keys(totalGoodsSend).map((keys, i) => {
                            return keys === "isDecline" ? <div>{totalGoodsSend[keys]}</div> :
                                <DisplayAwaiting month={keys} year={totalGoodsSend["isDecline"]} data={totalGoodsSend[keys]} onclick={setSelectedAwaitedData} />
                        })
                    }
                </div>
            </div>

            <div className={`flex ${classes.GridMain}`} style={{ width: props.drawerOpen ? "100%" : "70%" }}>
                <div className={`grid ${classes.grid1}`}>
                    <Typography>Details</Typography>
                </div>

                <div className={`grid ${classes.grid2}`}>

                    {
                        selectedAwaitedData !== null && <ApproveDeclinePan selectedAwaitedData={selectedAwaitedData} />
                    }
                </div>
                <div className={`grid ${classes.grid3}`}>
                    <Typography style={{ fontSize: 20, textTransform: 'capitalize' }} >Orders Decline </Typography>
                </div>
                <div className={`grid ${classes.grid4}`}>
                </div>
            </div>

        </div>
    )


    async function onAccept(presentMonth, presentYear, salesRecord) {

        try {


            let dataExist = await isSalesRecordDataExist(presentYear)
            if (dataExist) {
                updateSalesRecords(presentYear, presentMonth, salesRecord).then(async (data) => {

                    await deleteSalesAwaitingAproval(presentYear, presentMonth).then(async () => {
                        await updateSalesTotal(salesRecord.Amount).then(async () => {

                            handleClickVariant("data accepted", "success")
                            // addDataToState(salesRecord)
                        }).catch((error) => {
                            var errorMessage = error.message;
                            handleClickVariant(errorMessage, "error")
                        })

                    }).catch((error) => {
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })

                }).catch((error) => {
                    var errorMessage = error.message;
                    handleClickVariant(errorMessage, "error")
                })

            } else {
                addSalesRecords(presentYear, {
                    years: presentYear,
                    [presentMonth]: [salesRecord],
                }).then(async (data) => {
                    await deleteSalesAwaitingAproval(presentYear, presentMonth).then(async () => {
                        await updateSalesTotal(salesRecord.Amount).then(async () => {

                            handleClickVariant("data accepted", "success")
                            // addDataToState(salesRecord)
                        }).catch((error) => {
                            var errorMessage = error.message;
                            handleClickVariant(errorMessage, "error")
                        })
                    }).catch((error) => {
                        var errorMessage = error.message;
                        handleClickVariant(errorMessage, "error")
                    })



                }).catch((error) => {
                    var errorMessage = error.message;
                    handleClickVariant(errorMessage, "error")
                })
            }

        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            handleClickVariant(errorMessage, "error")
        }


    }

    function ApproveDeclinePan({ selectedAwaitedData }) {
        const classes = useStyles();
        let date = manipulateData(selectedAwaitedData.Date)
        const [loading, setLoading] = React.useState(false)


        const { enqueueSnackbar } = useSnackbar();


        const handleClickVariant = (message, variant) => {
            // variant could be success, error, warning, info, or default
            enqueueSnackbar(message, { variant });
        };

        return (
            <div>
                <div>{date}</div>
                <div >amount  <span style={{ color: "green" }}>le:{selectedAwaitedData?.Amount}</span></div>
                <div>send to {selectedAwaitedData?.Receiver}</div>

                <div className={classes.btnFlx}>
                    <Button className={classes.declineBtn}
                        onClick={() => {
                            isdeclineSalesAwaitingAproval(true).then(
                                () => {
                                    handleClickVariant("you have decline", "warning")
                                }
                            )
                        }}
                    >Decline</Button>

                    <Button className={classes.approvedBtn} onClick={async () => {
                        setLoading(true)
                        if (selectemMonthAndYear.selectedMonth !== null || selectemMonthAndYear.selectedYear !== null)
                            await onAccept(selectemMonthAndYear.selectedMonth, selectemMonthAndYear.selectedYear, selectedAwaitedData).then(() =>
                                setLoading(false))
                    }
                    }>Approved</Button>
                    {loading && <CircularProgressBar size={25} />}
                </div>
            </div>

        )
    }

    function DisplayAwaiting({ data, onclick, month, year }) {
        const classes = useStyles();

        return data.map((val, index) =>
            <Card className={classes.cardMain} onClick={() => onclick(val, month, year)}>
                <div className={classes.cardflex}>
                    <div>{manipulateData(val.Date)}</div>
                    <div style={{ color: "green" }}>Le:{val.Amount}</div>

                </div>
            </Card>
        );



    }
    function manipulateData(data = "") {

        if (data.seconds) {
            data = new firebase.firestore.Timestamp(data.seconds, data.nanoseconds).toDate();
        }
        if (data instanceof Date) {
            var dd = data.getDate()
            var mm = data.getMonth()
            var yyyy = data.getFullYear();

            var min = data.getMinutes();
            var hou = data.getHours();

            return mm + '/' + dd + '/' + yyyy + " @ " + hou + ":" + min;

        } else {
            return data;
        }
    }

}

