import React from "react";
import styled from "styled-components/macro";
import { keyframes } from "style";

interface SpinnerProps {
	color?: string;
	size?: number;
	sizeUnit?: string;
}

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

const EllipsisSpinner = styled.div<SpinnerProps>`
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

const Loader = ({ color = "#BDBDBD", size = 10, sizeUnit = "px" }: SpinnerProps) => (
	<EllipsisSpinner color={color} size={size} sizeUnit={sizeUnit}>
		<div />
		<div />
		<div />
		<div />
	</EllipsisSpinner>
);

export default React.memo(Loader);
