import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Icons
import { FaBars, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { SignInIcon } from "components/UI/Icon";

// Assets
import LogoText from "assets/img/logotipo.png";

// Hooks
import { useScrollDirection, useOnClickOutside } from "hooks";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";

// Slices
import AuthSlice from "features/Auth/Auth.reducer";

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
	const dispatch = useDispatch();
	const { scrollDir, scrollPositionAtTop } = useScrollDirection();
	useOnClickOutside(dropdownElementRef, () => setIsDropdownOpen(false));

	// Selectors
	const user = useSelector(selectCurrentUser);

	// Handlers
	const openDropdown = useCallback(() => {
		if (isDropdownOpen) return;
		setIsDropdownOpen(true);
	}, [isDropdownOpen]);

	const doLogout = useCallback(() => {
		dispatch(AuthSlice.actions.logoutRequest());
		setIsDropdownOpen(false);
	}, [dispatch]);

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
				<HeaderAvatarContainerMobile onClick={openDropdown}>
					{isLoggedIn ? <UserAvatar user={user} /> : <SignInIcon />}
					<MenuDropdownMobile
						isTranslucent={isTranslucent}
						isOpen={isDropdownOpen}
						ref={dropdownElementRef}
					>
						<MenuDropdownMobileList>
							<MenuDropdownMobileListItem>
								Perfil <FaUserAlt />
							</MenuDropdownMobileListItem>
							<MenuDropdownMobileListItem onClick={doLogout}>
								Salir <FaSignOutAlt />
							</MenuDropdownMobileListItem>
						</MenuDropdownMobileList>
					</MenuDropdownMobile>
				</HeaderAvatarContainerMobile>
			</MenuMobile>
		);
	}, [doLogout, isDropdownOpen, isLoggedIn, isTranslucent, openDropdown, toggleSideDrawer, user]);

	const desktopMenu = useMemo(() => {
		return (
			<MenuDesktop>
				<HeaderAvatarContainerDesktop onClick={openDropdown}>
					{isLoggedIn ? <UserAvatar user={user} /> : <SignInIcon />}
					<MenuDropdownDesktop
						isTranslucent={isTranslucent}
						isOpen={isDropdownOpen}
						ref={dropdownElementRef}
					>
						<MenuDropdownDesktopList>
							<MenuDropdownDesktopListItem>
								Perfil <FaUserAlt />
							</MenuDropdownDesktopListItem>
							<MenuDropdownDesktopListItem onClick={doLogout}>
								Salir <FaSignOutAlt />
							</MenuDropdownDesktopListItem>
						</MenuDropdownDesktopList>
					</MenuDropdownDesktop>
				</HeaderAvatarContainerDesktop>
			</MenuDesktop>
		);
	}, [doLogout, isDropdownOpen, isLoggedIn, isTranslucent, openDropdown, user]);

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
