import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({ 
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Button style={{textTransform: 'capitalize'}}>
      <Typography variant="h6">{children}</Typography>
      </Button>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props: any) {

  let onClose = props.handleClose || (() => {})
  let shouldOpen = props.showModal || false
  let {Title, ModalBody, Actions} = (props.modalData())
  return (
    <div>
      <Dialog maxWidth="lg" onClose={onClose} aria-labelledby="customized-dialog-title" open={shouldOpen}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {Title}
        </DialogTitle>
        <DialogContent dividers>
          { ModalBody && <ModalBody />}
        </DialogContent>
        <DialogActions>
          {Actions && <Actions />}
        </DialogActions>
      </Dialog>
    </div>
  );
}