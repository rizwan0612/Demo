import React from 'react'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  

export default function CustomizedButtons(props) {
    const classes = useStyles();
  
    return (

        <Fab variant="extended" size="small" color="primary" aria-label="add" className={classes.fab} onClick={props.buttonClick}>
               {props.btnName}
            </Fab>
    );
}