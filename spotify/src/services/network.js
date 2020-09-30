import axios from 'axios';

const network = axios.create({});

const getToken = () => {
  return localStorage.getItem('token');
}

network.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "bearer " + getToken();
    return config;
  }
);

network.interceptors.response.use(
  config => {
    return config;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return error;
  }
);

export default network;