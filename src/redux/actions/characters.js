import * as types from 'react_marvel/src/redux/types/characters'
import * as constants from 'react_marvel/src/webservices/constants'
import { fetch, post, remove } from 'react_marvel/src/webservices/webservices'

import { Actions } from 'react-native-router-flux';


function updateCharactersList(list, total) {
  return {
    type: types.CHARACTERS_UPDATE_LIST,
    list,
    total
  }
}

function updateCustomCharactersList(customList) {
  return {
    type: types.CHARACTERS_UPDATE_CUSTOM_LIST,
    customList
  }
}

export function updateCharactersListOffset(value) {
  return {
    type: types.CHARACTERS_UPDATE_LIST_OFFSET,
    value
  }
}

function setCustomCharactersFetching(value) {
  return {
    type: types.CHARACTERS_SET_CUSTOM_FETCHING,
    value
  }
}

function setCharactersFetching(value) {
  return {
    type: types.CHARACTERS_SET_FETCHING,
    value
  }
}

function updateCharacterExtra(type, value) {
  return {
    type,
    value
  }
}

function fetchData(dispatch, fetchUrl, type) {
  dispatch(setCharactersFetching(true))

  fetch(fetchUrl)
    .then(response => {
      dispatch(setCharactersFetching(false))

      const list = response && response.data && response.data.results ? response.data.results : []
      console.log('CharacterExtra', type, 'response', response)

      dispatch(updateCharacterExtra(type, list))
    })
    .catch(error => {
      dispatch(setCharactersFetching(false))
      console.error('CharacterExtra', type, 'error', error)
    })  
}

export function updateCharacterSelected(value) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER,
    value
  }
}

export function initCharactersList() {
  return (dispatch, getState) => {
    // Reset character list and set total to 0
    dispatch(updateCharactersList([], 0))

    // Set offset to 0
    dispatch(updateCharactersListOffset(0))

    // Fetch list
    dispatch(fetchCharactersList())
  }
}

export function fetchCharactersList() {
  return (dispatch, getState) => {
    dispatch(setCharactersFetching(true))

    const state = getState()
    const list = state.characters.list
    const offset = state.characters.offset
    const limit = 10

    const fetchUrl = '/characters?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005&offset='+offset+'&limit='+limit
    fetch(fetchUrl)
      .then(response => {
        dispatch(setCharactersFetching(false))

        const _list = response && response.data && response.data.results ? response.data.results : []
        const total = response && response.data ? response.data.total : 0
        console.log('CharactersList response', response)

        // Concat list and _list
        const newList = [...list, ..._list]

        dispatch(updateCharactersList(newList, total))
      })
      .catch(error => {
        dispatch(setCharactersFetching(false))
        console.error('CharactersList error', error)
      })
  }
}

export function fetchCustomCharactersList() {
  return (dispatch, getState) => {
    dispatch(setCustomCharactersFetching(true))

    const fetchUrl = '/characters'
    fetch(fetchUrl, constants.BASE_CUSTOM)
      .then(response => {
        dispatch(setCustomCharactersFetching(false))

        console.log('CharactersList response', response)

        let list = []
        Object.keys(response).forEach((property) => {
          let item = response[property]
          item.id = property
          list.push(item)
        })

        dispatch(updateCustomCharactersList(list))
      })
      .catch(error => {
        dispatch(setCustomCharactersFetching(false))
        console.error('CharactersList error', error)
      })
  }
}

export function fetchCharacterExtra() {
  return (dispatch, getState) => {
    const character = getState().characters.item
  
    //const comicsUrl = character.comics.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'
    const eventsUrl = character.events.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'
    const seriesUrl = character.series.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'
    const storiesUrl = character.stories.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'

    //fetchData(dispatch, comicsUrl, types.CHARACTERS_UPDATE_EXTRA_COMICS)
    
    /*fetchData(dispatch, eventsUrl, types.CHARACTERS_UPDATE_EXTRA_EVENTS)
    fetchData(dispatch, seriesUrl, types.CHARACTERS_UPDATE_EXTRA_SERIES)
    fetchData(dispatch, storiesUrl, types.CHARACTERS_UPDATE_EXTRA_STORIES)*/
  }
}


// Character comic list
function setCharacterComicListFetching(value) {
  return {
    type: types.CHARACTERS_SET_CHARACTER_COMIC_LIST_FETCHING,
    value
  }
}

export function initCharacterComicList() {
  return (dispatch, getState) => {
    // Reset character list and set total to 0
    dispatch(updateCharacterComicList([], 0))

    // Set offset to 0
    dispatch(updateCharacterComicListOffset(0))

    // Fetch list
    dispatch(fetchCharacterComicList())
  }
}

function updateCharacterComicList(list, total) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_COMIC_LIST,
    list: list,
    total: total
  }
}

export function updateCharacterComicListOffset(value) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_COMIC_LIST_OFFSET,
    value
  }
}

export function fetchCharacterComicList() {
  return (dispatch, getState) => {
    dispatch(setCharacterComicListFetching(true))

    const state = getState()
    const character = state.characters.item
    const list = state.characters.comics.list
    const offset = state.characters.comics.offset
    const limit = 10

    const fetchUrl = character.comics.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005&offset='+offset+'&limit='+limit

    console.log('ComicList', fetchUrl)
    fetch(fetchUrl)
      .then(response => {
        dispatch(setCharacterComicListFetching(false))

        const _list = response && response.data && response.data.results ? response.data.results : []
        const total = response && response.data ? response.data.total : 0
        console.log('ComicList response', response)

        // Concat list and _list
        const newList = [...list, ..._list]

        dispatch(updateCharacterComicList(newList, total))
      })
      .catch(error => {
        dispatch(setCharacterComicListFetching(false))
        console.error('ComicList error', error)
      })
  }
}


// Character event list
function setCharacterEventListFetching(value) {
  return {
    type: types.CHARACTERS_SET_CHARACTER_EVENT_LIST_FETCHING,
    value
  }
}

export function initCharacterEventList() {
  return (dispatch, getState) => {
    // Reset character list and set total to 0
    dispatch(updateCharacterEventList([], 0))

    // Set offset to 0
    dispatch(updateCharacterEventListOffset(0))

    // Fetch list
    dispatch(fetchCharacterEventList())
  }
}

function updateCharacterEventList(list, total) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_EVENT_LIST,
    list: list,
    total: total
  }
}

export function updateCharacterEventListOffset(value) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_EVENT_LIST_OFFSET,
    value
  }
}

export function fetchCharacterEventList() {
  return (dispatch, getState) => {
    dispatch(setCharacterEventListFetching(true))

    const state = getState()
    const character = state.characters.item
    const list = state.characters.events.list
    const offset = state.characters.events.offset
    const limit = 10

    const fetchUrl = character.events.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005&offset='+offset+'&limit='+limit

    console.log('EventList', fetchUrl)
    fetch(fetchUrl)
      .then(response => {
        dispatch(setCharacterEventListFetching(false))

        const _list = response && response.data && response.data.results ? response.data.results : []
        const total = response && response.data ? response.data.total : 0
        console.log('EventList response', response)

        // Concat list and _list
        const newList = [...list, ..._list]

        dispatch(updateCharacterEventList(newList, total))
      })
      .catch(error => {
        dispatch(setCharacterEventListFetching(false))
        console.error('EventList error', error)
      })
  }
}


// post and delete custom characters
export function postCharacter(character) {
  return (dispatch, getState) => {
    dispatch(setCharactersFetching(true))
    
    const fetchUrl = '/characters'
    post(fetchUrl, character, constants.BASE_CUSTOM)
      .then(response => {
        dispatch(setCharactersFetching(false))
        console.log('postCharacter response', response)

        if (response) {
          dispatch(fetchCustomCharactersList())
          dispatch(updateCharacterSelected(null))
          Actions.pop()
        }
      })
      .catch((error) => {
        dispatch(setCharactersFetching(false))
        console.log('postCharacter error', error)
      })
  }
}

export function deleteCharacter(character) {
  return (dispatch, getState) => {
    dispatch(setCharactersFetching(true))
    
    const fetchUrl = '/characters/' + character.id
    remove(fetchUrl, constants.BASE_CUSTOM)
      .then((response) => {
        dispatch(setCharactersFetching(false))
        console.log('deleteCharacter response', response)

        // Firebase, response is null when delete
        dispatch(fetchCustomCharactersList())
        dispatch(updateCharacterSelected(null))
        Actions.pop() 
      })
      .catch((error) => {
        dispatch(setCharactersFetching(false))
        console.log('deleteCharacter error', error)
      })
  }
}