import React from "react";
import styled from "styled-components/macro";

interface ImageContainerProps {
	width?: string;
	margin?: string;
}

interface ImageProps {
	alt: string;
	src: string;
	margin?: string;
	width?: string;
}

const ImageContainer = styled.figure<ImageContainerProps>`
	margin: ${({ margin }) => margin};
	width: ${({ width }) => width};

	img {
		height: auto;
		max-width: 100%;
		width: 100%;
	}
`;

const Image: React.FC<ImageProps> = React.memo(function Image({
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

export default React.memo(Image);
