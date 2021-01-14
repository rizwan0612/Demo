import React from "react"
import HeaderBar from "../components/header/header"
import FinancialAdvisorHome from '../components/FinancialAdv/financialAdvisorHome'
import { Container } from '@material-ui/core';


import Layout from "../components/layout"
const IndexPage = () => {

  return (
    <Layout>
      <Container className="" style={{ padding: 0 }} maxWidth={false}>
        <div className="content" style={{paddingTop: '5%'}}>
          <FinancialAdvisorHome />
        </div>
        
      </Container>
    </Layout>
  )
};

export default IndexPage