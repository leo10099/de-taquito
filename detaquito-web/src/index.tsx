import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

// Redux
import { Provider } from 'react-redux';
import store from 'store';

// Hot Reload
if (module.hot) {
	module.hot.accept('App', () => {
		const NextApp = require('App').default;
		ReactDOM.render(<NextApp />, document.getElementById('root'));
	});
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
