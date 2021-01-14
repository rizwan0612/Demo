import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Grid } from '@material-ui/core';

import { appMenus,myIcons } from './headerConstants'
import { navigate } from "gatsby"
import { globalHistory } from "@reach/router"


const useStyles = makeStyles(theme => ({
  listIcon: {
    minWidth: 'auto',
    paddingRight: '5px',
    color: '#fff'
  },
  onlyDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }
}));

export default function MenuLists() {
  const classes = useStyles();

  let navigateToPage = (item) => {
    navigate(item.pageName)
  };

  return (
      <Grid item xs={10} md={10} 
      container
      direction="row"
      justify="flex-end"
      alignItems="center" className={classes.onlyDesktop}>
        {appMenus.map((item, index) => (
          <Grid item key={index} >
          <ListItem id={item.pageName.replace(/ /g,"-")} button key={index} className={"menuItemsItem" + (globalHistory.location.pathname.replace(/^\/|\/$/g, '') === item.pageName ? ' activeAppHeaderMenu' : '')} onClick={() => navigateToPage(item)}>
            <ListItemIcon className={classes.listIcon}>
              {myIcons(item.icon)}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
          </Grid>
        ))}
      </Grid>
  );
}