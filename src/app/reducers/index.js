import { combineReducers } from 'redux';
import historyReducer from './historyReducer'; // Example reducer

const rootReducer = combineReducers({
  example: historyReducer,
});

export default rootReducer;
