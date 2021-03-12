export interface ProfileFormData {
	alias?: string;
	fullName?: string;
	clubId?: number | string;
	avatar?: FileList;
	theme?: "dark" | "auto" | "light";
}
