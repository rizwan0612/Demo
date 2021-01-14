import BaseApiCall from "../../../services/API/BaseApiCall"


class FinancialAdvisorService extends BaseApiCall {
    constructor() {
      super()
    }

    getAdvisorData = (url: string, data: any) => {
        return this.get(url, data,null)
      }
    }



    export default FinancialAdvisorService