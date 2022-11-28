export function filter(row: any, text: string) {
	const keys = Object.keys(row);

	for (let k of keys) {
		if ((row[k] || '').toString().toLowerCase().indexOf(text) > -1) {
			return true;
		}
	}
	return false;
}
