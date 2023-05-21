import type { SortDirection, SortEventArgs } from './interfaces';

type SortNumberMethod = (a: number, b: number) => number;
type SortStringMethod = (a: string, b: string) => number;

const sortNumberDict: { asc: SortNumberMethod; desc: SortNumberMethod } = {
	asc: (a: number, b: number) => (a > b ? 1 : -1),
	desc: (a: number, b: number) => (a > b ? -1 : 1)
};

const sortStringDict: { asc: SortStringMethod; desc: SortStringMethod } = {
	asc: (a: string, b: string) => a?.localeCompare(b),
	desc: (a: string, b: string) => b?.localeCompare(a)
};

export type SortFunction<T> = (rows: T[], key: string, dir: SortDirection) => T[];

export function getSortAttributes(key: string, currentSorting: SortEventArgs) {
	return {
		key,
		dir: (currentSorting?.key === key ? currentSorting.dir : 'none') as SortDirection
	};
}

export function sortDateBy<T>(rows: T[], getValue: (row: T) => Date, dir: SortDirection) {
	const sortMethod = sortNumberDict[dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(getValue(a).getTime(), getValue(b).getTime()));
}

export function sortNumberBy<T>(rows: T[], getValue: (row: T) => number, dir: SortDirection) {
	const sortMethod = sortNumberDict[dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(getValue(a), getValue(b)));
}

export function sortStringBy<T>(rows: T[], getValue: (row: T) => string, dir: SortDirection) {
	const sortMethod = sortStringDict[dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(getValue(a), getValue(b)));
}

export function sortDateByKey(rows: any[], key: string, dir: SortDirection) {
	const sortMethod = sortNumberDict[dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(a[key], b[key]));
}

export function sortNumberByKey(rows: any[], key: string, dir: SortDirection) {
	const sortMethod = sortNumberDict[dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(a[key], b[key]));
}

export function sortStringByKey(rows: any[], key: string, dir: SortDirection) {
	const sortMethod = sortStringDict[dir ?? 'asc'];
	return rows.sort((a, b) => sortMethod(a[key], b[key]));
}
