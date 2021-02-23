import React from "react";

// Types
import { UserData } from "features/Auth/Auth.reducer";

// Icons
import { FaUserCircle } from "react-icons/fa";

// Styles
import { UserAvatarContainer } from "./UserAvatar.Styles";

interface UserAvatarProps {
	user: UserData;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
	return (
		<UserAvatarContainer>
			{user.avatar ? <img src={user.avatar} alt={user.alias} /> : <FaUserCircle />}
		</UserAvatarContainer>
	);
};

export default React.memo(UserAvatar);
