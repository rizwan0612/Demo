import React from "react"
import { Link, navigate } from "gatsby"
import { sessionDataManager } from '../services/http';
import { connect } from "react-redux";
import {logoutAction} from 'services/globalActions';
import { notification } from "services/globalActions";

class logoutPage extends React.Component {

  constructor(props: any) {
    super(props)
  }
  componentDidMount() {
    this.props.logout();
    sessionDataManager("clearAll", null, null);
    this.props.notification(true, "You are now logged out.", "error");
    navigate("");
  }

  render() {
    return (<h1>Logout</h1>)
  }
};


function mapStateToProps(state: any) {
  return {};
}

function mapDispatchToProps(dispatch: any) {
    return ({
      logout: () => { dispatch(logoutAction()) },
      notification : (sucess:boolean , message: string, successmessage:string) =>
        dispatch(notification(sucess, message, successmessage))
    });
}
export default connect(mapStateToProps, mapDispatchToProps)(logoutPage)
