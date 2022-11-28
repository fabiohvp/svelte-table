export interface SortParams {
	key: string;
	dir: 'asc' | 'desc';
}

type SortNumberMethod = (a: number, b: number) => number;
type SortStringMethod = (a: string, b: string) => number;

const numberSortDict: { asc: SortNumberMethod; desc: SortNumberMethod } = {
	asc: (a: number, b: number) => (a > b ? 1 : -1),
	desc: (a: number, b: number) => (a > b ? -1 : 1)
};

const stringSortDict: { asc: SortStringMethod; desc: SortStringMethod } = {
	asc: (a: string, b: string) => a.localeCompare(b),
	desc: (a: string, b: string) => b.localeCompare(a)
};

export function sortString(rows: any[], params: SortParams) {
	const sortMethod = stringSortDict[params.dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(a[params.key], b[params.key]));
}

export function sortNumber(rows: any[], params: SortParams) {
	const sortMethod = numberSortDict[params.dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(a[params.key], b[params.key]));
}
