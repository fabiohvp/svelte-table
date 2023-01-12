import { sortNumberByKey, sortStringByKey, type SortParams } from '../../lib/sort.js';

const data = [
	{ name: 'a', lastName: 'o', age: 12 },
	{ name: 'b', lastName: 'n', age: 1 },
	{ name: 'c', lastName: 'm', age: 13 },
	{ name: 'd', lastName: 'l', age: 21 },
	{ name: 'e', lastName: 'k', age: 2 },
	{ name: 'f', lastName: 'j', age: 4 },
	{ name: 'g', lastName: 'i', age: 22 },
	{ name: 'h', lastName: 'h', age: 31 },
	{ name: 'i', lastName: 'g', age: 14 },
	{ name: 'j', lastName: 'f', age: 2 }
];

export function getAll(): Promise<any[]> {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			resolve(data);
		}, 250);
	});
}

export function getData(
	page: number,
	pageSize: number,
	sortingParams?: SortParams,
	text?: string
): Promise<any> {
	let originalData: any;

	if (sortingParams) {
		if (sortingParams.key === 'age') {
			originalData = sortNumberByKey(data, sortingParams.key, sortingParams.dir);
		} else {
			originalData = sortStringByKey(data, sortingParams.key, sortingParams.dir);
		}
	} else {
		originalData = data;
	}

	return new Promise((resolve, reject) => {
		setTimeout(function () {
			let rows = [];
			let totalFilteredRows = data.length;
			let totalRows = data.length;

			if (text && text.length > 0) {
				for (let i in originalData) {
					for (let j in originalData[i]) {
						if (originalData[i][j]?.toString().toLowerCase().indexOf(text) > -1) {
							rows.push(originalData[i]);
							break;
						}
					}
				}
				totalFilteredRows = rows.length;
				rows = rows.slice(page * pageSize, page * pageSize + pageSize);
			} else {
				rows = originalData.slice(page * pageSize);
			}
			resolve({ rows, totalFilteredRows, totalRows });
		}, 250);
	});
}
