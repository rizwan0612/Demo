import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { connect } from 'react-redux'
import { notification } from '../../services/globalActions'


function AppNotifications(props: any) {
    const { enqueueSnackbar } = useSnackbar();
    //enqueueSnackbar('This is a success message!', { variant });

    switch(props.msgNotifier.variant) {
        case 'success':
            enqueueSnackbar(props.msgNotifier.msg, { variant: 'success' });
            break;
        case 'error':
            enqueueSnackbar(props.msgNotifier.msg, { variant: 'error' });
            break;
        case 'basic':
            enqueueSnackbar(props.msgNotifier.msg);
            break;
    }
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }

const Notifier = connect((state: any) => {
    return state.globalR
}, (dispatch: any) => {
    return {
        notification: (variant: string, msg: string) => dispatch(notification(variant, msg))
    }
})(AppNotifications)

export default class IntegrationNotistack  extends React.PureComponent {
    render() {
        return (<SnackbarProvider maxSnack={1}><Notifier/></SnackbarProvider>);
    }
}
