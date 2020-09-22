import React, { useMemo } from "react";
import styled from "styled-components/macro";
import Spinner from "./Spinner";
import { useTheme } from "hooks";
import { Theme, gray } from "theme";

interface ButtonProps {
	children: string | React.ReactChild;
	icon?: "Google" | "GooglePlus";
	isBlock?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
	margin?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	rounded?: boolean;
	size: string;
	type?: "button" | "submit" | "reset" | undefined;
	variant: Variants;
}

type Variants = "default" | "primary";
enum Variant {
	DEFAULT = "default",
	PRIMARY = "primary",
}

const BaseButton = styled.button.attrs((props: ButtonProps) => ({ type: props.type }))<ButtonProps>`
	border-radius: ${({ rounded }) => (rounded ? "10px" : "4px")};
	border: 0;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
	font-size: 1.4rem;
	font-weight: 600;
	margin: ${({ margin }) => (margin ? margin : "auto")};
	padding: 0.8rem 2rem;
	transform: translate(0);
	transition: all 200ms ease-in;
	width: ${({ isBlock }) => (isBlock ? "100%" : "fit-content")};

	&:hover {
		cursor: pointer;
		transform: translateY(-1.5px);
	}

	&:active {
		border-style: solid;
		box-shadow: ${({ theme }) => theme.shadowElevation4};
		transform: translateY(0.5px);
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
		theme.name === "dark" ? theme.primaryLight : theme.primaryMain};
	border-radius: ${({ rounded }) => (rounded ? "20px" : "4px")};
	color: ${({ theme }) => theme.elevation1};
	height: 4.8rem;
	letter-spacing: 0.6px;

	&:disabled {
		background-color: ${({ theme }) =>
			theme.name === "dark" ? theme.elevation5 : theme.elevation3};
		box-shadow: none;
		color: ${({ theme }) => (theme.name === "dark" ? theme.elevation7 : theme.elevation4)};
		cursor: default;
		opacity: ${({ theme }) => (theme.name === "dark" ? 0.4 : 0.9)};
		transform: none;
		transition: 300ms all ease-in-out;
	}
`;

const Button: React.FC<ButtonProps> = ({
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
}) => {
	const [currentTheme] = useTheme();

	const spinnerColor = useMemo(() => {
		if (variant === Variant.PRIMARY) {
			return currentTheme === Theme.DARK ? gray.gray600 : gray.gray300;
		}
		return gray.gray300;
	}, [currentTheme, variant]);

	const buttonContent = useMemo(() => {
		if (isLoading) return <Spinner color={spinnerColor} />;
		if (icon)
			return (
				<>
					{/* <Icon type={icon} /> */}
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
					{buttonContent}
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
					{buttonContent}
				</BaseButton>
			);
	}
};

export default React.memo(Button);
