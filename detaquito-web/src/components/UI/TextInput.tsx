import React, { CSSProperties, forwardRef, RefObject } from "react";
import styled from "styled-components/macro";

// Components
import Tooltip from "rc-tooltip";

// Theme
import { gray } from "theme";

// Hooks
import { useWindowWidth } from "@react-hook/window-size";

// Typings
import { Theme } from "theme";

// Helpers
import { FlexRowCentered } from "utils/styles";

// Assets
import { FaQuestionCircle } from "react-icons/fa";

type TextInputBaseProps = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

type TextInputCustomProps = {
	errorMessage?: string;
	hasError?: boolean;
	id?: string;
	isFullWidth?: boolean;
	label?: string;
	tooltipText?: string;
};

type IconContainerProps = {
	hasError?: boolean;
};

const TextInputContainer = styled.div<TextInputCustomProps>`
	${FlexRowCentered()};
	flex-wrap: wrap;
	height: 100%;
	justify-content: space-between;
	position: relative;

	width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "50%")};

	@media screen and (max-width: 320px) {
		width: 240px;
	}
`;

const Input = styled.input<TextInputCustomProps>`
	background: inherit;
	border-color: ${({ hasError, theme }) => {
		return hasError ? theme.error : theme.primaryLight;
	}};
	border-radius: 4px;
	border-style: solid;
	border-width: 2px;
	box-shadow: ${({ hasError, theme }) => {
		return hasError ? theme.errorShadowElevation3 : theme.shadowElevation1;
	}};
	color: ${({ theme }) => theme.elevation7};
	height: 4.8rem;
	outline: 0;
	margin-bottom: 2rem;
	padding: 0 2rem 0 1rem;
	position: relative;
	transition: 400ms all ease;
	width: ${({ tooltipText }) => (tooltipText ? "90%" : "100%")};

	&::placeholder {
		color: ${({ theme }) => (theme.name === Theme.DARK ? theme.elevation5 : theme.elevation4)};
	}
`;

export const Label = styled.label.attrs(({ id }) => ({
	htmlFor: id,
	id: `${id}-Label`,
}))`
	color: ${({ theme }) => theme.elevation6};
	font-size: 1.1em;
	letter-spacing: 1.1px;
	padding-bottom: 10px;
`;

export const ErrorMessage = styled.p<TextInputCustomProps>`
	color: ${props => props.theme.error};
	letter-spacing: 0.5px;
	margin-top: -1rem;
	margin-bottom: 2rem;
	text-align: left;
	font-size: 75%;
	font-weight: bold;
	line-height: 1.5em;
	visibility: ${({ hasError }) => (hasError ? "visible" : "hidden")};
`;

export const tooltipOverlayInnerStyle: CSSProperties = {
	textAlign: "center",
	letterSpacing: "1px",
	fontWeight: 600,
	backgroundColor: gray.gray600,
};

export const tooltipOverlayStyle: CSSProperties = {
	maxWidth: "200px",
	width: "100%",
};

export const IconContainer = styled.span<IconContainerProps>`
	position: absolute;
	top: 47%;
	right: 0;
`;

const TextInput = forwardRef<HTMLInputElement, TextInputBaseProps & TextInputCustomProps>(
	(
		{ hasError = false, isFullWidth = true, errorMessage, label, type, id, tooltipText, ...props },
		ref
	) => {
		const windowWidth = useWindowWidth();

		return (
			<TextInputContainer isFullWidth={isFullWidth}>
				<Label id={id}>{label}</Label>
				<Input
					{...props}
					autoComplete={type === "password" ? "none" : ""}
					type={type}
					hasError={hasError}
					id={id}
					ref={ref as RefObject<HTMLInputElement>}
					tooltipText={tooltipText}
				/>

				{tooltipText && (
					<Tooltip
						placement={windowWidth < 768 ? "left" : "top"}
						trigger={windowWidth < 768 ? "click" : "hover"}
						overlayStyle={tooltipOverlayStyle}
						overlayInnerStyle={tooltipOverlayInnerStyle}
						overlay={tooltipText}
					>
						<IconContainer hasError={hasError}>
							<FaQuestionCircle fill={gray.gray300} size={20} />
						</IconContainer>
					</Tooltip>
				)}

				<ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>
			</TextInputContainer>
		);
	}
);

TextInput.displayName = "TextInput";

export default React.memo(TextInput);
