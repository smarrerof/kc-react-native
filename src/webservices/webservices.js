import axios from 'axios'
import * as constants from './constants'
import { BASE_CUSTOM, BASE_MARVEL } from './constants';

function buildUrl(endpoint, base) {
  if (!base) return endpoint

  switch (base) {
    case BASE_CUSTOM: 
      return `${endpoint}.json`
    case BASE_MARVEL:
    default:
      return endpoint
  } 
}

function buildConf(base) {
  if (!base) return { }

  switch (base) {
    case BASE_CUSTOM: 
      return { baseURL: constants.BASE_CUSTOM_URL }
    case BASE_MARVEL:
    default:
      return { }
  } 
}

export function configureAxios() {
  axios.defaults.baseURL = constants.BASE_MARVEL_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}

export function fetch(endpoint, base) {
  const url = buildUrl(endpoint, base)
  const conf = buildConf(base)

  return axios.get(url, conf)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    });
}

export function post(endpoint, data, base) {
  const url = buildUrl(endpoint, base)
  const conf = buildConf(base)

  return axios.post(url, data, conf)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export function remove(endpoint, base) {
  const url = buildUrl(endpoint, base)
  const conf = buildConf(base)

  console.log('remove', url, conf)
  return axios.delete(url, conf)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}