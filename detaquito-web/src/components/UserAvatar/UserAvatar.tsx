import React from "react";

// Images
import DeTaquitoLogo from "assets/img/logo.png";

// Types
import { UserData } from "features/Auth/Auth.reducer";

interface UserAvatarProps {
	user: UserData;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
	console.log(user);
	return <div>USER AVATAR</div>;
};

export default React.memo(UserAvatar);
