import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContextConsumer, ContextProvider } from "../AppContextApi"
import "./scss/dialog.css"
import StyleProvider from "@material-ui/styles/StylesProvider"
import { makeStyles } from '@material-ui/core/styles';
import { loginWithEmailAndPassword } from "../controller/firebaseAuthentication"
import { useSnackbar } from 'notistack';
import CircularProgress from '@material-ui/core/CircularProgress';
import Home from './home'
import DefaultModule from "../controller/firebaseInitializer"


var useStyle = makeStyles(theme => ({
  dialogForm2: {

  }, button: {
    backgroundColor: theme.palette,
    height: "100%",
    fontSize: "20px",

  }

}))



export default function Login() {
  const { enqueueSnackbar } = useSnackbar();




  const handleClickVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  var classes = useStyle();

  const emailRef = useRef()
  const passwordRef = useRef()




  // const [open, setOpen] = React.useState(false);
  const [loading, SetIsLoading] = React.useState(false);
  const [usersID, setUserId] = React.useState();

function setUsersId(uid){
  setUserId(uid)
}

  function setIsLoad(loading) {
    SetIsLoading(loading)
  }

  return (
    <ContextProvider>
      <ContextConsumer>
        {(val) => {

          if ((!val.showDialog)) {
            return <Home  usersID={usersID} />
          } else
            if (val.showDialog) {

              return <StyleProvider injectFirst>
                <div className="dialogMain">
                  <div className={"dialogForm  dialogForm1Login"}>
                    {/* loginClick(!login) */}

                    <div className="grid1 flexDis">
                      {loading && <CircularProgress />}
                    </div>
                    <div className="grid2 flexDis">  <Button onClick={
                      async () => {
                        setIsLoad(true)
                        try {
                         await loginWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
                            .then(async (user) => {
                              if (user.user.uid) {
                                setUsersId(user.user.uid);
                                setIsLoad(false)
                                val.login()
                              }

                            }
                            )
                            .catch((error) => {
                              var errorCode = error.code;
                              var errorMessage = error.message;
                              setIsLoad(false)

                              handleClickVariant(errorMessage, "error")
                            });
                        } catch (e) {
                          handleClickVariant(e, "warning")
                        }


                      }
                    } color="primary">
                      Login
                  </Button>
                    </div>
                    <div className="grid3 centerall">
                      <TextField
                        inputRef={passwordRef}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                      />
                    </div>
                    <div className="grid4 centerall">
                      <TextField
                        inputRef={emailRef}
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                      />
                    </div>
                    <div className="grid5 centerall">
                      <DialogContentText>
                        Welcome
               </DialogContentText>
                    </div>
                    <div className="grid6 centerall">
                      <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    </div>
                  </div>
                </div>
              </StyleProvider>

            }
        }}

      </ContextConsumer>
    </ContextProvider>
  );
}





// <div className={`dialogForm2 ${sign ? "dialogForm2Signup" : "none"} ${login ? "dialogForm2Login" : "none"} ${classes.dialogForm2}`}>

// <div className={`grid0 ${classes.grid0}`}>

//   <Button className={`button ${classes.button}`} onClick={() => { }} endIcon={<Gmail style={{ fontSize: "30px", color: "skyblue" }} />} color="primary">
//     sign up with gmail
//       </Button>

// </div>

// <div className="grid1 flexDis">  <Button onClick={() => { }} color="primary">
//   sign up
//     </Button></div>

// {/* signClick(!login); */}
// <div className="grid2 flexDis">  <Button onClick={() => { logInClicked(); signClick(false) }} color="primary">
//   Login
// </Button></div>
// <div className="grid3 centerall">
//   <TextField
//     autoFocus
//     margin="dense"
//     id="setPassword"
//     label="Password"
//     type="password"
//     fullWidth
//   />
// </div>
// <div className="grid4 centerall">
//   <TextField
//     autoFocus
//     margin="dense"
//     id="setEmail"
//     label="Email Address"
//     type="email"
//     fullWidth
//   />
// </div>

// <div className="grid5 centerall">
//   <DialogContentText>
//     Welcome
//   </DialogContentText>
// </div>
// <div className="grid6 centerall">
//   <DialogTitle id="form-dialog-title"> Sign Up</DialogTitle>
// </div>
// </div>