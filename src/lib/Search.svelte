<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { DEFAULT_TABLE_LABELS } from './constants';
	import type { SearchEventArgs, SearchLabels } from './interfaces';
	const dispatch = createEventDispatcher();

	export let index = -1;
	export let labels: SearchLabels = DEFAULT_TABLE_LABELS.search;
	export let text = '';

	async function onSearch(event: KeyboardEvent) {
		const detail: SearchEventArgs = {
			originalEvent: event,
			index,
			text
		};
		dispatch('search', detail);
	}
</script>

<section class="search">
	<input
		type="search"
		title={labels.placeholder}
		placeholder={labels.placeholder}
		bind:value={text}
		on:keyup={onSearch}
	/>
</section>

<style>
	.search {
		width: 33.3%;
		float: right;
		margin-top: 1rem;
		margin-bottom: 1rem;
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
