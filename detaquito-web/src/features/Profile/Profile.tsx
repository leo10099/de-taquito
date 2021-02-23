// Hooks
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Button, Card, Image, Link, Select, Spinner, TextInput } from "components";

// Validations
import validation from "features/Auth/SignUp/SignUp.validations";

// Slices
import clubSlice from "features/Club/Club.reducer";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";
import { selectClubs } from "features/Club/Club.selectors";

// Assets
import Logo from "assets/img/logo.png";

// Types
import { Club } from "features/Club/Club.types";

// Styles
import { ProfileContainer } from "./Profile.Styles";

const Profile: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();

	const { register, handleSubmit, getValues, errors, setError } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});

	// Selectors
	const user = useSelector(selectCurrentUser);
	const club = useSelector(selectClubs);

	// Handlers
	const onSubmit = () => {};

	// Memos

	const isLoading = useMemo(() => {
		return !!(club && club.activeClubsLoading);
	}, [club]);

	const activeClubsList = useMemo(() => {
		if (!club || !club.activeClubs || club.activeClubs === {}) return null;
		return Object.keys(club.activeClubs).map(competition => {
			return club.activeClubs[competition];
		});
	}, [club]);

	const countryList = useMemo(() => {
		if (!club || !club.activeClubs) return [];
		const output = [{ value: "", label: "No tengo equipo" }];

		Object.keys(club.activeClubs).forEach(competition => {
			output.push({
				label: competition,
				value: competition,
			});
		});

		return output;
	}, [club]);

	// Effects
	useEffect(() => {
		dispatch(clubSlice.actions.getAllCompetitionClubsRequest());
	}, [dispatch]);

	if (!user || !user.id) return null;

	if (isLoading) return <Spinner centered />;

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
						label="Nombre de usuario *"
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
						label="Nombre completo"
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

					<Select
						options={countryList}
						label="Equipo favorito"
						id="Profile-FavTeam"
						isFullWidth
						tooltipText="Si no subes un avatar, el escudo de tu equipo te identificará en las tablas de posiciones"
					/>
				</form>
			</Card>
		</ProfileContainer>
	);
};

export default Profile;
