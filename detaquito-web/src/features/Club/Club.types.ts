export interface Club {
	id: number;
	name: string;
	logoUrl?: string;
	competition: {
		country: string;
		id: number;
		name: string;
	};
}
