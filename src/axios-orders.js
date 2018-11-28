import axios from 'axios';

const instance = 
    axios.create({
        baseURL: 'https://my-burger-proj1.firebaseio.com/'
    });

export default instance;