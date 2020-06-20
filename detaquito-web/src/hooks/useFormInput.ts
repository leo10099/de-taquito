import { useCallback, useState } from 'react';

// Typings
import { Validation } from 'typings';

export const useFormInput = (initialValue: string, validation?: Validation[]) => {
	let validate;
	const [hasError, setHasError] = useState(false);
	const [inputValue, setInputValue] = useState(initialValue);
	const [errorMessage, setErrorMessage] = useState('');

	const resetError = (): void => {
		setErrorMessage('');
		setHasError(false);
	};

	const setError = (message: string): void => {
		if (message === '') {
			resetError();
			return;
		} else {
			setErrorMessage(message);
			setHasError(true);
			return;
		}
	};

	const setValue = useCallback(
		(e: React.ChangeEvent<any>) => {
			setErrorMessage('');
			setHasError(false);
			setInputValue(e.target.value);
			return;
		},
		[setInputValue]
	);

	if (validation) {
		validate = function (input: React.ChangeEvent<HTMLInputElement> | string) {
			let result;

			validation.forEach(({ callback: validationFunction, errorMsg }) => {
				if (typeof input === 'string' && validationFunction(input) === false) {
					result = false;
					setErrorMessage(errorMsg);
					return result;
				}
				if (typeof input !== 'string' && validationFunction(input.target.value) === false) {
					result = false;
					setErrorMessage(errorMsg);
				}
				return null;
			});
			result === false ? setHasError(true) : setHasError(false);
		};
	}

	return { inputValue, setValue, hasError, errorMessage, setError, validate };
};
