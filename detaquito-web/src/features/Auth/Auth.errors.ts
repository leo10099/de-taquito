const conflictingEmail = {
	message: "USER_ERROR_EMAIL_EXISTS",
	friendlyMessage: "El email que ingresaste ya se encuentra en uso.",
};
const conflictingAlias = {
	message: "USER_ERROR_ALIAS_EXISTS",
	friendlyMessage: "El nombre de usuario que ingresaste ya se encuentra en uso.",
};
const conflictUserAlreadyRegisteredWithGoogle = {
	message: "USER_ERROR_ALREADY_REGISTERED_WITH_GOOGLE",
	friendlyMessage:
		"Este e-mail ya está asociado a una cuenta. Si te pertenece, por favor ingresa al sitio con Google.",
};
const userShouldAuthenticateWithGoogle = {
	message: "USER_SHOULD_AUTHENTICATE_WITH_GOOGLE",
	friendlyMessage: "Debes ingresar con Google",
};
export const incorrectCredentials = {
	message: "Unauthorized",
	friendlyMessage: "E-mail o contraseña inválida. Intenta nuevamente.",
};

export {
	conflictingAlias,
	conflictingEmail,
	conflictUserAlreadyRegisteredWithGoogle,
	userShouldAuthenticateWithGoogle,
};
