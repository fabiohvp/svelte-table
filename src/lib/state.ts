export const STATE_KEY = 'state';

export interface State {
	getState: () => {
		page: number;
		pageIndex: number;
		pageSize: number;
		rows: any[];
		filteredRows: any[];
	};
	setPage: (_page: number, _pageIndex: number) => void;
	setRows: (_rows: any[]) => void;
}
