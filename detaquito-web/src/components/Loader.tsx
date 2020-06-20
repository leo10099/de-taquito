import React from 'react';
import styled, { keyframes } from 'styles';

type LoaderProps = {
	color?: string;
	size?: number;
	sizeUnit?: string;
};

const motion1 = () => keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const motion2 = () => keyframes`
   0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
`;
const motion3 = () => keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const EllipsisSpinner = styled.div<LoaderProps>`
	display: flex;
	height: 100%;
	height: calc(50% - 5px);
	left: calc(50% - 33px);
	position: relative;

	div {
		position: absolute;
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: ${p => p.color};
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	div:nth-child(1) {
		animation: ${() => motion1()} 0.6s infinite;
	}
	div:nth-child(2) {
		left: 6px;
		animation: ${() => motion2()} 0.6s infinite;
	}
	div:nth-child(3) {
		left: 26px;
		animation: ${() => motion2()} 0.6s infinite;
	}
	div:nth-child(4) {
		left: 45px;
		animation: ${() => motion3()} 0.6s infinite;
	}
`;

export const Loader = ({ color, size, sizeUnit }: LoaderProps) => (
	<EllipsisSpinner color={color} size={size} sizeUnit={sizeUnit}>
		<div />
		<div />
		<div />
		<div />
	</EllipsisSpinner>
);

Loader.defaultProps = {
	size: 10,
	color: '#E0E0E0',
	sizeUnit: 'px',
};
