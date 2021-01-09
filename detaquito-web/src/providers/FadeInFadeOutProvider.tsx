import React from "react";
import { motion } from "framer-motion";

const FadeInFadeOutProvider: React.FC = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0, height: "100vh", overflow: "hidden" }}
			animate={{ opacity: 1, height: "100%", overflow: "visible" }}
			exit={{ opacity: 0, height: "100vh", overflow: "hidden" }}
			transition={{ duration: 1 }}
		>
			{children}
		</motion.div>
	);
};

export default FadeInFadeOutProvider;
