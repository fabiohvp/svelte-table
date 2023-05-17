import { filter } from '$lib/filter';
import { sortDateByKey, sortNumberByKey, type SortDirection } from '$lib/sort';
import type { IRow } from './IRow';

const originalData: IRow[] = [
	{ name: 'a', lastName: 'o', age: 1 },
	{ name: 'b', lastName: 'n', age: 2 },
	{ name: 'c', lastName: 'm', age: 23 },
	{ name: 'd', lastName: 'l', age: 11 },
	{ name: 'e', lastName: 'k', age: 132 },
	{ name: 'f', lastName: 'j', age: 152 },
	{ name: 'g', lastName: 'i', age: 4 },
	{ name: 'h', lastName: 'h', age: 432 },
	{ name: 'i', lastName: 'g', age: 41 },
	{ name: 'k', lastName: 'f', age: 432 },
	{ name: 'l', lastName: 'e', age: 552 }
];

export function getAll(): Promise<any[]> {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve(originalData);
		}, 250);
	});
}

export function getData(
	page: number,
	pageSize: number,
	text: string,
	sorting: { dir: SortDirection; key: string }
): Promise<{ rows: IRow[]; rowsCount: number }> {
	let data: IRow[] = [...originalData];

	if (sorting) {
		if (sorting.key === 'age') {
			data = sortNumberByKey(data, sorting.key, sorting.dir);
		} else {
			data = sortDateByKey(data, sorting.key, sorting.dir);
		}
	}

	return new Promise((resolve, _reject) => {
		setTimeout(function () {
			let rows = [];
			let rowsCount = data.length;

			if (text && text.length > 0) {
				rows = data.filter((row) => filter(row, text));
				rowsCount = rows.length; //need to count before slice
			} else {
				rows = data;
			}

			const pageIndex = page * pageSize;
			resolve({
				rows: rows.slice(pageIndex, pageIndex + pageSize),
				rowsCount
			});
		}, 250);
	});
}
