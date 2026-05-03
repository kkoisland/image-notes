export interface Diagram {
	id: string;
	title: string;
	filename: string;
	path: string;
	createdAt: string;
	categories?: string[];
	hidden?: boolean;
}

export interface DiagramNote {
	memo: string;
	done: boolean;
}
