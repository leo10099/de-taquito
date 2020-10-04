export interface SuccessfulAuthenticationPayload {
	id: number;
	alias: string;
	avatar: string;
	email: string;
	accessToken: string;
	acessTokenExpiry: string;
}

export interface SignUpFormData {
	email: string;
	alias: string;
	password: string;
	passwordConfirm: string;
}
