import { memo } from "react";
import styled from "styled-components/macro";

// Components
import Tooltip from "rc-tooltip";
import {
	IconContainer,
	Label,
	tooltipOverlayInnerStyle,
	tooltipOverlayStyle,
} from "components/UI/TextInput";

// Hooks
import { useWindowWidth } from "@react-hook/window-size";

// Assets
import { FaQuestionCircle } from "react-icons/fa";

// Theme
import { gray } from "theme";

// Helpers
import { FlexColumn } from "utils/styles";

interface SelectInputProps {
	label?: string;
	id?: string;
	hasError?: boolean;
	isFullWidth?: boolean;
	tooltipText?: string;
	options: {
		value: string;
		label: string;
	}[];
}

// Styles
const BaseSelect = styled.div`
	${FlexColumn}
	position: relative;
`;

const BaseSelectLabel = styled(Label)``;

const BaseSelectInput = styled.select<
	Pick<SelectInputProps, "isFullWidth" | "tooltipText" | "hasError">
>`
	background: inherit;
	border-color: ${({ hasError, theme }) => {
		return hasError ? theme.error : theme.primaryLight;
	}};
	border-radius: 4px;
	border-style: solid;
	border-width: 2px;
	box-shadow: ${({ hasError, theme }) => {
		return hasError ? theme.errorShadowElevation3 : theme.shadowElevation1;
	}};
	color: ${({ theme }) => theme.elevation7};
	height: 4.8rem;
	outline: 0;
	margin-bottom: 2rem;
	padding: 0 2rem 0 1rem;
	width: ${({ isFullWidth, tooltipText }) =>
		tooltipText ? (isFullWidth ? "90%" : "40%") : isFullWidth ? "100%" : "50%"};
`;

const SelectInput: React.FC<SelectInputProps> = props => {
	// Hooks
	const windowWidth = useWindowWidth();

	// Props
	const { options } = props ?? [];
	const { id, hasError, isFullWidth, label, tooltipText } = props;

	if (!options.length) return null;

	return (
		<BaseSelect>
			{label && id && <BaseSelectLabel id={id}>{label}</BaseSelectLabel>}
			<BaseSelectInput {...props} isFullWidth={isFullWidth} tooltipText={tooltipText}>
				{options.map(({ value, label }) => {
					return (
						<option value={value} key={`select-option-${label}`}>
							{label}
						</option>
					);
				})}
			</BaseSelectInput>
			{tooltipText && (
				<Tooltip
					placement={windowWidth < 768 ? "left" : "top"}
					trigger={windowWidth < 768 ? "click" : "hover"}
					overlayStyle={tooltipOverlayStyle}
					overlayInnerStyle={tooltipOverlayInnerStyle}
					overlay={tooltipText}
				>
					<IconContainer hasError={hasError}>
						<FaQuestionCircle fill={gray.gray300} size={20} />
					</IconContainer>
				</Tooltip>
			)}
		</BaseSelect>
	);
};

export default memo(SelectInput);
