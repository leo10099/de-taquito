import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styles';

// Element to mount the spinner on
const domElement = document.getElementById('spinner') as HTMLElement;

const Spinner = styled.svg`
	animation: rotate 1s linear infinite;
	height: 50px;
	width: 50px;

	& .path {
		stroke: ${({ theme }) => theme.primaryMain};
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}

	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

const Backdrop = styled.div`
	align-items: center;
	background-color: ${({ theme }) => (theme.name === 'dark' ? theme.elevation5 : theme.elevation2)};
	display: flex;
	height: 100%;
	justify-content: center;
	opacity: 0.9;
	pointer-events: none;
	position: fixed;
	top: 0;
	width: 100%;
`;

export const FullScreenSpinner = () => {
	return ReactDOM.createPortal(
		<Backdrop>
			<Spinner>
				<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
			</Spinner>
		</Backdrop>,
		domElement
	);
};
