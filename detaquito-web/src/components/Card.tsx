import React, { ReactNode } from "react";
import styled from "styled-components/macro";

// Helpers
import { FlexColumn } from "utils/styles";

interface CardProps {
	children: ReactNode;
	footer?: ReactNode;
	subTitle?: string;
	title?: string;
	vw?: number;
}

const CardContainer = styled.div<CardProps>`
	background: ${({ theme }) => theme.elevation1};
	border-radius: 0.5rem;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
	position: relative;
	padding: 1rem;
	width: calc(100vw - 20px);

	@media screen and (min-width: 768px) {
		padding: 3rem;
		width: 500px;
	}
`;

const Header = styled.header<CardProps>`
	margin-top: 2rem;
	text-align: center;
`;

const Title = styled.h2`
	font-size: 3.5rem;
	font-weight: 400;
	letter-spacing: 1px;
`;

const SubTitle = styled.h3`
	color: ${({ theme }) => theme.elevation6};
	font-size: 1.7rem;
	font-weight: normal;
	letter-spacing: 1px;
	margin-top: 1.4rem;
`;

const CardContent = styled.div`
	${FlexColumn()};
	justify-content: space-around;
	height: 100%;
	padding: 2rem;
`;

const CardFooter = styled.footer`
	text-align: center;
	margin-bottom: 1.5rem;
`;

const Card: React.FC<CardProps> = ({ children, title, subTitle, footer }) => {
	return (
		<CardContainer id="Card">
			{title && (
				<Header>
					<Title>{title}</Title>
					{subTitle && <SubTitle>{subTitle}</SubTitle>}
				</Header>
			)}
			<CardContent>{children}</CardContent>
			{footer && <CardFooter>{footer}</CardFooter>}
		</CardContainer>
	);
};

export default React.memo(Card);
