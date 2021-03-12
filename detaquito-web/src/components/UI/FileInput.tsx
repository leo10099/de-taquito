import React, { forwardRef } from "react";
import styled, { css } from "styled-components/macro";
import { mediaQueries } from "style";

// Components
import { UserAvatar } from "components";

// Styles
import { Label } from "components/UI/TextInput";

// Assets
import { FaUpload } from "react-icons/fa";

// Helpers
import { FlexColumn } from "utils/styles";

interface FileInputProps {
	accept?: string;
	buttonLabel?: string;
	hasError?: boolean;
	errorMessage?: string;
	id: string;
	isInvisible?: boolean;
	label?: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	preview?: any;
	ref?: any;
	width?: string;
}

const InputContainer = styled.div<{ isInvisible?: boolean }>`
	${FlexColumn};
	justify-content: space-between;
	position: relative;
	display: none;
`;

const InputLabel = styled(Label)``;

const Input = styled.input<FileInputProps>`
	margin-bottom: 2rem;
	width: ${({ width }) => width || "100%"};
	outline: none;
	user-select: none;
	${({ isInvisible }) =>
		isInvisible &&
		css`
			width: 0.1;
			height: 0.1px;
		`}

	&::-webkit-file-upload-button {
		visibility: hidden;
	}

	&::before {
		user-select: none;
		border-radius: 4px;
		border-color: ${({ hasError, theme }) => {
			return hasError ? theme.error : theme.primaryLight;
		}};
		border-style: solid;
		border-width: 2px;
		color: ${({ hasError, theme }) => {
			return hasError ? theme.error : theme.primaryLight;
		}};
		content: ${({ buttonLabel }) => `"${buttonLabel}"` || '"Seleccionar Archivo"'};
		cursor: pointer;
		display: inline-block;
		font-size: 1.4rem;
		outline: none;
		padding: 0.8rem 2rem;
		padding: 5px 8px;
		text-align: center;
		white-space: nowrap;
		width: 90%;
	}
`;

const InputButtonAndPreviewContainer = styled.div<{ hasError?: boolean }>`
	align-items: flex-start;
	display: flex;
	justify-content: space-between;
	position: relative;

	svg {
		display: none;

		${mediaQueries.minNotebook} {
			display: inline-block;
			position: absolute;
			top: 11px;
			left: 52%;
			width: 14px;
			height: 14px;
			fill: ${({ hasError, theme }) => {
				return hasError ? theme.error : theme.primaryLight;
			}};
		}

		${mediaQueries.minFullHd} {
			top: 13px;
		}
	}
`;

const ErrorMessage = styled.p<{ hasError?: boolean }>`
	color: ${({ theme }) => theme.error};
	letter-spacing: 0.5px;
	margin-top: -1rem;
	margin-bottom: 2rem;
	text-align: left;
	font-size: 75%;
	font-weight: bold;
	line-height: 1.5em;
	visibility: ${({ hasError }) => (hasError ? "visible" : "hidden")};
`;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
	return (
		<InputContainer isInvisible={props.isInvisible}>
			{props.label && <InputLabel>{props.label}</InputLabel>}

			<InputButtonAndPreviewContainer hasError={props.hasError}>
				<Input
					accept={props.accept}
					hasError={props.hasError}
					id={props.id}
					label={props.label}
					buttonLabel={props.buttonLabel}
					name={props.name}
					onChange={props.onChange}
					ref={ref}
					type="file"
					width={props.width}
				/>
				<FaUpload />
				{props.preview && <UserAvatar url={props.preview} margin="0 4rem 0 0" />}
			</InputButtonAndPreviewContainer>

			{props.errorMessage && (
				<ErrorMessage hasError={props.hasError}>{props.errorMessage}</ErrorMessage>
			)}
		</InputContainer>
	);
});

FileInput.displayName = "FileInput";

export default FileInput;
