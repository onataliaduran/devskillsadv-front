import axios from 'axios';

export enum Uri {
  Auth = 'auth',
  Members = 'api/members',
}

export const API = axios.create({
  baseURL: `http://localhost:8081/`,
});

export const setToken = (token: string): void => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
