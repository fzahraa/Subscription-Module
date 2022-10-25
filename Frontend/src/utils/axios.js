import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

export const customFetch = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { "content-type": "application/json", }
});

export const customFetchProfile = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

customFetchProfile.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common['x-access-token'] = user.token;
  }
  return config;
});