
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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    marginTop: "60px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function PermanentDrawerLeft() {
  const classes = useStyles();
  const [selectedPage, selectAPage] = React.useState('Dashbord')

  return (
    <div className={classes.root}>
      <CssBaseline />
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
                <ListItem button key={index} onClick={() => selectAPage(item.name)}>
                  <ListItemIcon>{<item.icon />}</ListItemIcon>
                  <ListItemText primary={item.name} />
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