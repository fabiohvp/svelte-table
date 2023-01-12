import { derived, get, writable } from 'svelte/store';
import { DEFAULT_TABLE_LABELS } from './constants';
import type { TableStore } from './interfaces';

export function createTableStore<T>({
	loading = false,
	remote = false,
	rows = [],
	totalFilteredRows = 0,
	totalRows = 0,
	page = 0,
	pageSize = 10
}: Partial<{
	loading: boolean;
	remote: boolean;
	rows: T[];
	totalFilteredRows: number;
	totalRows: number;
	page: number;
	pageSize: number;
}>): TableStore<T> {
	const originalRowsStore = writable(rows);
	const pageStore = writable(page);
	const pageSizeStore = writable(pageSize);

	const remoteStore = writable(remote);
	const rowsStore = writable(rows);

	const totalFilteredRowsStore = writable(totalFilteredRows);
	const totalRowsStore = writable(totalRows);

	const visibleRowsStore = derived(
		[pageStore, pageSizeStore, remoteStore, rowsStore],
		([$page, $pageSize, $remote, $rows]) => {
			let pageIndex = 0;

			if (!$remote) pageIndex = $page * $pageSize;

			const pageItemsCount = pageIndex + $pageSize;
			return $rows.slice(pageIndex, pageItemsCount);
		}
	);

	return {
		labels: writable({ ...DEFAULT_TABLE_LABELS }),
		loading: writable(loading),
		originalRows: originalRowsStore,
		page: pageStore,
		pageSize: pageSizeStore,
		remote: remoteStore,
		responsive: writable(true),
		rows: rowsStore,
		totalFilteredRows: totalFilteredRowsStore,
		totalRows: totalRowsStore,
		visibleRows: visibleRowsStore
	};
}

export function setFilteredRows<TData>(store: TableStore<TData>, rows: TData[]) {
	store.rows.set(rows);
	store.totalFilteredRows.set(rows.length);
}

export function setOriginalRows<TData>(store: TableStore<TData>, rows: TData[]) {
	store.originalRows.set(rows);
	store.rows.set(rows);
	store.totalFilteredRows.set(rows.length);
	store.totalRows.set(rows.length);
}

export function resetRows<TData>(store: TableStore<TData>) {
	const originalRows = get(store.originalRows);
	store.rows.set(originalRows);
	store.totalFilteredRows.set(originalRows.length);
	store.totalRows.set(originalRows.length);
}
