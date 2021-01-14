import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { appMenus, myIcons } from './headerConstants'
import { navigate } from "gatsby"
import { globalHistory } from "@reach/router"

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  hamberMenu: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let navigateToPage = (item) => {
    navigate(item.pageName)
  };

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {appMenus.map((item, index) => (
          <ListItem id={item.pageName.replace(/ /g,"-")} className={(globalHistory.location.pathname.replace(/^\/|\/$/g, '') === item.pageName ? ' activeAppHeaderMenu' : '')} button key={index} onClick={() => navigateToPage(item)}>
            <ListItemIcon>{myIcons(item.icon)}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Grid item xs={2} className={classes.hamberMenu}>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer('right', true)}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
          {sideList('right')}
        </Drawer>
      </Grid>

    </>
  );
}