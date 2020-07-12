export interface BaseAction {
	type: string;
	payload?: any;
}
export interface StoreSliceAction {
	data?: any;
	loading: boolean;
	error: any;
	success?: boolean;
}

export interface LoginData {
	email: string;
	secret: string;
}

export interface Validation {
	callback: Function;
	errorMsg: string;
}

export interface SuccessfulAuthenticationPayload {
	id: number;
	alias: string;
	avatar: string;
	email: string;
	accessToken: string;
	acessTokenExpiry: string;
}
