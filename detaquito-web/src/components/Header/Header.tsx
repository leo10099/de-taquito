import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// Styles
import { Header as HeaderContainer, Logo, Menu, MenuItem } from "./Header.Styles";

// Icons
import { FaBars } from "react-icons/fa";
import { SignInIcon } from "components/UI/Icon";

// Assets
import LogoText from "assets/img/logotipo.png";

// Hooks
import { useScrollDirection } from "hooks";

const Header: React.FC = () => {
	// Hooks
	const { scrollDir, scrollPositionAtTop } = useScrollDirection();

	// Memos
	const shouldShowHeader = useMemo(() => scrollDir === "UP" || scrollPositionAtTop, [
		scrollDir,
		scrollPositionAtTop,
	]);

	const isTranslucent = useMemo(() => window.location.pathname === "/", []);

	return (
		<HeaderContainer id="Footer" isTranslucent={isTranslucent} shouldShowHeader={shouldShowHeader}>
			<Link to="/">
				<Logo src={LogoText} />
			</Link>

			<Menu>
				<MenuItem isTranslucent={isTranslucent}>
					<SignInIcon />
				</MenuItem>
				<MenuItem isTranslucent={isTranslucent}>
					<FaBars />
				</MenuItem>
			</Menu>
		</HeaderContainer>
	);
};

export default React.memo(Header);
