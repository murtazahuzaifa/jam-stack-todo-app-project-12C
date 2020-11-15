import axios, { AxiosInstance } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL||'',
});

// http.defaults.headers.post['Content-Type'] = 'application/json';

// http.interceptors.response.use(
//   async (response: AxiosResponse): Promise<any> => {
//     if (response.status >= 200 && response.status < 300) {
//       return response.data;
//     }
//   },
//   (error: AxiosError) => {
//     const {
//       response,
//       request,
//     }: { response?: AxiosResponse; request?: XMLHttpRequest } = error;
//     if (response) {
//       if (response.status >= 400 && response.status < 500) {
//         alert(`Request Error, ${JSON.stringify(response.data)}`);
//         return null;
//       }
//     } else if (request) {
//       alert('Request failed. Please try again.');
//       return null;
//     }
//     return Promise.reject(error);
//   }
// );

export default http;