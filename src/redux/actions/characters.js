import * as types from '../types/characters'
import { fetch, post } from 'react_marvel/src/webservices/webservices'

import { Actions } from 'react-native-router-flux';


function updateCharactersList(value) {
  return {
    type: types.CHARACTERS_UPDATE_LIST,
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

export function fetchCharactersList() {
  return (dispatch, getState) => {
    dispatch(setCharactersFetching(true))

    const fetchUrl = '/characters?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'

    console.log('CharactersList', fetchUrl)
    fetch(fetchUrl)
      .then(response => {
        dispatch(setCharactersFetching(false))

        const list = response && response.data && response.data.results ? response.data.results : []
        console.log('CharactersList response', response)

        dispatch(updateCharactersList(list))
      })
      .catch(error => {
        dispatch(setCharactersFetching(false))
        console.error('CharactersList error', error)
      })
  }
}

export function fetchCharacterExtra() {
  return (dispatch, getState) => {
    const character = getState().characters.item
  
    const comicsUrl = character.comics.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'
    const eventsUrl = character.events.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'
    const seriesUrl = character.series.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'
    const storiesUrl = character.stories.collectionURI.replace('http', 'https') + '?ts=1234&apikey=a3ce93a8401b1219c18b9ca8310e1abc&hash=5742e01f78129797c6cc8aca0ec8f005'

    fetchData(dispatch, comicsUrl, types.CHARACTERS_UPDATE_EXTRA_COMICS)
    fetchData(dispatch, eventsUrl, types.CHARACTERS_UPDATE_EXTRA_EVENTS)
    fetchData(dispatch, seriesUrl, types.CHARACTERS_UPDATE_EXTRA_SERIES)
    fetchData(dispatch, storiesUrl, types.CHARACTERS_UPDATE_EXTRA_STORIES)
  }
}

export function postCharacter(character) {
  return (dispatch, getState) => {
    dispatch(setCharactersFetching(true))
    const state = getState()

    const fetchUrl = '/characters'
    post(fetchUrl, character)
      .then(response => {
        dispatch(setCharactersFetching(false))
        console.log('postCharacter response', response)

        /*if (response.record) {
          dispatch(fetchCharactersList())
          dispatch(updateCharacterSelected(null))
          Actions.pop()
        }*/
        
        Actions.pop()
      })
      .catch((error) => {
        dispatch(setCharactersFetching(false))
        console.log('postCharacter error', error)
      })
  }
}