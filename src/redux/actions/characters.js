import * as types from '../types/characters'
import { fetch, post } from 'react_marvel/src/webservices/webservices'

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

function updateCharacterExtraComics(value) {
  return {
    type: types.CHARACTERS_UPDATE_EXTRA_COMICS,
    value
  }
}

function updateCharacterExtraEvents(value) {
  return {
    type: types.CHARACTERS_UPDATE_EXTRA_EVENTS,
    value
  }
}

function updateCharacterExtraSeries(value) {
  return {
    type: types.CHARACTERS_UPDATE_EXTRA_SERIES,
    value
  }
}

function updateCharacterExtraStories(value) {
  return {
    type: types.CHARACTERS_UPDATE_EXTRA_STORIES,
    value
  }
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

    fetch(comicsUrl)
      .then(response => {
        dispatch(setCharactersFetching(false))

        const list = response && response.data && response.data.results ? response.data.results : []
        console.log('CharacterExtraComics response', response)

        dispatch(updateCharacterExtraComics(list))
      })
      .catch(error => {
        dispatch(setCharactersFetching(false))
        console.error('CharacterExtraComics error', error)
      })

    fetch(eventsUrl)
      .then(response => {
        dispatch(setCharactersFetching(false))

        const list = response && response.data && response.data.results ? response.data.results : []
        console.log('CharacterExtraEvents response', response)

        dispatch(updateCharacterExtraEvents(list))
      })
      .catch(error => {
        dispatch(setCharactersFetching(false))
        console.error('CharacterExtraEvents error', error)
      })

      fetch(seriesUrl)
        .then(response => {
          dispatch(setCharactersFetching(false))

          const list = response && response.data && response.data.results ? response.data.results : []
          console.log('CharacterExtraSeries response', response)

          dispatch(updateCharacterExtraSeries(list))
        })
        .catch(error => {
          dispatch(setCharactersFetching(false))
          console.error('CharacterExtraSeries error', error)
        })

      fetch(storiesUrl)
        .then(response => {
          dispatch(setCharactersFetching(false))

          const list = response && response.data && response.data.results ? response.data.results : []
          console.log('CharacterExtraStories response', response)

          dispatch(updateCharacterExtraStories(list))
        })
        .catch(error => {
          dispatch(setCharactersFetching(false))
          console.error('CharacterExtraStories error', error)
        })
  }
}