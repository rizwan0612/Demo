import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from "redux-thunk";

import { financialAdvisor } from '../components/FinancialAdv/store/financialAdvisorReducer';
import { globalR } from './globalReducer'
import {LOGOUT_ACTION} from 'services/globalConstants';
import {defaultStateModel} from 'services/defaultStateModel';

const reducers = combineReducers({financialAdvisor, globalR})

const rootReducer = (state: any, action:any) => {
  if (action.type === LOGOUT_ACTION) {
    state = defaultStateModel
  }

  return reducers(state, action)
}

let storeObject = {}

const storeFunction = (defaultStateModel: any) => {
  storeObject['store'] = createStore(rootReducer, defaultStateModel,
    applyMiddleware(thunk)
  //compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
  return storeObject['store']
}

export const store = storeObject
export default storeFunction
