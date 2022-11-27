import { derived, writable } from 'svelte/store';
import { DEFAULT_TABLE_LABELS } from './constants';
import type { TableStore } from './interfaces';

export function createTableStore({
	remote = false,
	rows = [],
	totalFilteredRows = 0,
	totalRows = 0,
	page = 0,
	pageSize = 10
}: Partial<{
	remote: boolean;
	rows: any[];
	totalFilteredRows: number;
	totalRows: number;
	page: number;
	pageSize: number;
}>): TableStore {
	rows = rows ?? [];
	const { subscribe, set, update } = writable(rows);
	const filteredRowsStore = writable(rows.slice());

	const pageStore = writable(page);
	const pageSizeStore = writable(pageSize);

	const remoteStore = writable(remote);

	const rowsStore = {
		subscribe,
		set: (rows: any[]) => {
			set(rows);
			filteredRowsStore.set(rows.slice());
		},
		update
	};

	const totalFilteredRowsStore = writable(totalFilteredRows);
	const totalRowsStore = writable(totalRows);

	const visibleRowsStore = derived(
		[filteredRowsStore, pageStore, pageSizeStore, remoteStore],
		([$filteredRows, $page, $pageSize, $remote]) => {
			let pageIndex = 0;

			if (!$remote) pageIndex = $page * $pageSize;

			const pageItemsCount = pageIndex + $pageSize;
			return $filteredRows.slice(pageIndex, pageItemsCount);
		}
	);

	return {
		filteredRows: filteredRowsStore,
		labels: writable({ ...DEFAULT_TABLE_LABELS }),
		loading: writable(false),
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
