
import React from "react"
import PropTypes from "prop-types"
import "./layout.scss"
import HeaderBar from "./header/header"
import FooterBar from './footer/footer'
import Notifier from '../services/notifier'
import { globalHistory } from "@reach/router"
import { navigate } from "gatsby"

const Layout = (props) => {
  let currenrRoute = globalHistory.location.pathname.replace(/^\/|\/$/g, '')
  let session = null;
  try {
    session = JSON.parse(sessionStorage.getItem("token"))
  } catch (e) { }
  return (
    <>
    {
      (currenrRoute !== '' && session === null) ? navigate("/") :
      <div className="rootContainer">
      <Notifier />
      <HeaderBar isShow={props.isShow == undefined ? true : false} />
      <main className={"content " + (props.isShow == undefined ? 'after-login-container' : '')}>
        {props.children}
      </main>
      <FooterBar />
    </div>
    }
    </>

  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
