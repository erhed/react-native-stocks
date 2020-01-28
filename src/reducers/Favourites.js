import { combineReducers } from 'redux';

const INITIAL_STATE = {
  favourites: [],
};

const favouriteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOAD':
      return { favourites: action.payload };
    case 'ADD':
      let favourites = [];
      if (state.favourites) {
        favourites = [...state.favourites];
      }
      favourites.push(action.payload);
      return { favourites: favourites };
    case 'REMOVE':
      let index = action.payload;
      let allFavourites = [...state.favourites];
      if (allFavourites.length > 1) {
        allFavourites.splice(index, 1);
      } else {
        allFavourites = [];
      }
      return { favourites: allFavourites };
    default:
      return state;
  }
};

export default combineReducers({
  favourites: favouriteReducer,
});