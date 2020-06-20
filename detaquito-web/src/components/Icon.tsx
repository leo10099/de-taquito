import React, { CSSProperties, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import { FaGoogle, FaGooglePlus } from 'react-icons/fa';

// Typings
import { IconTypes } from 'typings';

// Styles
import { gray } from 'theme/Theme';

// Selectors
import { selectCurrentTheme } from 'features/Layout/Layout.selector';

type IconProps = {
	type: 'Google' | 'GooglePlus';
};

const IconStyles: CSSProperties = { position: 'relative', top: '2.2px', right: '8px' };

export const Icon: React.FC<IconProps> = ({ type }: IconProps) => {
	//Selectors
	const theme = useSelector(selectCurrentTheme);

	// Helpers
	const fill = useMemo(() => (theme === 'dark' ? gray.gray800 : gray.gray100), [theme]);

	if (type === 'GooglePlus') {
		return <FaGooglePlus style={IconStyles} fill={fill} />;
	}
	return <FaGoogle style={IconStyles} fill={fill} />;
};

Icon.propTypes = {
	type: PropTypes.oneOf([IconTypes.GOOGLE, IconTypes.GOOGLE_PLUS]).isRequired,
};

Icon.displayName = 'Icon';
