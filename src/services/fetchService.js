import axios from "axios";

export const fetcher = axios.create({
    baseURL: 'https://fakestoreapi.com'
});

export const get = (url, config) => {
    return fetcher.get(url, { ...config })
}
export const post = (url, config) => {
    return fetcher.post(url, { ...config })
}
