/* eslint-disable */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://email-signature-backend-lb5zrlbtk-olehleolvivua.vercel.app/api/'
});

export default axiosInstance;
