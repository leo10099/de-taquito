import styled from "styled-components/macro";

export const DropdownContainer = styled.div`
	background-color: ${({ theme }) => theme.elevation2};
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.shadowElevation4};
	color: ${({ theme }) => theme.elevation2};
	position: absolute;
	right: 0;

	> * {
		color: ${({ theme }) => theme.elevation8};
	}
`;
