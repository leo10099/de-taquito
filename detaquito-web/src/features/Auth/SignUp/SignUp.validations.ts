export default {
	email: {
		required: "Debes ingresar un e-mail",
		maxLength: "El e-mail no puede tener más de 50 caracteres",
		pattern: "Debes ingresar un e-mail válido",
	},
	alias: {
		required: "Debes ingresar un nombre de usuario",
		maxLength: "El nombre de usaurio no puede tener más de 50 caracteres",
	},
	password: {
		required: "Debes ingresar una contraseña",
		minLength: "La contraseña debe tener al menos 6 caracteres",
		maxLength: "La contraseña no puede tener más de 50 caracteres",
	},
	confirmPassword: {
		required: "Debes repetir la contraseña",
		matchPassword: "La contraseña y la confirmación no coinciden",
		minLength: "La contraseña debe tener al menos 6 caracteres",
	},
};
