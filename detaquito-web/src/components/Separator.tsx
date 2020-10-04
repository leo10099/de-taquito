import styled, { css } from "styled-components/macro";

interface SeparatorPros {
	mt: number;
	mb: number;
}

// Separator
const Separator = styled.span<SeparatorPros>`
	${({ mt }) =>
		css`
			margin-top: ${mt}rem;
		`};
	${({ mb }) =>
		css`
			margin-bottom: ${mb}rem;
		`};
	margin-left: auto;
	margin-right: auto;
	position: relative;

	&:before,
	&:after {
		border-bottom: 1px solid ${({ theme }) => theme.elevation5};
		content: "";
		display: block;
		position: absolute;
		top: 50%;
		width: 92px;
	}

	&:before {
		left: 30px;
	}
	&:after {
		right: 30px;
	}
`;

export default Separator;
