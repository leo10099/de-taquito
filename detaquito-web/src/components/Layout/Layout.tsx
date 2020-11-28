import React from "react";

// Components
import { Header, NavTabs, Container as LayoutContainer } from "components";

interface LayoutProps {
	children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<LayoutContainer>
			<Header />
			{children}
			<NavTabs />
		</LayoutContainer>
	);
};

export default React.memo(Layout);
