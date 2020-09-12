import React from "react";
import { motion } from "framer-motion";

const FadeInFadeOutProvider: React.FunctionComponent<{}> = ({ children }) => {
	return (
		<motion.div
			exit={{ opacity: 0, height: "100vh", overflow: "hidden" }}
			initial={{ opacity: 0, height: "100vh", overflow: "hidden" }}
			animate={{ opacity: 1, height: "100vh", overflow: "visible" }}
			transition={{ type: "spring", damping: 50, stiffness: 100 }}
		>
			{children}
		</motion.div>
	);
};

export default FadeInFadeOutProvider;
