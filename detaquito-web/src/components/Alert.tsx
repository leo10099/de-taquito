import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useWindowWidth } from "@react-hook/window-size";

// Selectors
import {
	selectNotificationStatus,
	selectNotificationType,
	selectNotificationText,
} from "features/Notification/Notification.selector";

// Notification Slice
import Notification from "features/Notification/Notification.reducer";

// Components
import { CloseIcon } from "./Icon";

// Typings
import { AlertType } from "typings";

// Styles
import styled, { css, keyframes } from "styled-components/macro";

// Element to mount the alert on
const domElement = document.getElementById("alert") as HTMLElement;

// Config Options
const notificationDuration = 7000;

type AlertComponentProps = {
	closeHandler: () => void;
	icon?: React.ReactNode;
	isOpen: boolean;
	text: string;
	type: "error" | "info" | "success";
	width: number;
};

type BoxProps = {
	width: number;
};

const mobileAnimation = keyframes`
		0% {
			opacity: 0;
			transform: translateY(1000px);
		}
		10% {
			opacity: 1;
			transform: translateY(0px);
		}
		90% {
			opacity: 1;
			transform: translateY(2px);
		}
		100% {
			opacity: 0;
			transform: translateY(1000px);
		}
`;

const desktopAnimation = keyframes`
		0% {
			opacity: 0;
			transform: translateX(1000px);
		}
		20% {
			opacity: 1;
			transform: translateX(-24px);
		}
		80% {
			opacity: 1;
			transform: translateX(-26px);
		}
		100% {
			opacity: 0;
			transform: translateX(1000px);
		}
`;

const BaseBox = styled.span<BoxProps>`
	animation: ${({ width }) =>
		width > 768
			? css`
					${desktopAnimation} ${notificationDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
			  `
			: css`
					${mobileAnimation} ${notificationDuration}ms ease-in forwards;
			  `};
	align-items: center;
	border-radius: ${({ width }) => (width > 768 ? "4px" : "0px")};
	box-shadow: ${({ theme }) => theme.shadowElevation4};
	color: ${({ theme }) => (theme.name === "dark" ? theme.elevation2 : theme.elevation1)};
	display: flex;
	font-weight: 600;
	justify-content: center;
	letter-spacing: 0.1rem;
	min-width: 320px;
	padding: 1.2rem 1.5rem;
	position: fixed;
	height: fit-content;
	right: 0;
	${({ width }) =>
		width > 768
			? css`
					top: 20px;
			  `
			: css`
					bottom: 0px;
					width: 100vw;
			  `}
`;

const InfoAlert = styled(BaseBox)`
	background-color: ${({ theme }) => theme.secondaryMain};
`;

const SuccessAlert = styled(BaseBox)`
	background-color: ${({ theme }) => theme.success};
`;

const ErrorAlert = styled(BaseBox)`
	background-color: ${({ theme }) => theme.error};
`;

const Content = styled.div<BoxProps>`
	display: flex;
	justify-content: center;
	font-size: 1.5rem;
	align-items: center;
	line-break: normal;
	margin: 0.5rem 1rem;
	max-width: ${({ width }) => (width < 768 ? "300px" : "500px")};
	text-align: center;
`;

const AlertComponent: React.FC<AlertComponentProps> = ({
	closeHandler,
	icon,
	isOpen,
	text,
	type,
	width,
}) => {
	if (!isOpen) return null;

	if (type === AlertType.error) {
		return (
			<ErrorAlert width={width}>
				<CloseIcon onClick={closeHandler} className="pointer" />
				<Content width={width}>
					{text}
					{icon}
				</Content>
			</ErrorAlert>
		);
	}

	if (type === AlertType.success) {
		return (
			<SuccessAlert width={width}>
				<CloseIcon onClick={closeHandler} className="pointer" />
				<Content width={width}>
					{text}
					{icon}
				</Content>
			</SuccessAlert>
		);
	}

	return (
		<InfoAlert width={width}>
			<CloseIcon className="pointer" />
			<Content width={width}>
				{text}
				{icon}
			</Content>
		</InfoAlert>
	);
};

const Alert: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();
	const width = useWindowWidth();

	// Selectors
	const type = (useSelector(selectNotificationType) as AlertComponentProps["type"]) || "info";
	const text = useSelector(selectNotificationText);
	const isOpen = useSelector(selectNotificationStatus);

	// Handlers
	const closeHandler = () => dispatch(Notification.actions.closeAlert());

	//Effects
	useEffect(() => {
		if (isOpen) {
			const timeOut = setTimeout(() => {
				dispatch(Notification.actions.closeAlert());
			}, notificationDuration);
			return () => clearTimeout(timeOut);
		}
		return () => {};
	}, [dispatch, isOpen]);

	return ReactDOM.createPortal(
		<AlertComponent
			isOpen={isOpen}
			text={text}
			type={type}
			width={width}
			closeHandler={closeHandler}
		/>,
		domElement
	);
};

export default React.memo(Alert);
