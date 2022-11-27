export function filter(row: any, text: string) {
	text = text.toLowerCase();
	for (let i in row) {
		if ((row[i] ?? '').toString().toLowerCase().indexOf(text) > -1) {
			return true;
		}
	}
	return false;
}
