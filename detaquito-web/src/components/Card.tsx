import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import styled from 'styles';

// Hooks
import { useWindowWidth } from '@react-hook/window-size';

interface CardProps {
	children?: ReactNode;
	footer?: ReactNode;
	subTitle?: string;
	title?: string;
	vw?: number;
}

const Container = styled.div<CardProps>`
	background: ${({ theme }) => theme.elevation1};
	border-radius: 0.5rem;
	box-shadow: ${({ theme }) => theme.shadowElevation1};
	padding: ${({ vw }) => (vw && vw < 768 ? '1rem' : '2rem')};
	position: relative;
	width: ${({ vw }) => (vw && vw < 768 ? vw - 20 : '500')}px;
`;

const Header = styled.header<CardProps>`
	padding-top: 2rem;
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
	padding-top: 1.4rem;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 100%;
	padding: 2rem;
`;

const Footer = styled.footer`
	text-align: center;
	padding-bottom: 1.5rem;
`;

export const Card = ({ children, footer, subTitle, title }: CardProps) => {
	// Hooks
	const width = useWindowWidth();

	return (
		<Container vw={width}>
			{title && (
				<Header>
					<Title>{title}</Title>
					{subTitle && <SubTitle>{subTitle}</SubTitle>}
				</Header>
			)}

			<Content>{children}</Content>

			{footer && <Footer>{footer}</Footer>}
		</Container>
	);
};

// Display Names
Card.displayName = 'Card';
Header.displayName = 'Card-Header';
Container.displayName = 'Card-Container';
Title.displayName = 'Card-Title';
SubTitle.displayName = 'Card-SubTitle';
Content.displayName = 'Card-Content';
Footer.displayName = 'Card-Footer';

// Prop Types
Card.propTypes = {
	children: PropTypes.node,
	footer: PropTypes.node,
	subTitle: PropTypes.string,
	title: PropTypes.string,
	vw: PropTypes.number,
};

// Default Props
Card.defaultProps = {
	children: null,
	footer: null,
	subTitle: '',
	title: '',
	vw: 0,
};
