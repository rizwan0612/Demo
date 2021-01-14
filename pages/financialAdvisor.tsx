import React from "react"
import HeaderBar from "../components/header/header";
import financialAdvisorHome from '../components/FinancialAdv/financialAdvisorHome';
import { Container } from '@material-ui/core';


import Layout from "../components/layout"
const IndexPage = () => {

  return (
    <Layout>
      <Container className="" style={{ padding: 0 }} maxWidth={false}>
        <div className="content">
          <financialAdvisorHome />
        </div>
        
      </Container>
    </Layout>
  )
};

export default IndexPage