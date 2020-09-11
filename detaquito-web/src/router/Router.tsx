import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Public } from "./Public.Routes";

const Router: React.FC = () => (
	<BrowserRouter>
		<Public />
	</BrowserRouter>
);

export default Router;
