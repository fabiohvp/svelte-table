import type { TableLabels } from './interfaces';

export const DEFAULT_TABLE_LABELS: TableLabels = {
	empty: 'No records available',
	loading: 'Loading data',
	pagination: {
		first: 'First',
		last: 'Last',
		next: 'Next',
		previous: 'Previous'
	},
	search: { placeholder: 'Search' },
	sort: {
		asc: { title: 'Ascending', html: '&#8593;' },
		desc: { title: 'Desceding', html: '&#8595;' },
		unsorted: { title: 'Unsorted', html: '&#8645;' }
	}
};
