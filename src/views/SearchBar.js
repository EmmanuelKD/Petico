import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
    margin:8,
  },

}));

export default function CustomizedInputBase(props) {
  const classes=useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper component="form" className={classes.root}>
      <div>
      <IconButton className={classes.iconButton} aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Name</MenuItem>
        <MenuItem onClick={handleClose}>Supplier Number</MenuItem>
        <MenuItem onClick={handleClose}>City</MenuItem>
      </Menu>
      </div>
   

      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search petico' }}
      />
      <IconButton  className={classes.iconButton} aria-label="search" onClick={()=>{}}>
        <SearchIcon />
      </IconButton>
    
    </Paper>
  );
}
