import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FloatingActions from './floatingActions'
import YearSelector from './selectDataByYear'
import MinimizerWithZTable from "./miniMizerWithTable"

import { DataContextProvider } from '../controller/DataContext'


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }, total: {
        textAlign: "center",
        margin: "10px",
        fontSize: "30px",

    }, main: {
        // backgroundColor: "#f5f5f5",

    }, dialog: {

    }, dialogContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // '& > *': {
        // margin: theme.spacing(1),
        width: `${100 - theme.spacing(1)}%`,
        height: "100%"
        // },
    }, addButton: {
        backgroundColor: theme.palette.primary.light,
        height: "60px",
        float: "right"
    }
}));

export default function DiaplayDataAndTotals({ data, total, DialogChild, dialogTitle, mapOrder,displayEdit ,awaitingData }) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const [load, setLoad] = React.useState(false);
    function toggle() {
        setLoad(!load);
    }
    React.useEffect((oldProps, newProps) => { if (data !== null || data !== undefined) toggle() }, []);
    //in a map

    return (
        <div className={classes.main}>
            <DataContextProvider>
                {load ?
                    <div style={{ height: 400, width: '90%' }}>
                        <YearSelector years={["2020", "2021", "2022"]} />

                        {
                            
                            data !== undefined &&Object.keys(data).map((Data, index) => Data.toString() !== "years" && <MinimizerWithZTable key={index} month={Data.toString()} Data={data[Data]} mapOrder={mapOrder} />)
                        }
                        {
                            awaitingData !==undefined && Object.keys(awaitingData)?.map((Data, index) => Data.toString() !== "years" && <MinimizerWithZTable key={index} month={Data.toString()} Data={awaitingData[Data]} mapOrder={mapOrder} isAwaiting={true}/>)
                        }
                        <div className={classes.total}>total:le {total??0}</div>
                        <FloatingActions onClickAdd={handleClickOpen} displayEdit={displayEdit} />

                        <Dialog
                            fullScreen
                            // className={classes.dialog}
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
                            <DialogContent className={classes.dialogContent}>
                                <DialogChild />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary" >
                                    cancle
                                </Button>
                            </DialogActions>
                        </Dialog>


                    </div> :
                    <Backdrop className={classes.backdrop} open={!load} onClick={() => { }}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                }

            </DataContextProvider>
        </div>
    );
}


