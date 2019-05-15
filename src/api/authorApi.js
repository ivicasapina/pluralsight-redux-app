import { handleResponse, handleError } from './apiUtils';
const baseURL = process.env.REACT_APP_API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseURL)
    .then(handleResponse)
    .catch(handleError);
}