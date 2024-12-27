import { combineReducers } from 'redux';
import historyReducer from './historyReducer'; // Example reducer

const rootReducer = combineReducers({
    historical: historyReducer,
});

export default rootReducer;
