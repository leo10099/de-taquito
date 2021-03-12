/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// Hooks
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "hooks";

// Components
import { Button, Card, Image, FileInput, Select, Spinner, TextInput } from "components";

// Validations
import validation from "features/Auth/SignUp/SignUp.validations";

// Slices
import clubSlice from "features/Club/Club.reducer";
import profileSlice from "features/Profile/Profile.reducer";

// Selectors
import { selectCurrentUser } from "features/Auth/Auth.selectors";
import { selectClubs } from "features/Club/Club.selectors";
import { selectProfileEdition } from "features/Profile/Profile.selectors";

// Assets
import Logo from "assets/img/logo.png";
import User from "assets/icons/user.svg";
import { FaCamera } from "react-icons/fa";

// Helpers
import { validFormat, validSize } from "utils/validation";

// Types
import { ProfileFormData } from "features/Profile/Profile.types";

// Styles
import {
	ProfileContainer,
	ProfileAvatar,
	ProfileAvatarIcon,
	FileUploadError,
} from "./Profile.Styles";

const themeOptions = [
	{
		value: "auto",
		label: "Automático",
	},
	{
		value: "light",
		label: "Claro",
	},
	{
		value: "dark",
		label: "Oscuro",
	},
];

const Profile: React.FC = () => {
	const [imagePreview, setImagePreview] = useState<any>();

	// Hooks
	const [currentTheme, setTheme] = useTheme();
	const dispatch = useDispatch();
	const { register, handleSubmit, setError, watch, formState, clearErrors } = useForm({
		mode: "onTouched",
		reValidateMode: "onChange",
		criteriaMode: "firstError",
		shouldFocusError: true,
	});
	const { errors } = formState;

	// Selectors
	const user = useSelector(selectCurrentUser);
	const club = useSelector(selectClubs);
	const profile = useSelector(selectProfileEdition);

	// Memos
	const isLoading = useMemo(() => {
		return !!(club && club.activeClubsLoading);
	}, [club]);

	const savedThemeInLocalStorate = useMemo(() => {
		return window.localStorage.getItem("theme");
	}, []);

	const selectedCountry = useMemo(() => watch("favTeamCountry"), [watch]);

	const countryList = useMemo(() => {
		if (!club || !club.activeClubs) return [];
		const output = [{ value: "0", label: "No tengo equipo" }];

		Object.keys(club.activeClubs).forEach(competition => {
			output.push({
				label: competition,
				value: competition,
			});
		});

		return output;
	}, [club]);

	const activeClubsList = useMemo(() => {
		const country = selectedCountry || user.club?.competition.country;
		if (!club.activeClubs[country]) return [];

		return club.activeClubs[country]
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
	}, [club, selectedCountry, user]);

	// Handlers
	const onAvatarImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.currentTarget || !e.currentTarget.files || !e.currentTarget.files.length) {
			return;
		}
		// Reset in case there is a old image uploaded
		setImagePreview(undefined);

		// Image validation
		const isValidSize = validSize(e.currentTarget.files, 1);
		if (!isValidSize) {
			setError("avatar", { message: "La imágen no puede pesar más de 1 MB" });
			e.currentTarget.value = "";
			return;
		}
		const isValidFormat = validFormat(e.currentTarget.files, ["jpg", "jpeg", "png"]);
		if (!isValidFormat) {
			setError("avatar", { message: "La imágen debe estar en el formato JPG o PNG" });
			e.currentTarget.value = "";
			return;
		}

		clearErrors("avatar");
		const reader = new FileReader();
		reader.addEventListener("load", () => setImagePreview(reader.result));
		reader.readAsDataURL(e.currentTarget.files[0]);
	};

	const handleAvatarClick = () => {
		document.getElementById("Profile-Avatar")?.click();
	};

	const onSubmit = useCallback(
		async ({ alias, clubId, fullName, avatar, theme }: ProfileFormData) => {
			const formData = new FormData();
			if (avatar && avatar.length) {
				formData.append("avatar", avatar[0]);
			}

			if (alias && alias !== user.alias) formData.append("alias", alias);
			if (fullName && fullName !== user.fullName) formData.append("fullName", fullName);
			if (selectedCountry === "0") {
				// Unset favourite team
				formData.append("club", selectedCountry);
			}
			if (clubId && clubId !== user.club?.id) {
				// Set favourite team
				formData.append("club", clubId.toString());
			}

			// Handle theme
			if (theme) {
				if (theme === "auto") {
					window.localStorage.removeItem("theme");
				}
				if (theme === "dark") {
					setTheme("dark");
				}
				if (theme === "light") {
					setTheme("light");
				}
			}

			if (Array.from(formData.entries()).length) {
				dispatch(profileSlice.actions.profileUpdateRequest(formData));
			}
		},
		[dispatch, selectedCountry, setTheme, user.alias, user.club?.id, user.fullName]
	);

	// Effects
	useEffect(() => {
		// Get list of competitions and clubs
		dispatch(clubSlice.actions.getAllCompetitionClubsRequest());
	}, [dispatch]);

	useEffect(() => {
		return () => window.location.reload();
	}, [currentTheme]);

	if (!user || !user.id) return null;

	if (isLoading) return <Spinner centered />;

	console.log(savedThemeInLocalStorate);

	return (
		<ProfileContainer>
			<Image alt="De Taquito" src={Logo} width="130px" />

			<Card mt={4} title="Perfil" subTitle="Modifica tus datos y preferencias">
				<form onSubmit={handleSubmit(onSubmit)} id="Profile-Form">
					{imagePreview || user.avatar ? (
						<ProfileAvatar role="button" aria-label="avatar">
							<img
								src={imagePreview || user.avatar}
								alt="Avatar"
								onClick={handleAvatarClick}
								onKeyPress={handleAvatarClick}
							/>
							<FaCamera onClick={handleAvatarClick} onKeyPress={handleAvatarClick} />
							<ProfileAvatarIcon onClick={handleAvatarClick} onKeyPress={handleAvatarClick} />
						</ProfileAvatar>
					) : (
						<ProfileAvatar role="button" aria-label="avatar" className="profile-no-avatar">
							<img
								src={User}
								alt="Avatar"
								onClick={handleAvatarClick}
								onKeyPress={handleAvatarClick}
							/>
							<FaCamera onClick={handleAvatarClick} onKeyPress={handleAvatarClick} />
							<ProfileAvatarIcon onClick={handleAvatarClick} onKeyPress={handleAvatarClick} />
						</ProfileAvatar>
					)}
					<FileUploadError hasError={errors.avatar?.message}>
						{errors.avatar?.message}
					</FileUploadError>

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

					<FileInput
						accept="image/png, image/jpeg"
						buttonLabel="Seleccionar Imagen"
						errorMessage={errors.avatar?.message}
						hasError={!!errors.avatar}
						id="Profile-Avatar"
						isInvisible
						label="Avatar"
						name="avatar"
						onChange={onAvatarImageSelected}
						ref={register()}
						width="75%"
					/>

					<Select
						defaultValue={user.club?.competition.country}
						id="Profile-FavTeam"
						isFullWidth
						label="Equipo favorito"
						options={countryList}
						tooltipText="Si no subes un avatar, el escudo de tu equipo te identificará en las tablas de posiciones"
						ref={register()}
						name="favTeamCountry"
					/>

					{!!(selectedCountry || user.club?.competition.country) && (
						<Select
							id="Profile-FavTeam"
							isFullWidth
							options={activeClubsList}
							ref={register()}
							name="clubId"
							defaultValue={user.club?.id}
						/>
					)}

					<Select
						defaultValue={savedThemeInLocalStorate?.replaceAll(`"`, "") || currentTheme}
						id="Profile-Theme"
						isFullWidth
						label="Tema"
						options={themeOptions}
						tooltipText="Tema para el sitio web. El modo automático, si es soportado por tu dispositivo, toma en cuenta tu horario local."
						ref={register()}
						name="theme"
					/>

					<Button
						isBlock
						isLoading={profile.loading}
						isDisabled={profile.loading || !formState.isDirty || !!Object.keys(errors).length}
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
