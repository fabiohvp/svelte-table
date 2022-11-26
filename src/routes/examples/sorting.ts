export function sortString(rows: any[], dir: string, key: string) {
	return rows.sort((a, b) =>
		dir === 'asc' ? ('' + a[key]).localeCompare(b[key]) : ('' + b[key]).localeCompare(a[key])
	);
}

export function sortNumber(rows: any[], dir: string, key: string) {
	return rows.sort((a, b) => (dir === 'asc' ? a[key] - b[key] : b[key] - a[key]));
}
