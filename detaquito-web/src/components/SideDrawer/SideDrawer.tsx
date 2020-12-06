import React from "react";

// Components
import { ArrowsRightIcon } from "components/UI/Icon";

// Styles
import { SideDrawerContainer } from "./SideDrawer.Styles";

interface SideDrawerProps {
	isHidden: boolean;
	toggleSideDrawer: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isHidden, toggleSideDrawer }: SideDrawerProps) => {
	return (
		<SideDrawerContainer id="SideDrawer" isHidden={isHidden}>
			<ArrowsRightIcon onClick={toggleSideDrawer} />
		</SideDrawerContainer>
	);
};

export default SideDrawer;
