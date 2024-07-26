// import axios, {RawAxiosRequestConfig} from 'axios';
// import {BASE_URL} from './environment';
// import {AuthService} from '../services/api/service';
// import {failRefreshToken, refreshToken} from '../redux/action/users/auth';
// import {AppDispatch} from '../redux/app/store';
// import {
//   REFRESH_TOKEN,
//   USER_TOKEN,
//   setEncryptedStorageData,
// } from '../services/storageHandler/storageHandler';

// const instanceWithoutAuthVar = axios.create({
//   baseURL: BASE_URL,
// });
// const instanceWithAuthVar = axios.create({
//   baseURL: BASE_URL,
// });
// let attemptCount = 0;
// let token: string | null = null;
// export const setJWT = (userToken: string) => {
//   token = userToken;
// };
// export const instanceWithoutAuth = async (option: RawAxiosRequestConfig) => {
//   try {
//     const API = axios.create({
//       baseURL: BASE_URL,
//     });

//     const APIClient = await API(option);
//     console.log('success');

//     return APIClient.data;
//   } catch (e: any) {
//     attemptCount++;
//     return onError(e, option);
//   }
// };
// const onError = async (error: any, option: RawAxiosRequestConfig) => {
//   if (error.response && error.response.status === 401) {
//     const errorData = error.response.data;

//     if (
//       errorData.error &&
//       errorData.error.includes('JWT expired at') &&
//       errorData.error.includes('Allowed clock skew: 0 milliseconds')
//     ) {
//       try {
//         if (attemptCount < 3) {
//           const refreshedData = await failRefreshToken();

//           if (refreshedData) {
//             setEncryptedStorageData(USER_TOKEN, refreshedData.UserToken);
//             setEncryptedStorageData(REFRESH_TOKEN, refreshedData.RefreshToken);
//             const APIClient: any = await instanceWithAuth(option);
//             return APIClient.data;
//           } else {
//             throw new Error('Token refresh failed. Please log in again.');
//           }
//         }
//       } catch (refreshError) {
//         attemptCount++;
//         throw new Error(
//           'An unexpected error occurred. Please try again later.',
//         );
//       }
//     } else {
//       throw error;
//     }
//   } else {
//     throw error;
//   }
// };

// export const instanceWithAuth = async (option: RawAxiosRequestConfig) => {
//   try {
//     const API = axios.create({
//       baseURL: BASE_URL,
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const APIClient = await API(option);

//     return APIClient.data;
//   } catch (e: any) {
//     return onError(e, option);
//   }
// };
