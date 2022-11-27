import type { Readable, Writable } from 'svelte/store';

export interface PaginationEventArgs {
	originalEvent: MouseEvent;
	page: number;
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
}

export interface SearchLabels {
	placeholder: string;
}

export interface SortEventArgs {
	originalEvent: MouseEvent;
	key: string;
	dir: string;
}

export interface SortLabels {
	asc: { title: string; html: string };
	desc: { title: string; html: string };
	unsorted: { title: string; html: string };
}

export interface TableLabels {
	empty: string;
	loading: string;
	pagination: PaginationLabels;
	search: SearchLabels;
	sort: SortLabels;
}

export interface TableStore {
	filteredRows: Writable<any[]>;
	labels: Writable<TableLabels>;
	loading: Writable<boolean>;
	page: Writable<number>;
	pageSize: Writable<number>;
	remote: Writable<boolean>;
	responsive: Writable<boolean>;
	rows: Writable<any[]>;
	totalFilteredRows: Writable<number>;
	totalRows: Writable<number>;
	visibleRows: Readable<any[]>;
}
