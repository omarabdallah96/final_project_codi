import axios from 'axios';

import { getCookie } from '../../cookies';


 



const token=getCookie('token')


let api=axios.create({
  baseURL: `http://localhost:8000/api/`,
  // baseURL: `http://192.168.43.173:8000/api/`|| 'http://127.0.0.1:8000/api',

  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export default api;