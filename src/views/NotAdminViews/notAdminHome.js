
import React from "react"
import "../scss/login.css"


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SalesRecord from "../SalesRecord"
import MoneyIcon from '@material-ui/icons/Money';
import Dashbord from "./DashBord"
import { useMediaQuery } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // [theme.breakpoints.down("sm")]: {

    // },
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  },
  drawer: {
    width: drawerWidth,
    // flexShrink: 0,
    [theme.breakpoints.down("sm")]:{
      width:"55px",
      zIndex:theme.zIndex.appBar-1
    }
  },
  drawerPaper: {

    backgroundColor:theme.palette.primary.dark,
    width: drawerWidth,
    [theme.breakpoints.down("sm")]:{
      // marginTop:the
      width: "auto",
      marginTop: "53px",
      height:"calc(100%-53px)"
    }
  },
  // necessary for content to be below app bar
  toolbar: {...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]:{
     display:"none"
    }
  },
 
  content: {
    marginTop: "60px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },DrawerListText:{
    [theme.breakpoints.down("sm")]: {
    display:"none"
    },
  },DrawerListIcon:{
    // width:"70px",
  },DrawerListList:{
    [theme.breakpoints.down("sm")]: {
marginTop:"10px",
width:"55px",
       },
  }
}));

function PermanentDrawerLeft() {
  const classes = useStyles();
  const [selectedPage, selectAPage] = React.useState('Dashbord')
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
           {
             selectedPage
           }
          </Typography>
        </Toolbar>
      </AppBar>
     
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
       >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {[
            { name: 'Dashbord', icon: DashboardIcon },
            { name: 'Sales approved', icon: MoneyIcon },
            { name: 'logout', icon: ExitToAppIcon },].map((item, index) => {
              if (item.name === 'logout') {
                // signoutOfApp() 
              }
              ///logout

              return (
                <ListItem button key={index} onClick={() => selectAPage(item.name)} className={classes.DrawerListList}>
                  <ListItemIcon children={<item.icon/>} className={classes.DrawerListIcon}  />
                  <ListItemText primary={item.name} className={classes.DrawerListText}/>
                </ListItem>
              )
            })}
        </List>
      </Drawer>
      <main className={classes.content}>
        {
          selectedPage === 'Sales approved' && <SalesRecord displayEdit={false} />
        }
        {
        selectedPage === 'Dashbord' && <Dashbord />
        }
      </main>
    </div>
  );
}



export default function login() {


  return (<div>
    <PermanentDrawerLeft />
  </div>);
}