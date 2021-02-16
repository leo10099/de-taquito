import React, { useMemo } from "react";
import styled from "styled-components/macro";
import Spinner from "./Spinner";
import { useTheme } from "hooks";
import { Theme, gray, primary } from "theme";

interface ButtonProps {
	children: string | React.ReactChild;
	icon?: React.ReactElement;
	isBlock?: boolean;
	isDisabled?: boolean;
	isLoading?: boolean;
	margin?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	rounded?: boolean;
	size?: string;
	type?: "button" | "submit" | "reset" | undefined;
	variant: Variants;
}

type Variants = "default" | "primary" | "primary_ghost";
enum Variant {
	DEFAULT = "default",
	PRIMARY = "primary",
	PRIMARY_GHOST = "primary_ghost",
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
const PrimaryButton = styled(BaseButton).attrs((props: ButtonProps) => ({
	type: props.type,
}))<ButtonProps>`
	background-color: ${({ theme }) =>
		theme.name === "dark" ? theme.primaryLight : theme.primaryMain};
	border-radius: ${({ rounded }) => (rounded ? "20px" : "4px")};
	color: ${({ theme }) => theme.elevation1};
	height: 4.8rem;
	letter-spacing: 0.6px;

	svg {
		display: inline-block;
		fill: ${({ theme }) => theme.elevation1};
		height: 18px;
		margin-right: 8px;
		position: relative;
		vertical-align: text-top;
		width: 18px;
	}

	&:disabled {
		background-color: ${({ theme }) =>
			theme.name === Theme.DARK ? theme.elevation5 : theme.elevation3};
		box-shadow: none;
		color: ${({ theme }) => (theme.name === Theme.DARK ? theme.elevation7 : theme.elevation4)};
		cursor: default;
		opacity: ${({ theme }) => (theme.name === Theme.DARK ? 0.4 : 0.9)};
		transform: none;
		transition: 300ms all ease-in-out;
	}
`;

const PrimaryGhost = styled(PrimaryButton)`
	background: transparent;
	border: 0;
	box-shadow: none;
	outline: 0;

	&:hover {
		background-color: ${({ theme }) =>
			theme.name === Theme.DARK ? gray.gray700 : primary.primary050};
		cursor: pointer;
		transform: none;
	}

	&:active {
		border-style: solid;
		box-shadow: none;
		transform: translateY(0.5px);
	}

	a:hover {
		color: ${primary.primary400};
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
	size = "normal",
	type,
	variant,
}) => {
	const [currentTheme] = useTheme();

	const spinnerColor = useMemo(() => {
		if (variant === Variant.PRIMARY) {
			return currentTheme === Theme.DARK ? gray.gray800 : gray.gray200;
		}
		return gray.gray300;
	}, [currentTheme, variant]);

	const buttonContent = useMemo(() => {
		if (isLoading) return <Spinner color={spinnerColor} size={2} sizeUnit="px" />;
		if (icon) {
			return (
				<span>
					{icon}
					{children}
				</span>
			);
		}

		return children;
	}, [children, icon, isLoading, spinnerColor]);

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
		case Variant.PRIMARY_GHOST:
			return (
				<PrimaryGhost
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
				</PrimaryGhost>
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
