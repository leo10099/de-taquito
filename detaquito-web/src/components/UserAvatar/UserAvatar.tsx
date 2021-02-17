import React from "react";

// Images
import deTaquitoLogo from "assets/img/logo.png";

// Types
import { UserData } from "features/Auth/Auth.reducer";

// Styles
import { UserAvatarContainer } from "./UserAvatar.Styles";

interface UserAvatarProps {
	user: UserData;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
	return (
		<UserAvatarContainer>
			<img src={user.avatar ? user.avatar : deTaquitoLogo} alt={user.alias} />
		</UserAvatarContainer>
	);
};

export default React.memo(UserAvatar);
