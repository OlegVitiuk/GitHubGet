import api from './index';

const getUserRepos = () => api.get('user/repos');
const getUserData = () => api.get('user');

export { getUserData, getUserRepos };
