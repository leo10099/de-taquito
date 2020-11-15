import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "UP" | "DOWN";

export function useScrollDirection(active = true) {
	// Refs
	const lastScrollPositionAtTop = useRef(true);
	const globalActive = useRef(active);

	// State
	const [scrollDir, setScrollDir] = useState<ScrollDirection>("DOWN");
	const [scrollPositionAtTop, setScrollPositionAtTop] = useState(true);

	// Effects
	useEffect(() => {
		const thresholdUp = 20;
		const thresholdDown = 100;
		let lastScrollY = window.pageYOffset;
		let ticking = false;

		const updateScrollDir = () => {
			const scrollY = window.pageYOffset;

			// Down
			if (scrollY > lastScrollY && Math.abs(scrollY - lastScrollY) < thresholdDown) {
				ticking = false;
				return;
			}
			// Up
			if (scrollY < lastScrollY && Math.abs(scrollY - lastScrollY) < thresholdUp) {
				ticking = false;
				return;
			}

			setScrollDir(scrollY > lastScrollY ? "DOWN" : "UP");
			lastScrollY = scrollY > 0 ? scrollY : 0;

			if (
				lastScrollPositionAtTop.current ||
				(lastScrollPositionAtTop.current && lastScrollY > 0) ||
				(!lastScrollPositionAtTop.current && lastScrollY === 0)
			) {
				setScrollPositionAtTop(lastScrollY === 0);
			}

			ticking = false;
		};

		const onScroll = () => {
			if (!ticking && globalActive.current) {
				window.requestAnimationFrame(updateScrollDir);
				ticking = true;
			}
		};

		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		globalActive.current = active;
	}, [active]);

	return {
		scrollDir,
		scrollPositionAtTop,
		setScrollDir,
	};
}

export default useScrollDirection;
