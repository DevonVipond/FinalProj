import axios from 'axios';

export default axios.create({
    withCredentials: true,
    //baseURL: BASE_URL,
});

