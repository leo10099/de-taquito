import styled from 'styles';

// Separator
export const Separator = styled.span`
	font-size: 2rem;
	margin: 2rem auto;
	position: relative;

	&:before,
	&:after {
		border-bottom: 1px solid ${({ theme }) => theme.elevation5};
		content: '';
		content: '';
		display: block;
		position: absolute;
		top: 10px;
		width: 92px;
	}

	&:before {
		left: 30px;
	}
	&:after {
		right: 30px;
	}
`;

Separator.displayName = 'Separator';
