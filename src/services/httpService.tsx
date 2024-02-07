import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export async function read(url: any) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function exclude(url: string) {
  await axiosInstance.delete(url);
}

export async function create(url: string, object: any) {
  const { data } = await axiosInstance.post(url, object);
  return data;
}

export async function edit(url: string, object: any) {
  const { data } = await axiosInstance.put(url, object);
  return data;
}

export { BASE_URL };
