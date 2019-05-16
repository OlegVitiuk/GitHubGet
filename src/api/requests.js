import axios from 'axios';

const getUserData = axios.post('get');

const getUserRepos = axios.get('user/repos');

export { getUserData, getUserRepos };
