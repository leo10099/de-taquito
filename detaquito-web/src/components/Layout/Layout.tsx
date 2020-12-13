import React, { useState } from "react";

// Components
import { Backdrop, Header, NavTabs, Container as LayoutContainer, SideDrawer } from "components";

interface LayoutProps {
	children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	// Hooks
	const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

	// Handlers
	const toggleSideDrawer = () => setIsSideDrawerOpen(cur => !cur);

	return (
		<LayoutContainer>
			<Header toggleSideDrawer={toggleSideDrawer} />
			<SideDrawer isHidden={!isSideDrawerOpen} toggleSideDrawer={toggleSideDrawer} />
			<Backdrop isActive={isSideDrawerOpen}>{children}</Backdrop>
			<NavTabs />
		</LayoutContainer>
	);
};

export default React.memo(Layout);
