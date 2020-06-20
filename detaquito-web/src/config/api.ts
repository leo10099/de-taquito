import axios, { AxiosInstance } from 'axios';

const Api: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	withCredentials: true,
});

Api.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			console.log(error.response);
			if (window.location.pathname !== '/login') window.location.assign('/login');
		}
		return error;
	}
);

const setAccessTokenInCommonHeaders = (): boolean => {
	const token = process.env.REACT_APP_JWT_TOKEN;
	if (!token) {
		return false;
	}

	Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

	return true;
};

const updateAccessTokenInCommonHeaders = (newToken: string): void => {
	Api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
};

export { Api, setAccessTokenInCommonHeaders, updateAccessTokenInCommonHeaders };
