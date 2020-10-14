import axios from 'axios'
import { backendUrl } from './keys';

axios.interceptors.request.use(async (config) => {
    config.url = backendUrl + config.url
    return config;
});
  
axios.interceptors.response.use((response) => { 
    return response;
}, (error) => { 
    
    return Promise.reject(error);
}); 