import axios from 'axios';
import { API_ENDPOINT } from '../constants';

const apiInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
  },
});

export { apiInstance };
export * from './task.api';

