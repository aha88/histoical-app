import { combineEpics } from 'redux-observable';
import { historicalEpic } from './historicalEpic';

const rootEpic = combineEpics(
  historicalEpic
);

export default rootEpic;
