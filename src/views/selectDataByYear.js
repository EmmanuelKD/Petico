import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

export default function FadeMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

var year=new Date().getFullYear()
const[presentYear,setPresentYear]=React.useState(year)

function setNewPresentYear(newPresentYear){
  setPresentYear(newPresentYear);
  setAnchorEl(null);
}



  return (
    <div style={{width:"50px"}}>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
       {presentYear}
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
{       props.years.map((data,i)=> <MenuItem onClick={()=>setNewPresentYear(data)} key={i}>{data}</MenuItem>)
}        
      </Menu>
    </div>
  );
}
