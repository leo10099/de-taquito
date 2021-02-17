import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Icons
import { FaBars, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { SignInIcon } from "components/UI/Icon";

// Assets
import LogoText from "assets/img/logotipo.png";

// Hooks
import { useScrollDirection, useOnClickOutside } from "hooks";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";

// Components
import UserAvatar from "components/UserAvatar";

// Providers
import { UserProvider } from "providers";

// Styles
import {
	Header as HeaderContainer,
	HeaderAvatarContainerDesktop,
	HeaderAvatarContainerMobile,
	Logo,
	MenuDesktop,
	MenuDropdownDesktop,
	MenuDropdownDesktopList,
	MenuDropdownDesktopListItem,
	MenuDropdownMobile,
	MenuItemHamburgerMobile,
	MenuDropdownMobileList,
	MenuDropdownMobileListItem,
	MenuMobile,
} from "./Header.Styles";

interface HeaderProps {
	toggleSideDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideDrawer }: HeaderProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Refs
	const dropdownElementRef = useRef(null);

	// Hooks
	const { scrollDir, scrollPositionAtTop } = useScrollDirection();
	useOnClickOutside(dropdownElementRef, () => setIsDropdownOpen(false));

	// Selectors
	const user = useSelector(selectCurrentUser);

	// Handlers
	const openDropdown = useCallback(() => {
		if (isDropdownOpen) return;
		setIsDropdownOpen(true);
	}, [isDropdownOpen]);

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
				<MenuItemHamburgerMobile isTranslucent={isTranslucent} onClick={toggleSideDrawer}>
					<FaBars />
				</MenuItemHamburgerMobile>
				<HeaderAvatarContainerMobile onClick={openDropdown} ref={dropdownElementRef}>
					{isLoggedIn ? <UserAvatar user={user} /> : <SignInIcon />}
					<MenuDropdownMobile isTranslucent={isTranslucent} isOpen={isDropdownOpen}>
						<MenuDropdownMobileList>
							<MenuDropdownMobileListItem>
								Perfil <FaUserAlt />
							</MenuDropdownMobileListItem>
							<MenuDropdownMobileListItem>
								Salir <FaSignOutAlt />
							</MenuDropdownMobileListItem>
						</MenuDropdownMobileList>
					</MenuDropdownMobile>
				</HeaderAvatarContainerMobile>
			</MenuMobile>
		);
	}, [isDropdownOpen, isLoggedIn, isTranslucent, openDropdown, toggleSideDrawer, user]);

	const desktopMenu = useMemo(() => {
		return (
			<MenuDesktop>
				<HeaderAvatarContainerDesktop onClick={openDropdown} ref={dropdownElementRef}>
					{isLoggedIn ? <UserAvatar user={user} /> : <SignInIcon />}
					<MenuDropdownDesktop isTranslucent={isTranslucent} isOpen={isDropdownOpen}>
						<MenuDropdownDesktopList>
							<MenuDropdownDesktopListItem>
								Perfil <FaUserAlt />
							</MenuDropdownDesktopListItem>
							<MenuDropdownDesktopListItem>
								Salir <FaSignOutAlt />
							</MenuDropdownDesktopListItem>
						</MenuDropdownDesktopList>
					</MenuDropdownDesktop>
				</HeaderAvatarContainerDesktop>
			</MenuDesktop>
		);
	}, [isDropdownOpen, isLoggedIn, isTranslucent, openDropdown, user]);

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
