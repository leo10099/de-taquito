import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styles';

// Components
import { Icon, Loader } from 'components';

// Typings
import { IconTypes } from 'typings';

type Variants = 'default' | 'primary';
enum Variant {
	DEFAULT = 'default',
	PRIMARY = 'primary',
}

interface ButtonProps {
	children: string | React.ReactChild;
	icon?: 'Google' | 'GooglePlus';
	isBlock?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
	margin?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	rounded?: boolean;
	size: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
	variant: Variants;
}

const BaseButton = styled.button.attrs((props: ButtonProps) => ({ type: props.type }))<ButtonProps>`
	border-radius: ${({ rounded }) => (rounded ? '10px' : '4px')};
	border: 0;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
	font-size: 1.4rem;
	font-weight: 600;
	margin: ${({ margin }) => (margin ? margin : 'auto')};
	outline: 0;
	padding: 0.8rem 2rem;
	transform: translate(0);
	transition: all 200ms ease-in;
	width: ${({ isBlock }) => (isBlock ? '100%' : 'fit-content')};

	&:hover {
		cursor: pointer;
		transform: translateY(-1.5px);
	}

	&:active {
		border-style: solid;
		transform: translateY(0.5px);
		box-shadow: ${({ theme }) => theme.shadowElevation4};
	}

	&:disabled {
		transform: none;
	}
`;

// Variants
const PrimaryButton = styled(BaseButton).attrs((props: ButtonProps) => ({ type: props.type }))<
	ButtonProps
>`
	background-color: ${({ theme }) =>
		theme.name === 'dark' ? theme.primaryLight : theme.primaryMain};
	border-radius: ${({ rounded }) => (rounded ? '20px' : '4px')};
	color: ${props => props.theme.elevation1};
	height: 4.8rem;
	letter-spacing: 0.6px;

	&:disabled {
		cursor: default;
		opacity: ${({ theme }) => (theme.name === 'dark' ? 0.4 : 0.9)};
		background-color: ${({ theme }) =>
			theme.name === 'dark' ? theme.elevation5 : theme.elevation3};
		color: ${({ theme }) => (theme.name === 'dark' ? theme.elevation7 : theme.elevation4)};
		box-shadow: none;
		transform: none;
		transition: 300ms all ease-in-out;
	}
`;

export const Button: React.FC<ButtonProps> = React.memo(function Button({
	children,
	icon,
	isBlock,
	isLoading,
	isDisabled,
	margin,
	onClick,
	rounded,
	size,
	type,
	variant,
}: ButtonProps) {
	const buildButtonContent = useCallback(() => {
		if (isLoading) return <Loader />;
		if (icon)
			return (
				<>
					<Icon type={icon} />
					{children}
				</>
			);
		return children;
	}, [children, icon, isLoading]);

	switch (variant) {
		case Variant.PRIMARY:
			return (
				<PrimaryButton
					disabled={isDisabled}
					icon={icon}
					isBlock={isBlock}
					isLoading={isLoading}
					margin={margin}
					onClick={onClick}
					rounded={rounded}
					size={size}
					type={type}
					variant={variant}
				>
					{buildButtonContent()}
				</PrimaryButton>
			);
		default:
			return (
				<BaseButton
					disabled={isDisabled}
					icon={icon}
					isBlock={isBlock}
					isLoading={isLoading}
					margin={margin}
					onClick={onClick}
					rounded={rounded}
					size={size}
					type={type}
					variant={variant}
				>
					{buildButtonContent()}
				</BaseButton>
			);
	}
});

// Display Names
PrimaryButton.displayName = 'PrimaryButton';
BaseButton.displayName = 'BaseButton';

// PropTypes
Button.propTypes = {
	isBlock: PropTypes.bool,
	icon: PropTypes.oneOf([IconTypes.GOOGLE, IconTypes.GOOGLE_PLUS]),
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	margin: PropTypes.string,
	onClick: PropTypes.func,
	rounded: PropTypes.bool,
	size: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	variant: PropTypes.oneOf([Variant.DEFAULT, Variant.PRIMARY]).isRequired,
};

// Default Props
Button.defaultProps = {
	isBlock: false,
	icon: undefined,
	isDisabled: false,
	isLoading: false,
	margin: '',
	onClick: () => null,
	rounded: false,
	type: 'button',
	variant: Variant.DEFAULT,
};
