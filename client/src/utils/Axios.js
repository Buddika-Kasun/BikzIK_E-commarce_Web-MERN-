import axios from 'axios';
import { baseURL } from '../common/SummaryApi';

// Create a new instance of axios
const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default Axios;