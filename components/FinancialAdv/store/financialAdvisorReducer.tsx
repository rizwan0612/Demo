import * as constant from "../constants"


  const initialValue = {   
    financialAdvisorData:[],
    totalAmount:0,
  }
  export function financialAdvisor(state = initialValue, action:any) {
    switch (action.type) {  
      case constant.GET_ADVISOR_DATA:       
      return { ...state, financialAdvisorData: action.payload} 
      case constant.TOTAL_AMOUNT:       
      return { ...state, totalAmount: action.payload} 
      default:
        return state
    }
  }

  export default initialValue;
  