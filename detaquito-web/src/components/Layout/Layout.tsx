import React, { useState } from "react";

// Components
import { Header, NavTabs, Container as LayoutContainer, SideDrawer } from "components";

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
			{children}
			<NavTabs />
		</LayoutContainer>
	);
};

export default React.memo(Layout);
