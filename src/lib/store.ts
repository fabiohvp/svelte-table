import { derived, writable } from 'svelte/store';
import { DEFAULT_TABLE_LABELS } from './constants';
import type { TableStore } from './interfaces';

export function createTableStore<T>({
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
}>): TableStore<T> {
	rows = rows ?? [];
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
