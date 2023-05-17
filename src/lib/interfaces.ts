import type { SortDirection } from './sort';

export interface PaginationEventArgs {
	originalEvent: MouseEvent;
	page: number;
	pageSize: number;
}

export interface PaginationLabels {
	first: string;
	last: string;
	next: string;
	previous: string;
}

export interface RowEventArgs {
	originalEvent: MouseEvent;
	index: number;
}

export interface SearchEventArgs {
	originalEvent: KeyboardEvent;
	index: number;
	text: string;
	type: string;
}

export interface SearchLabels {
	placeholder: string;
}

export interface SortEventArgs {
	originalEvent: MouseEvent;
	key: string;
	dir: SortDirection;
	type: string;
}

export interface SortLabels {
	asc: { title: string; html: string };
	desc: { title: string; html: string };
	unsorted: { title: string; html: string };
}

export interface TableLabels {
	empty: string;
	loading: string;
}
