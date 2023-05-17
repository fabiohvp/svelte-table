export function getPaginationBoundaries(page: number, pageSize: number) {
	const start = page * pageSize;
	return {
		start,
		end: start + pageSize
	};
}

export function getPaginationRowIndex(index: number, page: number, pageSize: number) {
	return page * pageSize + index;
}
