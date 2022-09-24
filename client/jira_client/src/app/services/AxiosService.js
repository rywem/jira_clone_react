import Axios from 'axios'

export const api = Axios.create({
    baseUrl: 'https://localhost:7260/',
    timeout: 8000
});