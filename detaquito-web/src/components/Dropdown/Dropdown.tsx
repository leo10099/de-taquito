import React from "react";
import "./Dropdown.Styles";

import { DropdownContainer } from "./Dropdown.Styles";

interface DropdownComponentProps {
	isOpen: boolean;
	children: React.ReactElement;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ children, isOpen = false }) => {
	if (!isOpen) return null;

	return <DropdownContainer>{children}</DropdownContainer>;
};

export default React.memo(DropdownComponent);
