/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addBabelPlugin, overrideDevServer } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

const devServerConfig = () => config => {
	return {
		...config,
		proxy: {
			'/api/auth/google': {
				target: 'http://localhost:7777',
			},
			'/auth/google/callback': {
				target: 'http://localhost:7777/api',
			},
		},
	};
};

function hotReloadConfig(config, env) {
	config = rewireReactHotLoader(config, env);

	if (process.env.NODE_ENV === 'development') {
		config.resolve.alias = {
			...config.resolve.alias,
			'react-dom': '@hot-loader/react-dom',
		};
	}

	return config;
}

module.exports = {
	devServer: overrideDevServer(devServerConfig()),
	webpack: override(
		hotReloadConfig,
		addBabelPlugin([
			'styled-components',
			{
				displayName: process.env.NODE_ENV !== 'production',
				fileName: false,
				pure: true,
				ssr: false,
			},
		])
	),
};
