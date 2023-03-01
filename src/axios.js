/* eslint-disable */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://email-signature-backend.vercel.app/api/'
});

export default axiosInstance;
