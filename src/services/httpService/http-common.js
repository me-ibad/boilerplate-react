import axios from 'axios';
import authHeader from '../auth/authHeader';
import { endPoint } from '../../config/config';
let localData = JSON.parse(localStorage.getItem('localdealtoken'));

let Api;
if (localData && localData.hasOwnProperty('token')) {
  Api = axios.create({
    baseURL: endPoint,
    headers: {
      'Content-type': 'application/json',

      Authorization: localData.token,
    },
  });
} else {
  Api = axios.create({
    baseURL: endPoint,
    headers: {
      'Content-type': 'application/json',
    },
  });
}

export default Api;
