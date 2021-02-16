import React from "react";
import "./Dropdown.Styles";

const DropDownComponent: React.FC = ({ children }) => {
	return <div>{children}</div>;
};

export default React.memo(DropDownComponent);
