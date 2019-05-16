import api from './index';

const getUserRepos = token =>
  api.get('user/repos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
const getUserData = token =>
  api.get('user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export { getUserData, getUserRepos };
