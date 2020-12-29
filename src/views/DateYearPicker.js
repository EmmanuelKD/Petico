import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({getDateArray}) {
    let dateRef=React.useRef()
  const classes = useStyles();
  const date=new Date()
  const defaultVal=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

  return (
    <form className={classes.container} noValidate>
      <TextField
        inputRef={dateRef}
        id="date"
        label="get data for"
        type="date"
        defaultValue={defaultVal}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e)=>{getDateArray(e.target.value)}}
      />
    </form>
  );
}


