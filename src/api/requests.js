import api from './index';

const getUserData = () => api.post('get');

const getUserRepos = () => api.get('user/repos');

export { getUserData, getUserRepos };
