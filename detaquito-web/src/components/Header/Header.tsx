import React from "react";

// Styles
import { Header as HeaderContainer } from "./Header.Styles";

interface HeaderProps {
	isTranslucent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isTranslucent }) => {
	return (
		<HeaderContainer id="Footer" isTranslucent={isTranslucent}>
			<p>LEFT</p>
			<p>RIGHT</p>
		</HeaderContainer>
	);
};

export default React.memo(Header);
