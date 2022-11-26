import { sortNumber, sortString } from './sorting.js';

const data = [
	{ name: 'a', lastName: 'o', age: 12 },
	{ name: 'b', lastName: 'n', age: 1 },
	{ name: 'c', lastName: 'm', age: 13 },
	{ name: 'd', lastName: 'l', age: 21 },
	{ name: 'e', lastName: 'k', age: 2 },
	{ name: 'f', lastName: 'j', age: 4 }
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
	text: string,
	sorting: { dir: string; key: string }
): Promise<any> {
	let originalData: any;

	if (sorting) {
		if (sorting.key === 'age') {
			originalData = sortNumber(data, sorting.dir, sorting.key);
		} else {
			originalData = sortString(data, sorting.dir, sorting.key);
		}
	} else {
		originalData = data;
	}

	return new Promise((resolve, reject) => {
		setTimeout(function () {
			let rows = [];
			let rowsCount = data.length - 1;

			if (text && text.length > 0) {
				for (let i in originalData) {
					for (let j in originalData[i]) {
						if (originalData[i][j]?.toString().toLowerCase().indexOf(text) > -1) {
							rows.push(originalData[i]);
							break;
						}
					}
				}
				rowsCount = rows.length - 1;
			} else {
				console.log(page, pageSize);
				rows = originalData.slice(page * pageSize);
			}

			console.log(rowsCount);
			resolve({ rows: rows.slice(0, pageSize), rowsCount: rowsCount });
		}, 250);
	});
}
