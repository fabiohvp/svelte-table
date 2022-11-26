export const STATE_KEY = 'state';

export interface PaginationLabels {
	first?: string;
	last?: string;
	next?: string;
	previous?: string;
}

export interface SearchLabels {
	placeholder?: string;
}

export interface SortLabels {
	asc?: { title: string; html: string };
	desc?: { title: string; html: string };
	unsorted?: { title: string; html: string };
}

export interface TableLabels {
	empty?: string;
	loading?: string;
}

export interface State {
	getState: () => {
		labels: {
			pagination: PaginationLabels;
			search: SearchLabels;
			sort: SortLabels;
			table: TableLabels;
		};
		page: number;
		pageSize: number;
		rows: any[];
		filteredRows: any[];
	};
	setLabels: () => void;
	setPage: (_page: number) => void;
	setRows: (_rows: any[]) => void;
}
