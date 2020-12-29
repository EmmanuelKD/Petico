import React from "react"
import './scss/dashbord.css'
import Dashbord from './dashbord'
import AccountPayment from "./AllAccountPayments"
import YearlyCheck from "./YearlyChecking"
import Settings from './Settings'
import StockRecord from "./StockRecord"
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
// import FormDialog from "./dialog"
// import FavoriteDoctorListCard from "./cardFavoutite"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import DoctorListCard from "./cardDocList"
// import OtherPlaces from "./otherplaces"
import DashboardIcon from '@material-ui/icons/Dashboard';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import MoneyIcon from '@material-ui/icons/Money';
import PaymentIcon from '@material-ui/icons/Payment';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SalesRecords from "./SalesRecord"
import StylesProvider from "@material-ui/styles/StylesProvider"

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { signoutOfApp } from "../controller/firebaseAuthentication"
import { useSnackbar } from 'notistack';
import { getAllUserData } from "../controller/crudModules"
import AnotherUser from "./NotAdminViews/notAdminHome"
// const drawerWidth = 240;
const drawerWidth = 300;


const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
  },
  appBar: {
    width: `100%`,
    marginLeft: drawerWidth,
  },
  drawerPaper: {
    marginTop: "60px",
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    height: "200px",
    padding: 0, margin: 0,
    backgroundColor: "#ffffff",
// color:""
  },
  drawerSubContainer: {
    marginTop: "10px"
  },
  Avatar: {
    width: "100px",
    height: "100px",
    position: "absolute",
    fontSize: "50px",
    margin: "20px",
  },
  menuButton: {
    // marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerOpen: {

    zIndex: 1,
    marginTop: "60px",
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  CompanyName: {
    // color: "#ffffff",
    fontSize: "20px",
    // textAlign:"bottom"
    position: "absolute",
    overflow: 'hidden',
    bottom: 0,
    marginLeft: "20px",

  }, backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
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
    <div className={classes.root}>
      {/* <FormDialog/> */}

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
        // className={classes.drawer}
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

          </div>

        </List>

        <Divider />
        <div className={classes.drawerSubContainer}>

          <List>
            {[{ name: 'Dashbord', icon: DashboardIcon },
            { name: 'Stock Records', icon: DataUsageIcon },
            { name: 'Sales Records', icon: MoneyIcon },
            { name: 'Account Payment', icon: PaymentIcon },
            { name: 'Yearly Checking', icon: HistoryIcon },
            { name: 'Settings', icon: SettingsIcon },
            { name: 'logout', icon: ExitToAppIcon },].map((item, index) => {
              if (item.name === 'logout') { signoutOfApp() }
              ///logout

              return (
                <ListItem button key={index} onClick={() => selectAPage(item.name)}>
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
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

      <main id="content" className={` ${classes.content}`}>
        {selectedPage === 'Dashbord' && <Dashbord drawerOpen={open} />}
        {selectedPage === 'Stock Records' && <StockRecord />}
        {selectedPage === 'Sales Records' && <SalesRecords />}
        {selectedPage === 'Account Payment' && <AccountPayment />}
        {selectedPage === 'Yearly Checking' && <YearlyCheck />}
        {selectedPage === 'Settings' && <Settings />}
        {selectedPage === 'logout' && <>
          <Dashbord drawerOpen={open} />
          <Backdrop className={classes.backdrop} open={true} onClick={() => { }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
        }


      </main>
    </div>
  );
}



export default function Home({ usersID }) {
  const classes = useStyles();

  const [isAdmin, setISAdmin] = React.useState(null)
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  React.useEffect(async() => {
if(isAdmin===null)
  await  getAllUserData(usersID).then((data) => {
      if (data.exists) {
        let userTypeAdmin = data.get("isUSersAdmin")
        setISAdmin(userTypeAdmin);
        handleClickVariant(`login as admin: ${userTypeAdmin}`, "success")
      }
    }).catch((error)=>{
      var errorMessage = error.message;
      handleClickVariant(errorMessage, "error")
    })
  }, [isAdmin])


    return isAdmin === null ? <Backdrop className={classes.backdrop} open={isAdmin === null} >
      <CircularProgress color="inherit" />
    </Backdrop> :
  
      isAdmin===true? <><StylesProvider injectFirst> < PermanentDrawerLeft /></StylesProvider > </>
      :<div style={{ width: "100vw", height: "100vh" }}><AnotherUser/></div>
  

}

