import { useEffect, useRef } from "react";

export function useInterval(callback: () => any, delay: number): any {
	const savedCallback = useRef<any>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect((): any => {
		function tick() {
			if (savedCallback.current) savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
		return null;
	}, [delay]);
}
