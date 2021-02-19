import React, { Ref } from "react";
import "./Dropdown.Styles";

import { DropdownContainer } from "./Dropdown.Styles";

interface DropdownComponentProps {
	isOpen: boolean;
	children: React.ReactElement;
}

const DropdownComponent: React.FC<DropdownComponentProps> = React.forwardRef(
	(props, ref: Ref<HTMLDivElement>) => {
		if (!props.isOpen) return null;

		return <DropdownContainer ref={ref}>{props.children}</DropdownContainer>;
	}
);

DropdownComponent.displayName = "DropdownComponent";

export default React.memo(DropdownComponent);
