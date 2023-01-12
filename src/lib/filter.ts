export function filter(row: any, text: string) {
	text = text.toLocaleLowerCase();
	const keys = Object.keys(row);

	for (let k of keys) {
		if ((row[k] || '').toString().toLocaleLowerCase().indexOf(text) > -1) {
			return true;
		}
	}
	return false;
}
