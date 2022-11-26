<script lang="ts" context="module">
	export interface SearchLabels {
		placeholder?: string;
	}

	let globalLabels: SearchLabels;

	export function setLabels(labels: SearchLabels) {
		globalLabels = labels;
	}
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { STATE_KEY, type State } from './state';
	const dispatch = createEventDispatcher();
	const stateContext = getContext<State>(STATE_KEY);

	export let filter = (row: any, text: string, index: number) => {
		text = text.toLowerCase();
		for (let i in row) {
			if ((row[i] || '').toString().toLowerCase().indexOf(text) > -1) {
				return true;
			}
		}
		return false;
	};
	export let index = -1;
	export let text = '';

	export let labels: SearchLabels = {
		placeholder: 'Search',
		...globalLabels
	};

	async function onSearch(event: KeyboardEvent) {
		const state = stateContext.getState();
		const detail = {
			originalEvent: event,
			filter,
			index,
			text,
			page: state.page,
			pageIndex: state.pageIndex,
			pageSize: state.pageSize,
			preventDefault: false,
			rows: state.filteredRows
		};
		dispatch('search', detail);

		if (detail.preventDefault !== true) {
			if (detail.text.length === 0) {
				stateContext.setRows(state.rows);
			} else {
				stateContext.setRows(detail.rows.filter((r) => detail.filter(r, detail.text, index)));
			}
			stateContext.setPage(0, 0);
		} else {
			stateContext.setRows(detail.rows);
		}
	}
</script>

<div class="search">
	<input
		type="search"
		title={labels.placeholder}
		placeholder={labels.placeholder}
		bind:value={text}
		on:keyup={onSearch}
	/>
</div>

<style>
	.search {
		width: 33.3%;
		float: right;
	}
	.search input {
		width: 100%;
		border: 1px solid #eee;
		border-radius: 3px;
		padding: 5px 3px;
	}

	@media screen and (max-width: 767px) {
		.search {
			width: 100%;
		}
	}
</style>
