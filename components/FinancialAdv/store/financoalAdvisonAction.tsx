import * as constants from "../constants"
import { notification } from "../../../services/globalActions"
import FinancialAdvisorService from "../api/financialAdvisorService";

const financialAdvisorService =new FinancialAdvisorService();

export const getAdvisorData = (value: string) => ({
    type: constants.GET_ADVISOR_DATA,
    payload: value,
  })

  export const calculateAmount = (value: number) => ({
    type: constants.TOTAL_AMOUNT,
    payload: value,
  })
  
  export const getFinancialAdvisorData = () => {
    return (dispatch: any, state: any) => {
      const url = `https://test`; // need to replace with actual api
      console.log("loading data: ",url);    
    //   financialAdvisorService.getAdvisorData(url, (res: any) => {
    //     dispatch(getAdvisorData(res))
    //    })
       const financialAdvisorData : any =[
        { "Risk": 1, "Bonds %": 80, "Large Cap %": 20, "Mid Cap %": 0, "Foreign %": 0, "Small Cap %": 0  },
        { "Risk": 2, "Bonds %": 70, "Large Cap %": 15, "Mid Cap %": 15, "Foreign %": 0, "Small Cap %": 0  },
        { "Risk": 3, "Bonds %": 60, "Large Cap %": 15, "Mid Cap %": 15, "Foreign %": 10, "Small Cap %": 0  },
        { "Risk": 4, "Bonds %": 50, "Large Cap %": 20, "Mid Cap %": 20, "Foreign %": 10, "Small Cap %": 0  },
        { "Risk": 5, "Bonds %": 40, "Large Cap %": 20, "Mid Cap %": 20, "Foreign %": 20, "Small Cap %": 0  },
        { "Risk": 6, "Bonds %": 35, "Large Cap %": 25, "Mid Cap %": 5, "Foreign %": 30, "Small Cap %": 5  },
        { "Risk": 7, "Bonds %": 20, "Large Cap %": 25, "Mid Cap %": 25, "Foreign %": 25, "Small Cap %": 5  },
        { "Risk": 8, "Bonds %": 10, "Large Cap %": 20, "Mid Cap %": 40, "Foreign %": 20, "Small Cap %": 10  },
        { "Risk": 9, "Bonds %": 5, "Large Cap %": 15, "Mid Cap %": 40, "Foreign %": 25, "Small Cap %": 15  },
        { "Risk": 10, "Bonds %": 0, "Large Cap %": 5, "Mid Cap %": 25, "Foreign %": 30, "Small Cap %": 40  }
    ]
    
        dispatch(getAdvisorData(financialAdvisorData))

    }
  }

  export const calculteTotalAmount = (value:number) => {
    return (dispatch: any, state: any) => {
        dispatch(calculateAmount(value))

    }
  }