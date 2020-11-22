import React from "react";
import { BrowserRouter } from "react-router-dom";

// Components
import { Layout } from "components";

import Public from "./Public.Routes";

const Router: React.FC = () => (
	<BrowserRouter>
		<Layout>
			<Public />
		</Layout>
	</BrowserRouter>
);

export default React.memo(Router);
