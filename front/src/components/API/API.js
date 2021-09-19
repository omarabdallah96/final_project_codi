import axios from 'axios';

import { getCookie } from '../../cookies';
import { useContext } from 'react';
import SessionContext from '../session/SessionContext';

 



const token=getCookie('token')


let api=axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export default api;