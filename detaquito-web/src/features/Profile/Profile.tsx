// Hooks
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Components
import { Button, Card, Image, Link, Select, Spinner, TextInput } from "components";

// Validations
import validation from "features/Auth/SignUp/SignUp.validations";

// Slices
import clubSlice from "features/Club/Club.reducer";
import profileSlice from "features/Profile/Profile.reducer";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";
import { selectClubs } from "features/Club/Club.selectors";

// Assets
import Logo from "assets/img/logo.png";

// Types
import { Club } from "features/Club/Club.types";
import { ProfileFormData } from "features/Profile/Profile.types";

// Styles
import { ProfileContainer } from "./Profile.Styles";

const Profile: React.FC = () => {
	// Hooks
	const dispatch = useDispatch();

	const { register, handleSubmit, errors, setError, watch, formState } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});

	// Selectors
	const user = useSelector(selectCurrentUser);
	const club = useSelector(selectClubs);

	// Handlers
	const onSubmit = useCallback(
		({ alias, favTeam, fullName }: ProfileFormData) => {
			// Put together new user data object
			const profile: ProfileFormData = {};

			if (alias && alias !== user.alias) profile.alias = alias;
			if (favTeam && favTeam !== user.favTeam) profile.favTeam = alias;
			if (fullName && fullName !== user.fullName) profile.fullName = fullName;

			dispatch(profileSlice.actions.profileUpdateRequest(profile));
		},
		[dispatch, user.alias, user.favTeam, user.fullName]
	);

	// Memos
	const isLoading = useMemo(() => {
		return !!(club && club.activeClubsLoading);
	}, [club]);

	const selectedLeague = useMemo(() => watch("favTeamCountry"), [watch]);

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

	const activeClubsList = useMemo(() => {
		if (!club || !club.activeClubs || club.activeClubs === {} || !selectedLeague) return [];

		return club.activeClubs[selectedLeague]
			.map(club => {
				return {
					value: club.id,
					label: club.name,
				};
			})
			.sort((a, b) => {
				const teamA = a.label.toUpperCase();
				const teamB = b.label.toUpperCase();
				return teamA < teamB ? -1 : teamA > teamB ? 1 : 0;
			});
	}, [club, selectedLeague]);

	// Effects
	useEffect(() => {
		dispatch(clubSlice.actions.getAllCompetitionClubsRequest());
	}, [dispatch]);

	if (!user || !user.id) return null;

	if (isLoading) return <Spinner centered />;

	console.log(watch("favTeam"));

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
						id="Profile-FavTeam"
						isFullWidth
						label="Equipo favorito"
						options={countryList}
						tooltipText="Si no subes un avatar, el escudo de tu equipo te identificará en las tablas de posiciones"
						ref={register()}
						name="favTeamCountry"
					/>

					{selectedLeague && (
						<Select
							id="Profile-FavTeam"
							isFullWidth
							options={activeClubsList}
							ref={register()}
							name="favTeam"
						/>
					)}

					<Button
						isBlock
						isLoading={false}
						isDisabled={!formState.isDirty || !!Object.keys(errors).length}
						margin="2rem auto"
						variant="primary"
						type="submit"
					>
						Continuar
					</Button>
				</form>
			</Card>
		</ProfileContainer>
	);
};

export default Profile;
