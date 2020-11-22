import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// Styles
import { Header as HeaderContainer, Logo, Menu, MenuItem } from "./Header.Styles";

// Icons
import { FaBars } from "react-icons/fa";
import { SignInIcon } from "components/UI/Icon";

// Assets
import LogoImage from "assets/img/logo.png";

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

	return (
		<HeaderContainer
			id="Footer"
			isTranslucent={window.location.pathname === "/"}
			shouldShowHeader={shouldShowHeader}
		>
			<Link to="/">
				<Logo src={LogoImage} />
			</Link>

			<Menu>
				<MenuItem>
					<SignInIcon />
				</MenuItem>
				<MenuItem>
					<FaBars />
				</MenuItem>
			</Menu>
		</HeaderContainer>
	);
};

export default React.memo(Header);
