import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styles';

type ImageContainerProps = {
	width?: string;
	margin?: string;
};

type ImageProps = {
	alt: string;
	src: string;
	margin?: string;
	width?: string;
};

const ImageContainer = styled.figure<ImageContainerProps>`
	margin: ${({ margin }) => margin};
	width: ${({ width }) => width};

	img {
		height: auto;
		max-width: 100%;
		width: 100%;
	}
`;

export const Image: React.FC<ImageProps> = React.memo(function Image({
	alt,
	src,
	margin,
	width,
}: ImageProps) {
	return (
		<ImageContainer margin={margin} width={width}>
			<img alt={alt} src={src} />
		</ImageContainer>
	);
});

// PropTypes
ImageContainer.propTypes = {
	margin: PropTypes.string,
	width: PropTypes.string,
};

Image.propTypes = {
	alt: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	margin: PropTypes.string,
	width: PropTypes.string,
};

Image.defaultProps = {
	margin: '0px',
	width: 'auto',
};

// Display Names
ImageContainer.displayName = 'Image-Container';
Image.displayName = 'Image';
