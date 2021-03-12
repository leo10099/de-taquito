import React from "react";

// Types
import { UserData } from "features/Auth/Auth.reducer";

// Icons
import { FaUserCircle } from "react-icons/fa";

// Styles
import { UserAvatarContainer } from "./UserAvatar.Styles";

interface UserAvatarProps {
	user?: UserData;
	url?: string | ArrayBuffer | null;
	margin?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ margin, url, user }) => {
	if (!user && !url) return null;

	if (user) {
		return (
			<UserAvatarContainer margin={margin}>
				{user.avatar ? <img src={user.avatar} alt={user.alias} /> : <FaUserCircle />}
			</UserAvatarContainer>
		);
	}

	if (url) {
		return (
			<UserAvatarContainer isPreview margin={margin}>
				<img src={url.toString()} alt="Vista Previa de Avatar" />
			</UserAvatarContainer>
		);
	}

	return null;
};

export default React.memo(UserAvatar);
