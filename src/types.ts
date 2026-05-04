export interface Image {
	id: string;
	title: string;
	filename: string;
	path: string;
	createdAt: string;
	categories?: string[];
	hidden?: boolean;
}

export interface ImageNote {
	memo: string;
	done: boolean;
}
