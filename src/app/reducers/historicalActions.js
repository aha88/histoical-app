export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';

export const addPlace = (place) => ({
  type: ADD_PLACE,
  payload: place,
});

export const removePlace = (placeId) => ({
  type: REMOVE_PLACE,
  payload: placeId,
});
