import * as types from 'react_marvel/src/redux/types/characters'

const initialState = {
  // Custom
  isCustomFetching: false,
  customList: [],
  // Marvel
  isFetching: false,
  list: [],
  total: 0,
  offset: 0,
  item: null,
  comics: [],
  events: [],
  series: [],
  stories: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.CHARACTERS_UPDATE_LIST:
      return {
        ...state,
        list: action.list,
        total: action.total
      };

    case types.CHARACTERS_UPDATE_LIST_OFFSET:
      return {
        ...state,
        offset: action.value
      };

      case types.CHARACTERS_UPDATE_CUSTOM_LIST:
        return {
          ...state,
          customList: action.customList
        };

    case types.CHARACTERS_SET_CUSTOM_FETCHING:
      return {
        ...state,
        isCustomFetching: action.value
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

    case types.CHARACTERS_UPDATE_EXTRA_COMICS:
      return {
        ...state,
        comics: action.value
      };

    case types.CHARACTERS_UPDATE_EXTRA_EVENTS:
      return {
        ...state,
        events: action.value
      };

    case types.CHARACTERS_UPDATE_EXTRA_SERIES:
      return {
        ...state,
        series: action.value
      };

    case types.CHARACTERS_UPDATE_EXTRA_STORIES:
      return {
        ...state,
        stories: action.value
      };

      default:
        return state;
  }
}