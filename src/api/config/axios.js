import axios from 'axios';
import {BASE_SERVER_URL} from "@/api/config/config";

const instance = axios.create({
    baseURL: BASE_SERVER_URL,
    timeout: 5000,
});

export default instance;