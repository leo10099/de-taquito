import React, { useMemo } from "react";
import { Link } from "react-router-dom";

// Styles
import {
	Header as HeaderContainer,
	Logo,
	MenuMobile,
	MenuItemMobile,
	MenuDesktop,
	MenuItemDesktop,
} from "./Header.Styles";

// Icons
import { FaBars } from "react-icons/fa";
import { SignInIcon } from "components/UI/Icon";

// Assets
import LogoText from "assets/img/logotipo.png";

// Hooks
import { useScrollDirection } from "hooks";

interface HeaderProps {
	toggleSideDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideDrawer }: HeaderProps) => {
	// Hooks
	const { scrollDir, scrollPositionAtTop } = useScrollDirection();

	// Memos
	const shouldShowHeader = useMemo(() => scrollDir === "UP" || scrollPositionAtTop, [
		scrollDir,
		scrollPositionAtTop,
	]);

	const isTranslucent = useMemo(() => window.location.pathname === "/", []);

	const mobileMenu = useMemo(() => {
		return (
			<MenuMobile>
				<MenuItemMobile isTranslucent={isTranslucent}>
					<SignInIcon />
				</MenuItemMobile>
				<MenuItemMobile isTranslucent={isTranslucent} onClick={toggleSideDrawer}>
					<FaBars />
				</MenuItemMobile>
			</MenuMobile>
		);
	}, [isTranslucent, toggleSideDrawer]);

	const desktopMenu = useMemo(() => {
		return (
			<MenuDesktop>
				<MenuItemDesktop isTranslucent={isTranslucent}>Ingresar</MenuItemDesktop>
			</MenuDesktop>
		);
	}, [isTranslucent]);

	return (
		<HeaderContainer id="Header" isTranslucent={isTranslucent} shouldShowHeader={shouldShowHeader}>
			<Link to="/">
				<Logo src={LogoText} />
			</Link>

			{/* Mobile Menu */}
			{mobileMenu}
			{/* Desktop Menu */}
			{desktopMenu}
		</HeaderContainer>
	);
};

export default React.memo(Header);
