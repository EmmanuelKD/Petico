import React, { useRef } from "react"
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

import { signupWithEmailAndPassword } from "../controller/firebaseAuthentication"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSnackbar } from 'notistack';
import {addUsersType} from '../controller/crudModules'

const useStyles = makeStyles((theme) => ({

    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    }, addButton: {
        backgroundColor: theme.palette.primary.light,
        height: "60px",
        float: "right"
    }, main: {
        width: "70%",
        height: "80vh",
        backgroundColor: "#f5f5f5",

    }, rootEditText: {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",

        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }, devider: {
        marginLeft: "10%", marginRight: "10%", marginTop: "5%"
    }, placeholder: {
        height: 40,
    },

}))


export default function Setting() {

    const classes = useStyles();
    return (<div className={classes.root}>
        <div className={classes.main}>
            {/* <AddNewSuppliee /> */}
            <AddMoreUser />
        </div>
    </div>)
}


function AddMoreUser() {



    const { enqueueSnackbar } = useSnackbar();

  
    const handleClickVariant = (message, variant) => {
      // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const [loading, setLoading] = React.useState(false);

    const [isAdmin, setIsAdmin] = React.useState(false);

    function toggleIsAdmin(){
        setIsAdmin(!isAdmin)
    }

    const handleLoading = (isLoading) => {

        setLoading(isLoading);
    };


    const classes = useStyles();
    const emailFieldReference = useRef()
    const passwordFieldReference = useRef()
    const checkRef=useRef()
    // const [usersCred,setCred]=React.useState({email:"",password:""});
    var email;
    var password;



    return (<div className={classes.addSupply}>
        <Divider className={classes.devider} />
        <div>add a supplier</div>
        <div>
            <form className={classes.rootEditText} noValidate autoComplete="off">
                <TextField id="filled-basic"
                    required={true}

                    inputRef={emailFieldReference}
                    // onChange={(e) => emali=e.target.value}
                    label="email " variant="filled" />

                <TextField id="filled-basic"
                    required={true}

                    inputRef={passwordFieldReference}
                    // onChange={(e) => password=e.target.value}

                    label="password " variant="filled" />
                <FormControlLabel
                inputRef={checkRef}
                    value={isAdmin}
                    control={<Checkbox color="primary" onChange={toggleIsAdmin} />}
                    label = {isAdmin ? "remove as admin":"add as admin"}
                    labelPlacement="start"
                />


                <Button className={classes.addButton} onClick={
                    () => {
                        handleLoading(true);

                        email = emailFieldReference.current.value.toString();
                        password = passwordFieldReference.current.value.toString();
                        signupWithEmailAndPasswordDelegate(
                            email, password,checkRef.current.value,
                            handleClickVariant,
                            handleLoading
                        );
                    }
                }  >Add</Button>

            </form>
        </div>
        <CircularProgressModule loading={loading} />
    </div>

    )
}



async function signupWithEmailAndPasswordDelegate(email, password,isAdmin, handleClickVariant, handleLoading) {

if(isAdmin==="true"){
    isAdmin=true
}else if(isAdmin==="false")
{
    isAdmin=false
}else{
    isAdmin=isAdmin
}

    try {
        await signupWithEmailAndPassword(email, password).then((user) => {
            // Signed in 
            // ...
            // loginWithEmailAndPassword(email, password);
            addUsersType(user.user.uid,{isUSersAdmin:isAdmin})
            handleClickVariant("user added", "success")
            // handleLoading(false)

        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                handleClickVariant(`${errorMessage} code:${errorCode}`, "error")
            });
    } catch (e) {
        handleClickVariant(`${e}`, "warning")
    }
    handleLoading(false)

}

function CircularProgressModule({ loading }) {
    const classes = useStyles();

    return (<div className={classes.placeholder}>
        <Fade
            in={loading}
            style={{
                transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
        >
            <CircularProgress />
        </Fade>
    </div>)
}