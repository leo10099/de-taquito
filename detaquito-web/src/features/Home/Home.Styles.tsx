import styled from 'styles';
import { FlexColumnCentered } from 'utils/Styling';

export const HomeContainer = styled.section.attrs({ section: 'Home' })`
	${FlexColumnCentered()}
`;

// Display Names
HomeContainer.displayName = 'Home-Container';
