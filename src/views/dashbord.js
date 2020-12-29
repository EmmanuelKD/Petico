import React from "react"
import BarChart from "./barChart/barchart"
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "./circularProgresschart/circularProgress"
import { getTotalProductAndSalesStream,getAllSalesAwaitingAprovalStream } from "../controller/crudModules"
import Card from "@material-ui/core/Card"
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({

  flexMain: {
    display: "flex",
    flexDirection: "row",

  }
  , FavoriteMain: {
    teansition: "500ms ease-in-out",
    height: "82vh",
    width: "30%",
    overflow: "hidden",

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
    width: "70%",
    gridTemplateColumns: "100%",
    gridTemplateRows: `5% 26% 8% 60%`,
    gridGap: "5px",
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

    backgroundColor: "#f5f5f5",
    gridRow: "4/5",
    gridColumn: "1/3",
    padding: theme.spacing(3),


    overflow: "hidden",
    overflowY: "scroll"
  }
  , grid2: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    width: "100%",
    gridRow: "2/3",
    gridColumn: "1/3",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: "0 auto",

  }, cardflex: {
    display: "flex",
    justifyContent: "space-between",
padding:"5px"

},cardMain:{
  marginRight: "5px",
  marginLeft: "5px",
  marginTop: "10px"
  }

}));




export default function Dashbord(props) {
  const classes = useStyles();
  const [totalsState, setTotalsState] = React.useState({ productsTotal: 50, totalSales: 30 })

  let presentYear = new Date().getFullYear().toString();
  const [totalGoodsSend, setTotalGoodsSend] = React.useState({})

  React.useEffect(() => {
    getTotalProductAndSalesStream(setTotalsStateValue)
    getAllSalesAwaitingAprovalStream(presentYear, setTotalGoods)

  }, [totalsState,totalGoodsSend])

  function setTotalsStateValue(data) {
    setTotalsState({ totalSales:data["SalesTotal"], productsTotal: data["ProductTotal"] })
  }



function setTotalGoods(data) {
    setTotalGoodsSend(data.data())
}
  function DisplayAwaiting({ data, onclick ,month,year}) {
    const classes = useStyles();
  
    return data.map((val, index) =>
        <Card className={classes.cardMain} >
            <div className={classes.cardflex}>
                <div>{manipulateData(val.Date)}</div>
                <div style={{color:"green"}}>Le:{val.Amount}</div>
  
            </div>
        </Card>
    );
    
 }


 function manipulateData(data="") {

  if (data.seconds) {
      data = new firebase.firestore.Timestamp(data.seconds, data.nanoseconds).toDate();
  }
  if (data instanceof Date) {
      var dd = data.getDate()
      var mm = data.getMonth()
      var yyyy = data.getFullYear();

      var min = data.getMinutes();
      var hou = data.getHours();

      return mm + '/' + dd + '/' + yyyy +" @ "+hou+":"+min;

  } else {
      return data;
  }
}
  return (
    <div className={classes.flexMain}>
      <div className={`flex ${classes.FavoriteMain}`} style={{ display: props.drawerOpen ? "none" : "block" }}>
        <div className={classes.Favheading}>
          <Typography>latest order</Typography>
        </div>
        <div className={classes.FavBody}>
        {
                        Object.keys(totalGoodsSend).map((keys, i) => {
                            return keys === "years" ? <div>{totalGoodsSend[keys]}</div> :
                                <DisplayAwaiting month={keys} year={totalGoodsSend["years"]}data={totalGoodsSend[keys]} />
                        })
                    }
        </div>
      </div>

      <div className={`flex ${classes.GridMain}`} style={{ width: props.drawerOpen ? "100%" : "70%" }}>
        <div className={`grid ${classes.grid1}`}>
          <Typography>Totals</Typography>
        </div>

        <div className={`grid ${classes.grid2}`}>
          <div>
            <CircularProgress progress={100} />
            <div>products = {totalsState.productsTotal} </div>
          </div>

          <div><CircularProgress progress={100 - ((totalsState.totalSales / totalsState.productsTotal) * 100)} />
            <div>in store={totalsState.productsTotal - totalsState.totalSales}</div>

          </div>
          <div><CircularProgress progress={(totalsState.totalSales / totalsState.productsTotal) * 100} />
            <div>sales={totalsState.totalSales}</div>

          </div>
        </div>
        <div className={`grid ${classes.grid3}`}>
          <Typography style={{ fontSize: 20, textTransform: 'capitalize' }} >Welcome to petico car decoration enterprice</Typography>
        </div>
        <div className={`grid ${classes.grid4}`}>
          <BarChart />
        </div>
      </div>

    </div>
  )
}

