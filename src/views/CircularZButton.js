
import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import "./utility/zripple.css"
import  {startWork} from  "./utility/zripple"


const useStyles = makeStyles((theme) => ({
card: {
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
    }

}));


export default function CircularButton({tip,onClick,Child,style}) {
    const classes = useStyles();
    // React.useEffect(()=>{
    //     startWork();
    // },[])

    return (
    <div style={{...style}} className={`zElement-with-ripple ${classes.card}`} title={tip} onClick={onClick}>
        {<Child className={classes.icon} />}
    </div>)
}