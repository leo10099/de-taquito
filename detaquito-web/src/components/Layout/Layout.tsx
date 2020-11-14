import React from "react";

// Components
import { Header, Container as LayoutContainer } from "components";

interface LayoutProps {
	children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
	return (
		<LayoutContainer>
			<Header />
			{children}
		</LayoutContainer>
	);
};

export default React.memo(Layout);
