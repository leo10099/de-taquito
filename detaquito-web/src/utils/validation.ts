export const emailPattern = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$", "i");

export const validSize = (file: FileList, limit: number) => {
	const FileSize = file[0].size / 1024 / 1024; // MB
	return FileSize <= limit;
};

export const validFormat = (file: FileList, accepted: string[]) => {
	const format = file[0].type.split("/").pop();
	if (!format) return false;

	return accepted.includes(format);
};
