import axios from 'axios';

const params = {
  encode: {
    method: 'post',
    path: 'encode',
  },
  decode: {
    method: 'get',
    path: 'decode',
  }
};

const baseUrl = 'http://localhost:3000/';
const call = function (endpoint, payload) {
  const { method, path } = params[endpoint];
  const config = method === 'get' ? { params: payload } : payload;
  return axios[method](baseUrl + path, config);
};

export default call;