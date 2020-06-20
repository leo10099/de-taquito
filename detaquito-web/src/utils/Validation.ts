export const isEmail = (email: string): boolean => {
	const emailRegExp = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegExp.test(String(email).toLowerCase());
};

export const isWithinAllowedMaxLength = (testingTarget: string, maxLength = 50): boolean => {
	return testingTarget.length <= maxLength;
};

export const isWithinAllowedMinLength = (testingTarget: string, minLength = 2): boolean => {
	return testingTarget.length >= minLength;
};
