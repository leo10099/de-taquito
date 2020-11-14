import styled from "styled-components/macro";

interface HeaderProps {
	isTranslucent?: boolean;
}

export const Header = styled.header<HeaderProps>`
	display: flex;
	justify-content: space-between;
`;
