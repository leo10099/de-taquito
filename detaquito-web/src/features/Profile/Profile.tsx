import React from "react";

// Hooks
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

// Components
import { Button, Card, Image, Link, Separator, TextInput } from "components";

// Validations
import validation from "features/Auth/SignUp/SignUp.validations";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";

// Assets
import Logo from "assets/img/logo.png";

// Styles
import { ProfileContainer } from "./Profile.Styles";

const Profile: React.FC = () => {
	// Hooks
	const { register, handleSubmit, getValues, errors, setError } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});

	// Selectors
	const user = useSelector(selectCurrentUser);

	// Handlers
	const onSubmit = () => {};

	if (!user || !user.id) return null;

	return (
		<ProfileContainer>
			<Image alt="De Taquito" src={Logo} width="130px" />

			<Card mt={4} title="Perfil" subTitle="Modifica tus datos y preferencias">
				<form onSubmit={handleSubmit(onSubmit)} id="Profile-Form">
					<TextInput
						defaultValue={user.alias}
						errorMessage={errors.alias?.message}
						hasError={!!errors.alias}
						id="Profile-Alias"
						label="Tu nombre de usuario *"
						name="alias"
						placeholder="Nombre"
						ref={register({
							required: validation.alias.required,
							maxLength: {
								value: 50,
								message: validation.alias.maxLength,
							},
						})}
						tooltipText="Se muestra en las tablas de posiciones"
						type="text"
					/>

					<TextInput
						defaultValue={user.fullName}
						errorMessage={errors.fullName?.message}
						hasError={!!errors.fullName}
						id="Profile-Alias"
						label="Tu nombre completo"
						name="fullName"
						placeholder="Cosme Fulanito"
						ref={register({
							maxLength: {
								value: 50,
								message: validation.fullName.maxLength,
							},
						})}
						tooltipText="Se muestra en las tablas de posiciones junto a tu nombre de usuario"
						type="text"
					/>
				</form>
			</Card>
		</ProfileContainer>
	);
};

export default Profile;
