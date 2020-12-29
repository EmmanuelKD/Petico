import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlusOne from '@material-ui/icons/Add';

import PrintBy from "./printMethod"
import {DataContextConsumer} from '../controller/DataContext'
import CircularButton from "./CircularZButton"
import {printData,exportTableToExcel} from "../utils"
const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: "150px",
        right: "40px",
        width: "50px",
        height: "70px",
        // backgroundColor: "#000000"
    }, card: {
        marginTop: "7px",
        cursor: "pointer",
        // background: "transparent",
        boxShadow: "6px 6px 14px 0 rgba(0, 0, 0, 0.2),-8px -8px 18px 0 rgba(255, 255, 255, 0.55)",
        borderRadius: "40px",
        padding: "10px ",
        width: "35px",
        height: "35px",

        // minHeight: "35px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
        // backgroundColor:"#ffac28"
    }, icon: {
        color: "#000000",

    }


}));
export default function FlaotingActionColumnButtons(props) {
    const classes = useStyles();
let displayEdit=props.displayEdit??true
    return (
    
        <DataContextConsumer>
        {
            (value)=> 
      <div className={classes.root}>
         <CircularButton  style={{display:displayEdit?"flex":"none"}} tip={"add more data"} onClick={props.onClickAdd}  Child={PlusOne} />
      
        <PrintBy ><CircularButton tip={"print your data"} Child={PrintIcon}  /></PrintBy> 

        <CircularButton tip={value.state.expandAll?"collaps all data":"expand all data"
    } Child={value.state.expandAll?ExpandMoreIcon:ExpandLessIcon}
     onClick={value.toggleExpandAll} />
        </div>}
        </DataContextConsumer>)
}

