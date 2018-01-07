import * as types from 'react_marvel/src/redux/types/characters'
import * as constants from 'react_marvel/src/webservices/constants'
import { fetch, post, remove } from 'react_marvel/src/webservices/webservices'

import { Actions } from 'react-native-router-flux'


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
    const limit = constants.LIMIT

    const fetchUrl = `/characters?${constants.MARVEL_QUERY}&offset=${offset}&limit=${limit}`
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

        if (!response) response = []

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
    const limit = constants.LIMIT

    const fetchUrl = character.comics.collectionURI + `?${constants.MARVEL_QUERY}&offset=${offset}&limit=${limit}`

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

    const fetchUrl = character.events.collectionURI + `?${constants.MARVEL_QUERY}&offset=${offset}&limit=${limit}`

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


// Character serie list
function setCharacterSerieListFetching(value) {
  return {
    type: types.CHARACTERS_SET_CHARACTER_SERIE_LIST_FETCHING,
    value
  }
}

export function initCharacterSerieList() {
  return (dispatch, getState) => {
    // Reset character list and set total to 0
    dispatch(updateCharacterSerieList([], 0))

    // Set offset to 0
    dispatch(updateCharacterSerieListOffset(0))

    // Fetch list
    dispatch(fetchCharacterSerieList())
  }
}

function updateCharacterSerieList(list, total) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_SERIE_LIST,
    list: list,
    total: total
  }
}

export function updateCharacterSerieListOffset(value) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_SERIE_LIST_OFFSET,
    value
  }
}

export function fetchCharacterSerieList() {
  return (dispatch, getState) => {
    dispatch(setCharacterSerieListFetching(true))

    const state = getState()
    const character = state.characters.item
    const list = state.characters.series.list
    const offset = state.characters.series.offset
    const limit = constants.LIMIT

    const fetchUrl = character.series.collectionURI + `?${constants.MARVEL_QUERY}&offset=${offset}&limit=${limit}`

    console.log('SerieList', fetchUrl)
    fetch(fetchUrl)
      .then(response => {
        dispatch(setCharacterSerieListFetching(false))

        const _list = response && response.data && response.data.results ? response.data.results : []
        const total = response && response.data ? response.data.total : 0
        console.log('SerieList response', response)

        // Concat list and _list
        const newList = [...list, ..._list]

        dispatch(updateCharacterSerieList(newList, total))
      })
      .catch(error => {
        dispatch(setCharacterSerieListFetching(false))
        console.error('SerieList error', error)
      })
  }
}


// Character story list
function setCharacterStoryListFetching(value) {
  return {
    type: types.CHARACTERS_SET_CHARACTER_STORY_LIST_FETCHING,
    value
  }
}

export function initCharacterStoryList() {
  return (dispatch, getState) => {
    // Reset character list and set total to 0
    dispatch(updateCharacterStoryList([], 0))

    // Set offset to 0
    dispatch(updateCharacterStoryListOffset(0))

    // Fetch list
    dispatch(fetchCharacterStoryList())
  }
}

function updateCharacterStoryList(list, total) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_STORY_LIST,
    list: list,
    total: total
  }
}

export function updateCharacterStoryListOffset(value) {
  return {
    type: types.CHARACTERS_UPDATE_CHARACTER_STORY_LIST_OFFSET,
    value
  }
}

export function fetchCharacterStoryList() {
  return (dispatch, getState) => {
    dispatch(setCharacterStoryListFetching(true))

    const state = getState()
    const character = state.characters.item
    const list = state.characters.stories.list
    const offset = state.characters.stories.offset
    const limit = constants.LIMIT

    const fetchUrl = character.stories.collectionURI + `?${constants.MARVEL_QUERY}&offset=${offset}&limit=${limit}`

    console.log('StoryList', fetchUrl)
    fetch(fetchUrl)
      .then(response => {
        dispatch(setCharacterStoryListFetching(false))

        const _list = response && response.data && response.data.results ? response.data.results : []
        const total = response && response.data ? response.data.total : 0
        console.log('StoryList response', response)

        // Concat list and _list
        const newList = [...list, ..._list]

        dispatch(updateCharacterStoryList(newList, total))
      })
      .catch(error => {
        dispatch(setCharacterStoryListFetching(false))
        console.error('StoryList error', error)
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