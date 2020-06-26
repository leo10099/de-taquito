// Typings
import { Validation } from 'typings';

// Helpers
import { isEmail, isWithinAllowedMaxLength, isWithinAllowedMinLength } from 'utils';

export const emailValidation: Validation[] = [
	{ callback: isEmail, errorMsg: 'Debes ingresar un email válido' },
	{
		callback: isWithinAllowedMaxLength,
		errorMsg: 'El email no puede tener más de 50 caracteres',
	},
];

export const aliasValidation: Validation[] = [
	{
		callback: isWithinAllowedMaxLength,
		errorMsg: 'Tu nombre de usuario no puede tener más de 50 caracteres',
	},
];

export const passwordValidation: Validation[] = [
	{
		callback: (value: string) => isWithinAllowedMinLength(value, 6),
		errorMsg: 'La contraseña debe tener al menos 6 caracteres',
	},
];
