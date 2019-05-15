import { handleResponse, handleError } from './apiUtils';
const baseURL = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseURL)
    .then(handleResponse)
    .catch(handleError);
}