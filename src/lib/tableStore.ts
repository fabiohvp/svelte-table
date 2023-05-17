import { filter } from '$lib/filter';
import { getPaginationBoundaries, getPaginationRowIndex } from '$lib/functions';
import { sortNumberByKey, sortStringByKey, type SortDirection, type SortFunction } from '$lib/sort';
import { writable, type Readable } from 'svelte/store';

export type TableData<T> = {
	loading: boolean;
	page: number;
	pageSize: number;
	rows: T[];
	rowsCount: number;
};

export type TableStore<T> = Readable<TableData<T>> & ReturnType<typeof createTableStore<T>>;

export function createTableStore<T>(initialState: Partial<TableData<T>> = {}) {
	const { update, subscribe } = writable({
		loading: false,
		page: 0,
		pageSize: 10,
		rows: [],
		rowsCount: 0,
		...initialState
	});

	return {
		subscribe,
		update,

		getPaginationBoundaries: () => {
			let page = 0;
			let pageSize = 0;
			subscribe((s) => {
				(page = s.page), (pageSize = s.pageSize);
			})();
			return getPaginationBoundaries(page, pageSize);
		},

		getPaginationRowIndex: (index: number) => {
			let page = 0;
			let pageSize = 0;
			return getPaginationRowIndex(index, page, pageSize);
		},

		paginate: (page: number, pageSize?: number) => {
			update((s) => ({
				...s,
				page,
				pageSize: pageSize ?? s.pageSize
			}));
		},

		search: (text: string) => {
			update((s) => ({
				...s,
				page: 0,
				rows: s.rows.filter((row) => filter(row, text))
			}));
		},

		setLoading: (loading: boolean) => {
			update((s) => ({
				...s,
				loading
			}));
		},

		setRows: (rows: T[], rowsCount: number | undefined = undefined, loading = false, page = 0) => {
			update((s) => ({
				...s,
				loading,
				page,
				rows,
				rowsCount: rowsCount ?? rows.length
			}));
		},

		sort: (
			key: string,
			dir: SortDirection,
			typeOrFn: 'string' | 'number' | string | SortFunction<T> = 'string'
		) => {
			if (typeof typeOrFn === 'function') {
				update((s) => ({
					...s,
					rows: typeOrFn(s.rows, key, dir)
				}));
			} else if (typeOrFn === 'string') {
				update((s) => ({
					...s,
					rows: sortStringByKey(s.rows, key, dir)
				}));
			} else if (typeOrFn === 'number') {
				update((s) => ({
					...s,
					rows: sortNumberByKey(s.rows, key, dir)
				}));
			} else {
				throw Error('Sorting type or function is undefined');
			}
		},

		updateRow: (data: T, index: number) => {
			update((s) => {
				s.rows[index] = data;
				return s;
			});
		}
	};
}
