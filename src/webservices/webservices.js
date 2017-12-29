import axios from 'axios'
import * as constants from './constants'

function buildUrl(endpoint, url) {
  return `${url ? url : ''}${endpoint}`
}

export function configureAxios() {
  axios.defaults.baseURL = constants.BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}


export function fetch(endpoint) {
  return axios.get(endpoint)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    });
}

export function post(endpoint, data) {
  return axios.post(endpoint + '.json', data, {
      baseURL: constants.BASE_POST_URL
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export function remove(endpoint, data) {
  return axios.delete(endpoint, data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}