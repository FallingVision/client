import axios, { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
// cookie
// import cookie from 'react-cookies';

export const cancelToken = axios.CancelToken;
export const { isCancel } = axios;

interface PostRequestData {
	config: AxiosRequestConfig | null;
	method: string | null;
}

const postData: PostRequestData = {
	config: null,
	method: null,
};

const axiosInstance = axios.create({
	/* product mode (ec2 api server endpoint) */
	// baseURL: 'http://18.118.222.24:5000',

	// [Nest Server]
	// baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
	// baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000',
	// baseURL: 'http://10.0.2.2:5000',
	// baseURL: '10.0.2.2:8081',
	baseURL: 'http://192.168.101.35:5000',

	// [Flask Server] Emulator
	// baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:2431' : 'http://localhost:2431',
	// baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:2431' : 'http://localhost:2431',

	// [Flask Server] Physical Device
	// baseURL: 'http://localhost:5000',
	timeout: 3600,
});

const setAxiosHeaders = (key: string, accessToken: string | null): void => {
	axiosInstance.defaults.headers.common[key.toLocaleLowerCase()] = accessToken;
};

/* axios 객체 request 를 가져와 하단 로직 수행 후 flow 재 실행 */
axiosInstance.interceptors.request.use(
	config => {
		return config;
	},
	/* request Error 작업 */
	err => {
		console.log('[axios request Interceptor ... ] : Error ');
		return err;
	},
);

/* axios 객체 response 를 가져와 하단 로직 수행 후 flow 재 실행 */
axiosInstance.interceptors.response.use(
	/* resonse Conifg 작업 */
	config => config,
	/* resonse Error 작업 */
	async err => {
		// console.log('[axios response Interceptor ... ]');

		if (err.response) {
			const errorState = err.response.status;

			/* JWT Expierd , 토큰 만료 에러시 리프레쉬 토큰을 사용해 엑세스 토큰 재발급 요청 로직 수행 시작 */
			if (errorState === 401) {
				console.log('[Error : UnAuthorization ... ]', err.response.status);
			}
		}

		return err;
	},
);

export default {
	axiosInstance,
	setAxiosHeaders,
};
