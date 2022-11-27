export interface SortParams {
	key: string;
	dir: string;
}

export function sortString(rows: any[], params: SortParams) {
	return rows.sort((a, b) =>
		params.dir === 'desc'
			? ('' + a[params.key]).localeCompare(b[params.key])
			: ('' + b[params.key]).localeCompare(a[params.key])
	);
}

export function sortNumber(rows: any[], params: SortParams) {
	return rows.sort((a, b) =>
		params.dir === 'desc' ? a[params.key] - b[params.key] : b[params.key] - a[params.key]
	);
}
