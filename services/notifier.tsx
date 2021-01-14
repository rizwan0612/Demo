import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux'
import {notification} from './globalActions'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: 'green',
    fontWeight: 'bold'
  },
  error: {
    backgroundColor: 'red',
    fontWeight: 'bold'
  },
  primary: {
    backgroundColor: 'gray'
  }
}));

export default connect((state: any) => state.globalR, (dispatch: any) => {
  return {
    notification: (showMsg: boolean, msg: string, variant: string) => dispatch(notification(showMsg, msg, variant))
  }
})(function ConsecutiveSnackbars(props: any) {
  /*const queueRef = React.useRef([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
*/

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    //setOpen(false);
    props.notification(false, '', 'primary')
  };

  const handleExited = () => {
    props.notification(false, '', 'primary')
  };

  const classes = useStyles();
  return (
    <div>
      <Snackbar
        className={'notification_'+props.msgNotifier.variant}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.msgNotifier.showMsg}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={props.msgNotifier.msg}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
})