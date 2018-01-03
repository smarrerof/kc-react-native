import * as types from 'react_marvel/src/redux/types/characters'

const initialState = {
  // CharacterList: Custom list
  isCustomFetching: false,
  customList: [],

  // CharacterList: Marvel list
  isFetching: false,
  list: [],
  total: 0,
  offset: 0,

  // CharacterList & CharacterView: Selected item
  item: null,
  
  // Marvel CharacterView: Comic list
  comics: {
    list: [],
    isFetching: false,
    total: 0,
    offset: 0,
  },
  
  // Marvel CharacterView: Event list
  events: {
    list: [],
    isFetching: false,
    total: 0,
    offset: 0,
  },

  // Marvel CharacterView: Serie list
  series: {
    list: [],
    isFetching: false,
    total: 0,
    offset: 0,
  },

  // Marvel CharacterView: Stories list
  stories: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case types.CHARACTERS_UPDATE_LIST:
      return {
        ...state,
        list: action.list,
        total: action.total
      }

    case types.CHARACTERS_UPDATE_LIST_OFFSET:
      return {
        ...state,
        offset: action.value
      }

      case types.CHARACTERS_UPDATE_CUSTOM_LIST:
        return {
          ...state,
          customList: action.customList
        }

    case types.CHARACTERS_SET_CUSTOM_FETCHING:
      return {
        ...state,
        isCustomFetching: action.value
      }

    case types.CHARACTERS_SET_FETCHING:
      return {
        ...state,
        isFetching: action.value
      }

    case types.CHARACTERS_UPDATE_CHARACTER:
      return {
        ...state,
        item: action.value
      }

    // Character comic list
    case types.CHARACTERS_SET_CHARACTER_COMIC_LIST_FETCHING:
      return {
        ...state,
        comics: {
          ...state.comics,
          isFetching: action.value
        }
      }

    case types.CHARACTERS_UPDATE_CHARACTER_COMIC_LIST:
      return {
        ...state,
        comics: {
          ...state.comics,
          list: action.list,
          total: action.total 
        }
      }
    
    case types.CHARACTERS_UPDATE_CHARACTER_COMIC_LIST_OFFSET:
      return {
        ...state,
        comics: {
          ...state.comics,
          offset: action.value
        }
      }


    // Character event list
    case types.CHARACTERS_SET_CHARACTER_EVENT_LIST_FETCHING:
      return {
        ...state,
        events: {
          ...state.events,
          isFetching: action.value
        }
      }

    case types.CHARACTERS_UPDATE_CHARACTER_EVENT_LIST:
      return {
        ...state,
        events: {
          ...state.events,
          list: action.list,
          total: action.total 
        }
      }
    
    case types.CHARACTERS_UPDATE_CHARACTER_EVENT_LIST_OFFSET:
      return {
        ...state,
        events: {
          ...state.events,
          offset: action.value
        }
      }

    // Character serie list
    case types.CHARACTERS_SET_CHARACTER_SERIE_LIST_FETCHING:
      return {
        ...state,
        series: {
          ...state.series,
          isFetching: action.value
        }
      }

    case types.CHARACTERS_UPDATE_CHARACTER_SERIE_LIST:
      return {
        ...state,
        series: {
          ...state.series,
          list: action.list,
          total: action.total 
        }
      }
    
    case types.CHARACTERS_UPDATE_CHARACTER_SERIE_LIST_OFFSET:
      return {
        ...state,
        series: {
          ...state.series,
          offset: action.value
        }
      }




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