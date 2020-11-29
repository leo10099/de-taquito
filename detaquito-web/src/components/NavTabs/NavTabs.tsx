import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

// Components
import { CalendarIcon, HomeIcon, ListIcon, TrophyIcon } from "components/UI/Icon";

// Styles
import {
	NavTabsContainer,
	NavTabsTabs,
	NavTabsLink,
	NavTabsTab,
	NavTabsLabel,
} from "./NavTabs.Style";

// Enums
import { RoutesList } from "router";

// Hooks
import { useScrollDirection } from "hooks";

const tabs = [
	{
		label: "Inicio",
		icon: HomeIcon,
		path: RoutesList.HOME,
	},
	{
		label: "Pronosticar",
		icon: CalendarIcon,
		path: RoutesList.PREDICT,
	},
	{
		label: "Rankings",
		icon: ListIcon,
		path: RoutesList.RANKINGS,
	},
	{
		label: "Torneos",
		icon: TrophyIcon,
		path: RoutesList.TOURNEY,
	},
];

const NavTabs: React.FC = () => {
	// Hooks
	const location = useLocation();
	const { scrollDir, scrollPositionAtTop } = useScrollDirection();

	// Memos
	const shouldShowNavTabs = useMemo(() => scrollDir === "UP" || scrollPositionAtTop, [
		scrollDir,
		scrollPositionAtTop,
	]);

	return (
		<NavTabsContainer id="NavTabs" shouldShowNavTabs={shouldShowNavTabs}>
			<NavTabsTabs>
				{tabs.map(({ label, icon: Icon, path }) => {
					const isActive = location.pathname === path;

					return (
						<NavTabsTab key={path} isActive={isActive}>
							<NavTabsLink href={path} isActive={isActive}>
								<Icon />
								<NavTabsLabel isActive={isActive}>{label}</NavTabsLabel>
							</NavTabsLink>
						</NavTabsTab>
					);
				})}
			</NavTabsTabs>
		</NavTabsContainer>
	);
};

export default React.memo(NavTabs);
