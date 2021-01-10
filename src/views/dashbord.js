import React from "react"
import BarChart from "./barChart/barchart"
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CircularProgress from "./circularProgresschart/circularProgress"
import { getTotalProductAndSalesStream, getAllSalesAwaitingAprovalStream } from "../controller/crudModules"
import Card from "@material-ui/core/Card"
import firebase from "firebase"
import { useMediaQuery } from "@material-ui/core"



const useStyles = makeStyles((theme) => ({

  flexMain: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
      flexDirection: "column-reverse",
      flexWrap: "nowrap",
      width: "100%",
    },
  }
  , FavoriteMain: {
    height: "82vh",
    width: "30%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",

    },
  },
  Favheading: {
    backgroundColor: "#f5f5f5",
    height: "3vh",
    width: "93.6%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",

    },
  },
  FavBody: {
    marginRight: theme.spacing(3),
    height: "80vh",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
    overflowY: "scroll",
    [theme.breakpoints.down("sm")]: {
      width: "100%",

    },
  }
  , GridMain: {

    height: "80vh",
    display: "grid",
    width: "70%",
    gridTemplateRows: `5% 26% 8% 60%`,
    gridGap: "5px",
    gridTemplateColumns: "100%",

    [theme.breakpoints.up("sm")]: {
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      gridTemplateRows: `5% 30% 1% 60%`,
      gridGap: 0,
      height: "80vh",


    },
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
    display: "flex",
    alignItems: "center",

    gridRow: "4/5",
    gridColumn: "1/3",

    overflow: "hidden",
    overflowY: "scroll",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: 0,

    },
  }
  , grid2: {
    // backgroundColor: "#f5f5f5",
    paddingLeft: theme.spacing(.5),
    paddingRight: theme.spacing(.5),
    paddingTop: theme.spacing(.5),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      // gridTemplateRows: `5% 34% 1% 60%`,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
    },
  }, progress: {
    width: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "10px",

    },
  },
  progressCard: {
    display: "flex",
    width: "100%",
    gridRow: "2/3",
    gridColumn: "1/3",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontWeight: 400,
    fontSize: "1.0em",
    margin: "0 auto",
    padding: "5px",

  },

  cardflex: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px"

  }, cardMain: {
    marginRight: "5px",
    marginLeft: "5px",
    marginTop: "10px"
  }, barChartCard: {
    width: "100%",
  },totalText:{
    fontSize: ".9em",
    fontWeight: "300",
  }

}));




export default function Dashbord(props) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const classes = useStyles();
  const [totalsState, setTotalsState] = React.useState({ productsTotal: 50, totalSales: 30 })

  let presentYear = new Date().getFullYear().toString();
  const [totalGoodsSend, setTotalGoodsSend] = React.useState({})

  React.useEffect(() => {
    getTotalProductAndSalesStream(setTotalsStateValue)
    getAllSalesAwaitingAprovalStream(setTotalGoods)

  }, [])


  function setTotalsStateValue(data) {
    setTotalsState({ totalSales: data["SalesTotal"], productsTotal: data["ProductTotal"] })
  }



  function setTotalGoods(data) {
    //  console.log(data.data())
    setTotalGoodsSend(data.data())
  }
  function DisplayAwaiting({ data, onclick, month, year }) {
    React.useEffect(() => { }, [])

    const classes = useStyles();

    console.log(data)

    return data?.map((val, index) =>
      <Card className={classes.cardMain} key={index} >
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

  return (
    <div className={classes.flexMain}>
      <div className={`flex ${classes.FavoriteMain}`}
        style={{ display: props.drawerOpen ? "none" : "block" }}>

        <div className={classes.Favheading}>
          <Typography>Latest Order</Typography>
        </div>
        <div className={classes.FavBody}>
          {
            Object.keys(totalGoodsSend).map((keys, i) => {
              return keys === "isDecline" ? <div key={keys}>{totalGoodsSend[keys]}</div> :
                <DisplayAwaiting key={keys} month={keys} year={totalGoodsSend["years"]} data={totalGoodsSend[keys]} />
            })
          }
        </div>
      </div>

      <div className={` ${classes.GridMain}`}
      //  style={{ width: props.drawerOpen ? "100%" : "70%" }}
      >
        <div className={classes.grid1}>
          <Typography >Totals</Typography>
        </div>

        <div className={classes.grid2}>
          <Card className={classes.progressCard} >
            <div >
              <CircularProgress fontSize={isSmallScreen ? 15 : 20} size={isSmallScreen ? 70 : 100} className={classes.progress} progress={100} />
              <div className={classes.totalText}>products = {isSmallScreen&&<br/>}{totalsState.productsTotal} </div>
            </div>

            <div>
              <CircularProgress fontSize={isSmallScreen ? 15 : 20} size={isSmallScreen ? 70 : 100} className={classes.progress} progress={100 - ((totalsState.totalSales / totalsState.productsTotal) * 100)} />
              <div className={classes.totalText}>in store={isSmallScreen&&<br/>}{totalsState.productsTotal - totalsState.totalSales}</div>

            </div>
            <div >
              <CircularProgress fontSize={isSmallScreen ? 15 : 20} size={isSmallScreen ? 70 : 100} className={classes.progress} progress={(totalsState.totalSales / totalsState.productsTotal) * 100} />
              <div className={classes.totalText}>sales={isSmallScreen&&<br/>}{
              
              totalsState.totalSales
              }</div>

            </div>
          </Card>
        </div>
        <div className={classes.grid3}>
          <Typography style={{ fontSize: 20, textTransform: 'capitalize' }} >
            {/* Welcome to petico car decoration enterprice */}
          </Typography>
        </div>
        <div className={classes.grid4}>
          <Card className={classes.barChartCard}>
            <BarChart x={isSmallScreen ? 180 : 300} x2={isSmallScreen ? 250 : 450} />
          </Card>
        </div>
      </div>

    </div>
  )
}

