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