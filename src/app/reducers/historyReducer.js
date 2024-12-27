const initialState = {
    data: [],
    loading: false,
    selectedPlaces: JSON.parse(localStorage.getItem("selectedPlaces")) || [],
    error: null,
  };
  
  const historicalReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DATA_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_DATA_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_DATA_FAILURE':
        return { ...state, loading: false, error: action.payload };
        case 'ADD_PLACE':
      return {
        ...state,
        selectedPlaces: [...state.selectedPlaces, action.payload],
      };
    case 'REMOVE_PLACE':
      return {
        ...state,
        selectedPlaces: state.selectedPlaces.filter(
          (place) => place.card.poiId !== action.payload
        ),
      };
      default:
        return state;
    }
  };
  
  export default historicalReducer;
  