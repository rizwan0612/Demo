import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
    colorPrimary: {
        background: "#342154",
      }
  }),
);

export default function TableLoader() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <div className="ag-theme-balham ag-theme-alpine search-results-table-min-height">
            <div>
                <div style={{border: '1px solid #342154', boxSizing: 'border-box', padding: '2em'}}>
                    <LinearProgress value={59} valueBuffer={90} className={classes.colorPrimary} style={{height: '10px'}} />
                </div>
                <div style={{borderTop: '0px', border: '1px solid #342154', minHeight: '200px', padding: '2em'}}>
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                    <LinearProgress className={classes.colorPrimary} /><br />
                </div>
            </div>
        </div>
    </React.Fragment>
  );
}