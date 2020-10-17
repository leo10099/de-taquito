import axios, { AxiosInstance } from "axios";
import store from "store";
import Connection, { ConnectionStatus } from "features/Connection/Connection.reducer";

const Api: AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	withCredentials: true,
});

Api.interceptors.response.use(
	response => response,
	async error => {
		if (error.message === "Network Error") {
			const { connection } = store.getState();

			if (connection.status !== ConnectionStatus.down)
				store.dispatch(Connection.actions.setConnectionState(ConnectionStatus.down));
		}

		if (error.response?.status === 401) {
			if (window.location.pathname !== "/auth/login") window.location.assign("/auth/login");
		}
		return error;
	}
);

const setAccessTokenInCommonHeaders = (): boolean => {
	const token = process.env.REACT_APP_JWT_TOKEN;
	if (!token) {
		return false;
	}

	Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	return true;
};

const updateAccessTokenInCommonHeaders = (newToken: string): void => {
	Api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
};

export { Api, setAccessTokenInCommonHeaders, updateAccessTokenInCommonHeaders };
