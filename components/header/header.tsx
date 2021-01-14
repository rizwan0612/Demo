import React from "react"
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuDrawer from './menuDrawer'
import MenuLists from './menuList'
import './header.scss'
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

const useStyles = makeStyles(theme => ({
  onlyDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline'
    }
  }
}));
const HeaderBar = ({ isShow }) => {
  const classes = useStyles();
  return (

    <StickyHeader
    // This is the sticky part of the header.
    header={
      <header>
      <React.Fragment>
        <CssBaseline />
        <Container className="appHeader" style={{ padding: 0 }} maxWidth={false}>

          <Grid
            container
            direction="row"
            justify="space-between"
            spacing={0}
            alignItems="center"
          >
            <Grid container item xs={8} sm={2} lg={2} md={2} ></Grid>
            {isShow ? <MenuDrawer /> : null}
            {isShow ? <MenuLists className={classes.onlyDesktop} /> : null}

          </Grid>
        </Container>
      </React.Fragment>
    </header>
    }
  >
   
  </StickyHeader>

  )
};

export default HeaderBar
