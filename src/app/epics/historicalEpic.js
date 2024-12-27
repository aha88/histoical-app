import { ofType } from 'redux-observable';
import { map, catchError, of, delay } from 'rxjs';
import JSONdata from '../../data/list.json';

export const historicalEpic = (action$) =>
  action$.pipe(
    ofType('FETCH_DATA_REQUEST'),
    delay(500), 
    map(() => {
      try {
        const data = JSONdata.attractionList;
        return { type: 'FETCH_DATA_SUCCESS', payload: data };
      } catch (error) {
        return { type: 'FETCH_DATA_FAILURE', payload: error.message };
      }
    })
  );
