import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size';

// Icon
import { Icon } from 'components';

// Selectors
import {
	selectNotificationStatus,
	selectNotificationType,
	selectNotificationText,
} from 'features/Notification/Notification.selector';

// Notification Slice
import Notification from 'features/Notification/Notification.reducer';

// Typings
import { AlertType } from 'typings';

// Styles
import styled from 'styles';

// Element to mount the alert on
const domElement = document.getElementById('alert') as HTMLElement;

type AlertContainerProps = {
	closeHandler: () => void;
	isOpen: boolean;
	text: string;
	type: 'error' | 'info' | 'success';
	width: number;
};

type BoxProps = {
	width: number;
};

const BaseBox = styled.span<BoxProps>`
	align-items: center;
	border-radius: 4px;
	bottom: ${({ width }) => (width < 768 ? '0.5rem' : '1rem')};
	box-shadow: ${({ theme }) => theme.shadowElevation4};
	color: ${({ theme }) => (theme.name === 'dark' ? theme.elevation2 : theme.elevation1)};
	display: flex;
	font-weight: 600;
	justify-content: center;
	left: 50%;
	letter-spacing: 0.1rem;
	min-width: 320px;
	padding: 1.2rem 1.5rem;
	position: fixed;
	right: auto;
	transform: translate3d(-50%, 0, 0);
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
	justify-content: space-space-between;
	margin: 0.5rem 1rem;
	text-align: center;
	max-width: ${({ width }) => (width < 768 ? '300px' : '400px')};
`;

const Container: React.FC<AlertContainerProps> = ({ closeHandler, isOpen, text, type, width }) => {
	if (!isOpen) return null;

	if (type === AlertType.error) {
		return (
			<ErrorAlert width={width}>
				<Content width={width}>
					<Icon type="Exclamation" size={24} positionRight="1rem" positionTop="0px" />
					{text}
				</Content>
				<Icon
					isPointer
					onClick={closeHandler}
					positionRight="0px"
					positionTop="0px"
					size={20}
					type="Close"
				/>
			</ErrorAlert>
		);
	}

	if (type === AlertType.success) {
		return (
			<SuccessAlert width={width}>
				<Content width={width}>
					<Icon type="Check" size={24} positionRight="1rem" positionTop="0px" />
					{text}
				</Content>
				<Icon
					isPointer
					onClick={closeHandler}
					positionRight="0px"
					positionTop="0px"
					size={20}
					type="Close"
				/>
			</SuccessAlert>
		);
	}

	if (type === AlertType.info) {
		return (
			<InfoAlert width={width}>
				<Content width={width}>
					<Icon type="Info" size={24} positionRight="1rem" positionTop="0px" />
					{text}
				</Content>
				<Icon
					isPointer
					onClick={closeHandler}
					positionRight="0px"
					positionTop="0px"
					size={20}
					type="Close"
				/>
			</InfoAlert>
		);
	}

	return (
		<InfoAlert width={width}>
			<Content width={width}>{text}</Content>
			<Icon
				isPointer
				onClick={closeHandler}
				positionRight="0px"
				positionTop="0px"
				size={20}
				type="Close"
			/>
		</InfoAlert>
	);
};

export const Alert: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();
	const width = useWindowWidth();

	// Selectors
	const type = useSelector(selectNotificationType) as AlertContainerProps['type'];
	const text = useSelector(selectNotificationText);
	const isOpen = useSelector(selectNotificationStatus);

	// Handlers
	const closeHandler = () => dispatch(Notification.actions.closeAlert());

	//Effects
	useEffect(() => {
		if (isOpen) {
			const timeOut = setTimeout(() => {
				dispatch(Notification.actions.closeAlert());
			}, 15000);
			return () => clearTimeout(timeOut);
		}
		return () => {};
	}, [dispatch, isOpen]);

	return ReactDOM.createPortal(
		<Container isOpen={isOpen} text={text} type={type} width={width} closeHandler={closeHandler} />,
		domElement
	);
};

// Prop Types
Container.propTypes = {
	closeHandler: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	type: PropTypes.oneOf([AlertType.error, AlertType.success, AlertType.info]).isRequired,
	width: PropTypes.number.isRequired,
};

// Display Names
Alert.displayName = 'Alert';
BaseBox.displayName = 'Alert-BaseBox';
Container.displayName = 'Alert-Container';
Content.displayName = 'Alert-TextContent';
ErrorAlert.displayName = 'Alert-Error';
InfoAlert.displayName = 'Alert-Info';
SuccessAlert.displayName = 'Alert-Success';
