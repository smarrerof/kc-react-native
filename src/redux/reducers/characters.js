import * as types from 'react_marvel/src/redux/types/characters'

const initialState = {
  isFetching: false,
  list: [],
  item: null,
  comics: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.CHARACTERS_UPDATE_LIST:
      return {
        ...state,
        list: action.value
      };

    case types.CHARACTERS_SET_FETCHING:
      return {
        ...state,
        isFetching: action.value
      };

    case types.CHARACTERS_UPDATE_CHARACTER:
      return {
        ...state,
        item: action.value
      };

    case types.CHARACTERS_UPDATE_EXTRA_COMIC:
      return {
        ...state,
        comics: action.value
      };

      default:
        return state;
  }
}