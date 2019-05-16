import axios from 'axios';

const clientId = '0d6007f1caa2a8a928a5';
const clientSecret = '93cb979cc2ec6b3a439002295051cd1ce33ce9c6';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export { clientId, clientSecret, api };
