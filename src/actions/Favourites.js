export const loadFavourites = favourites => (
  {
    type: 'LOAD',
    payload: favourites,
  }
);

export const addFavourite = favourite => (
  {
    type: 'ADD',
    payload: favourite,
  }
);

export const removeFavourite = index => (
  {
    type: 'REMOVE',
    payload: index,
  }
);