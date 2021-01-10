import React from "react"
import './scss/dashbord.css'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from "@material-ui/core/Avatar"
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import StylesProvider from "@material-ui/styles/StylesProvider"

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { signoutOfApp } from "../controller/firebaseAuthentication"
import { useSnackbar } from 'notistack';
import { getAllUserData } from "../controller/crudModules"
import AnotherUser from "./NotAdminViews/notAdminHome"
// const drawerWidth = 240;
import routes from "../routs"
import { Link, Switch, Route, Redirect, BrowserRouter } from "react-router-dom"



const drawerWidth = 300;


const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/dashboard" />
  </Switch>
);

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      display: 'block',

    }
  },
  appBar: {
    width: `100%`,
    marginLeft: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,

    }
  },
  // necessary for content to be below app bar
  toolbar: {

    height: "200px",
    padding: 0, margin: 0,
    backgroundColor: "transparent",

    [theme.breakpoints.down("sm")]: {
      height: "100px",

    }
  }
  ,
  drawerSubContainer: {
    marginTop: "10px"
  },
  Avatar: {
    width: "100px",
    height: "100px",
    position: "absolute",
    fontSize: "50px",
    margin: "20px",
    [theme.breakpoints.down("sm")]: {
      // width:"auto",
      width: "70px",
      height: "70px",

    }
  },
  menuButton: {
    // marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerOpen: {
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    marginTop: "60px",
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      width: "200px",
    }
  },
  drawerClose: {
    zIndex: 1,
    marginTop: "60px",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: 0,
  }
  , content: {
    marginTop: "60px",
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: "5px",
    
    },
  },
   CompanyName2: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      position: "absolute",
      overflow: 'hidden',
      bottom: 0,
      right:5,
      marginLeft: "20px",
      display: "block"
    }
  },
  CompanyName: {
    fontSize: "20px",
    position: "absolute",
    overflow: 'hidden',
    bottom: 0,
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }, backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }, listLink: {
    textDecoration: "none",
    color: theme.palette.secondary.contrastText
  }, drawerText: {

    [theme.breakpoints.down("sm")]: {
      marginLeft: "-10px",

    }
  } 
}));

function PermanentDrawerLeft() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [selectedPage, setSelectedOpen] = React.useState('Dashbord');


  const selectAPage = (page) => {
    setSelectedOpen(page)
  }

  const handleDrawerOpen = () => {

    setOpen(!open);
    var content = document.getElementById("content");

    if (open) content.addEventListener("click", () => {
      setOpen(false);
    })

  };


  return (
    <BrowserRouter>
      <div className={classes.root}>

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>

            <Typography variant="h6" noWrap>
              {selectedPage}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={open ? classes.drawerOpen : classes.drawerClose}
          classes={{
            paper: open ? classes.drawerOpen : classes.drawerClose
          }}
          anchor="left"
        >
          <List>
            <div className={`toolbar ${classes.toolbar}`} >
              <Avatar className={classes.Avatar} style={{
                display: !open && "none",
              }}>P</Avatar>
              <div className={classes.CompanyName} style={{
                display: !open && "none",

              }} >PETICO ENTERPRICE</div>
              <div className={classes.CompanyName2} style={{
                display: !open && "none",
              }} >PETICO ENT</div>
            </div>

          </List>

          <Divider />
          <div className={classes.drawerSubContainer}>

            <List>
              {routes.map((item, index) => {
                if (item.name === 'logout') { signoutOfApp() }
                ///logout

                return (
                  <Link to={item.path} className={classes.listLink} key={index}>
                    <ListItem button onClick={() => selectAPage(item.name)}>
                      <ListItemIcon>{<item.icon />}</ListItemIcon>
                      <ListItemText primary={item.name} className={classes.drawerText} />
                    </ListItem>
                  </Link>
                )
              })
              }
            </List>
            <Divider />
            <List>
              <div>powered by zaire</div>
            </List>
          </div>
        </Drawer>

        <main id="content" className={`${classes.content}`}>

          {switchRoutes}

        </main>
      </div>
    </BrowserRouter>
  );
}



export default function Home({ usersID }) {
  const classes = useStyles();

  const [isAdmin, setISAdmin] = React.useState(null)
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  React.useEffect(() => {
    if (isAdmin === null)
      (async () => {
        await getAllUserData(usersID).then((data) => {
          if (data.exists) {
            let userTypeAdmin = data.get("isUSersAdmin")
            setISAdmin(userTypeAdmin);
            handleClickVariant(`login as admin: ${userTypeAdmin}`, "success")
          }
        }).catch((error) => {
          var errorMessage = error.message;
          handleClickVariant(errorMessage, "error")
        })
      })()
  }, [isAdmin])


  return isAdmin === null ? <Backdrop className={classes.backdrop} open={isAdmin === null} >
    <CircularProgress color="inherit" />
  </Backdrop> :

    isAdmin === true ? <><StylesProvider injectFirst> < PermanentDrawerLeft /></StylesProvider > </>
      : <div style={{ width: "100vw", height: "100vh" }}>

        <AnotherUser />

      </div>

}

