import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import { FaBars } from "react-icons/fa";
import { SignInIcon } from "components/UI/Icon";

// Assets
import LogoText from "assets/img/logotipo.png";

// Hooks
import { useScrollDirection } from "hooks";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";

// Providers
import { UserProvider } from "providers";

// Styles
import {
	Header as HeaderContainer,
	Logo,
	MenuMobile,
	MenuItemMobile,
	MenuDesktop,
	MenuItemDesktop,
} from "./Header.Styles";

interface HeaderProps {
	toggleSideDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideDrawer }: HeaderProps) => {
	// Hooks
	const { scrollDir, scrollPositionAtTop } = useScrollDirection();

	// Selectors
	const user = useSelector(selectCurrentUser);

	// Memos
	const shouldShowHeader = useMemo(() => scrollDir === "UP" || scrollPositionAtTop, [
		scrollDir,
		scrollPositionAtTop,
	]);

	const isTranslucent = useMemo(() => window.location.pathname === "/", []);

	const isLoggedIn = useMemo(() => !!user.id, [user]);

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
				<MenuItemDesktop isTranslucent={isTranslucent}>
					{isLoggedIn ? "Salir" : "Ingresar"}
				</MenuItemDesktop>
			</MenuDesktop>
		);
	}, [isLoggedIn, isTranslucent]);

	return (
		<UserProvider>
			<HeaderContainer
				id="Header"
				isTranslucent={isTranslucent}
				shouldShowHeader={shouldShowHeader}
			>
				<Link to="/">
					<Logo src={LogoText} />
				</Link>

				{/* Mobile Menu */}
				{mobileMenu}
				{/* Desktop Menu */}
				{desktopMenu}
			</HeaderContainer>
		</UserProvider>
	);
};

export default React.memo(Header);
