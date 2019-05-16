import axios from 'axios';

const token = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
