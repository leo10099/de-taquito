import React, { CSSProperties, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import {
	FaGoogle,
	FaGooglePlus,
	FaInfoCircle,
	FaCheckCircle,
	FaExclamationTriangle,
	FaTimes,
} from 'react-icons/fa';

// Typings
import { IconTypes } from 'typings';

// Styles
import { gray } from 'theme/Theme';

// Selectors
import { selectCurrentTheme } from 'features/Layout/Layout.selector';

type IconProps = {
	height?: string;
	isPointer?: boolean;
	onClick?: () => void;
	positionRight?: string;
	positionTop?: string;
	size?: number;
	type: 'Google' | 'GooglePlus' | 'Exclamation' | 'Check' | 'Info' | 'Close';
	width?: string;
};

export const Icon: React.FC<IconProps> = ({
	isPointer,
	height,
	onClick,
	positionRight,
	positionTop,
	size,
	type,
	width,
}: IconProps) => {
	//Selectors
	const theme = useSelector(selectCurrentTheme);

	// Helpers
	const fill = useMemo(() => (theme === 'dark' ? gray.gray700 : gray.gray100), [theme]);
	const iconStyles = useMemo((): CSSProperties => {
		return {
			width: width,
			position: 'relative',
			right: positionRight,
			top: positionTop,
			height: height,
		};
	}, [height, positionRight, positionTop, width]);

	if (type === 'GooglePlus') {
		return (
			<FaGooglePlus
				cursor={isPointer ? 'pointer' : 'default'}
				fill={fill}
				onClick={onClick}
				size={size}
				style={iconStyles}
			/>
		);
	}

	if (type === 'Close') {
		return (
			<FaTimes
				cursor={isPointer ? 'pointer' : 'default'}
				fill={fill}
				onClick={onClick}
				size={size}
				style={iconStyles}
			/>
		);
	}

	if (type === 'Check') {
		return (
			<FaCheckCircle
				cursor={isPointer ? 'pointer' : 'default'}
				fill={fill}
				onClick={onClick}
				size={size}
				style={iconStyles}
			/>
		);
	}

	if (type === 'Exclamation') {
		return (
			<FaExclamationTriangle
				cursor={isPointer ? 'pointer' : 'default'}
				fill={fill}
				onClick={onClick}
				size={size}
				style={iconStyles}
			/>
		);
	}

	if (type === 'Info') {
		return (
			<FaInfoCircle
				cursor={isPointer ? 'pointer' : 'default'}
				fill={fill}
				onClick={onClick}
				size={size}
				style={iconStyles}
			/>
		);
	}

	return (
		<FaGoogle
			cursor={isPointer ? 'pointer' : 'default'}
			fill={fill}
			onClick={onClick}
			size={size}
			style={iconStyles}
		/>
	);
};

Icon.propTypes = {
	height: PropTypes.string,
	isPointer: PropTypes.bool,
	onClick: PropTypes.func,
	positionRight: PropTypes.string,
	positionTop: PropTypes.string,
	size: PropTypes.number,
	type: PropTypes.oneOf([
		IconTypes.GOOGLE,
		IconTypes.GOOGLE_PLUS,
		IconTypes.CHECK,
		IconTypes.CLOSE,
		IconTypes.EXCLAMATION,
		IconTypes.INFO,
	]).isRequired,
	width: PropTypes.string,
};

Icon.defaultProps = {
	height: 'auto',
	isPointer: false,
	onClick: () => {},
	positionRight: '0px',
	positionTop: '0px',
	size: 16,
	width: 'auto',
};

Icon.displayName = 'Icon';
