import { memo } from "react";
import styled from "styled-components/macro";

interface SelectInputProps {
	options: {
		value: string;
		label: string;
	}[];
}

const BaseSelectInput = styled.select``;

const SelectInput: React.FC<SelectInputProps> = props => {
	const { options } = props ?? [];
	if (!options.length) return null;

	return (
		<BaseSelectInput {...props}>
			{options.map(({ value, label }) => {
				return (
					<option value={value} key={`select-option-${label}`}>
						{label}
					</option>
				);
			})}
		</BaseSelectInput>
	);
};

export default memo(SelectInput);
