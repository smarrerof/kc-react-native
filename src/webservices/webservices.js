import axios from 'axios'
import * as constants from './constants'


export function configureAxios() {
  axios.defaults.baseURL = constants.BASE_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
}


export function fetch(url) {
  return axios.get(url)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    });
}

export function post(url, data) {
  return axios.post(url, data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

export function remove(url, data) {
  return axios.delete(url, data)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}