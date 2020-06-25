import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styles';

// eslint-disable-next-line react/prop-types
const Container: React.FC = ({ children }) => (
	<div style={{ position: 'fixed', top: 0, backgroundColor: 'red' }}>{children}</div>
);

export const Alert: React.FC = ({ children }) => {
	const domElement = document.getElementById('alert') as HTMLElement;
	return ReactDOM.createPortal(<Container>{children}</Container>, domElement);
};

Alert.propTypes = {};
