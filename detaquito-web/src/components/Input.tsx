import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';

// Hooks
import { useWindowWidth } from '@react-hook/window-size';

// Typings
import { Theme } from 'typings';

// Styles
import styled from 'styles';
import { gray } from 'theme/Theme';

// Components
import Tooltip from 'rc-tooltip';

// Assets
import { FaQuestionCircle } from 'react-icons/fa';

type BaseInputProps = {
	hasError: boolean;
	id: string;
	isBlock?: boolean;
	label?: string;
	name: string;
	onBlur?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
	onChange: any;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<EventTarget & HTMLInputElement>) => void;
	placeholder?: string;
	tooltipText?: string;
	type: string;
	variant?: 'basic' | 'withTooltip';
	value?: number | string | undefined;
	width?: string;
};

type ErrorMessageProps = {
	hasError?: boolean;
	errorMessage?: string;
};

type InputContainerProps = {
	isBlock?: boolean;
	width?: string;
	windowWidth: number;
};

type IconContainerProps = {
	hasError: boolean;
};

type InputProps = BaseInputProps & ErrorMessageProps;

const InputContainer = styled.div<InputContainerProps>`
	align-content: center;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	justify-content: space-between;
	width: ${({ width, windowWidth }) => (windowWidth < 321 ? '240px' : width)};

	&:not(:first-child) {
		margin: 2rem auto;
	}
`;

const BaseInput = styled.input<InputProps>`
	background: inherit;
	border-color: ${({ hasError, theme }) => {
		return hasError ? theme.error : theme.primaryLight;
	}};
	border-radius: 4px;
	border-style: solid;
	border-width: 1.4px;
	box-shadow: ${({ hasError, theme }) => {
		return hasError ? theme.errorShadowElevation1 : theme.shadowElevation1;
	}};
	color: ${({ theme }) => theme.elevation7};
	font-size: 1.7rem;
	height: 4.8rem;
	outline: 0;
	padding: 0 2rem 0 1rem;
	position: relative;
	transition: 400ms all ease;
	width: ${({ variant }) => (variant === 'withTooltip' ? '90%' : '100%')};

	&::placeholder {
		color: ${({ theme }) => (theme.name === Theme.DARK ? theme.elevation5 : theme.elevation4)};
	}
`;

export const Label = styled.label.attrs(({ id }) => ({
	htmlFor: id,
}))`
	color: ${({ theme }) => theme.elevation6};
	font-size: 1.6rem;
	letter-spacing: 1.1px;
	padding-bottom: 10px;
`;

export const IconContainer = styled.span<IconContainerProps>`
	display: inline-block;
	top: ${({ hasError }) => (hasError ? '-42px' : '4px')};
`;

const ErrorMessage = styled.p<ErrorMessageProps>`
	color: ${props => props.theme.error};
	font-size: 1.4rem;
	letter-spacing: 0.5px;
	padding-top: 6px;
	text-align: left;
	visibility: ${({ hasError }) => (hasError ? 'visible' : 'hidden')};
`;

const tooltipOverlayInnerStyle: CSSProperties = {
	textAlign: 'center',
	letterSpacing: '1px',
	fontWeight: 600,
	backgroundColor: gray.gray600,
};

const tooltipOverlayStyle: CSSProperties = {
	maxWidth: '200px',
};

export const Input: React.FC<InputProps> = React.memo(function Input({
	errorMessage,
	hasError,
	id,
	isBlock,
	label,
	name,
	onBlur,
	onChange,
	onFocus,
	onKeyDown,
	tooltipText,
	placeholder,
	type,
	variant,
	value,
	width,
}: InputProps) {
	const windowWidth = useWindowWidth();

	if (variant === 'withTooltip') {
		return (
			<InputContainer isBlock={isBlock} width={width} windowWidth={windowWidth}>
				<Label id={id}>{label}</Label>
				<BaseInput
					autoComplete={type === 'password' ? 'new-password' : 'none'}
					hasError={hasError}
					id={id}
					isBlock={isBlock}
					name={name}
					onBlur={onBlur}
					onChange={onChange}
					onFocus={onFocus}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					type={type}
					value={value}
					variant={variant}
				/>

				<Tooltip
					placement={windowWidth < 768 ? 'left' : 'top'}
					trigger={['hover', 'click']}
					overlayStyle={tooltipOverlayStyle}
					overlayInnerStyle={tooltipOverlayInnerStyle}
					overlay={<span>{tooltipText}</span>}
				>
					<IconContainer hasError={hasError}>
						<FaQuestionCircle fill={gray.gray300} size={20} />
					</IconContainer>
				</Tooltip>

				{hasError && errorMessage && (
					<ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>
				)}
			</InputContainer>
		);
	}

	return (
		<InputContainer isBlock={isBlock} width={width} windowWidth={windowWidth}>
			<Label id={id}>{label}</Label>
			<BaseInput
				autoComplete={type === 'password' ? 'new-password' : 'none'}
				hasError={hasError}
				id={id}
				isBlock={isBlock}
				name={name}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				type={type}
				value={value}
				width={width}
			/>

			{hasError && errorMessage && <ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>}
		</InputContainer>
	);
});

// Display Names
Input.displayName = 'TextInput';
ErrorMessage.displayName = 'TextInputErrorMessage';
BaseInput.displayName = 'TextInputBaseInput';
InputContainer.displayName = 'TextInputInputContainer';
IconContainer.displayName = 'IconContainer';
Label.displayName = 'Input-Label';

// Prop Types
Input.propTypes = {
	errorMessage: PropTypes.string,
	hasError: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	isBlock: PropTypes.bool,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	onKeyDown: PropTypes.func,
	placeholder: PropTypes.string,
	tooltipText: PropTypes.string,
	type: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	variant: PropTypes.oneOf(['basic', 'withTooltip']),
	width: PropTypes.string,
};

// Default Props
Input.defaultProps = {
	errorMessage: '',
	isBlock: true,
	label: '',
	onBlur: () => null,
	onFocus: () => null,
	onKeyDown: () => null,
	placeholder: '',
	tooltipText: '',
	value: undefined,
	variant: 'basic',
	width: '100%',
};
