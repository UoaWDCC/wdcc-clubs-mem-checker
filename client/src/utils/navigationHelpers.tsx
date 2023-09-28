import axios from 'axios';
import Cookies from 'js-cookie';

const hasClubs = (): boolean => {
  // Find the auth token in local storage if it exists
  const token: string | undefined = Cookies.get('token');
  if (token != undefined) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axios.get('/api/user/organisations').then((res) => {
    if (res.status === 204) {
      return false;
    }
  });
  return true;
};

export default hasClubs;
