import axios from 'axios';
import {toast} from 'react-toastify';
import logService from './logService';


axios.interceptors.response.use(null,error=>{
    const expectedError=error.response&&error.response.status>=400&&error.response.status<500;
    if(!expectedError){
      logService.log(error);
      toast.error('An unexpected error has occured');
    } 
    return Promise.reject(error);
  });

  export default {
      get:axios.get,
      put:axios.put,
      post:axios.post,
      delete:axios.delete
  }