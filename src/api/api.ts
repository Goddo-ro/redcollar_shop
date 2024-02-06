import axios from 'axios';

export const $productsInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
});