<script lang="ts">
	import { DEFAULT_PAGINATION_LABELS } from '$lib/constants';
	import { createEventDispatcher } from 'svelte';
	import type { PaginationEventArgs, PaginationLabels } from './interfaces';

	const dispatch = createEventDispatcher();

	export let buttons = [-2, -1, 0, 1, 2];
	export let labels: PaginationLabels = DEFAULT_PAGINATION_LABELS;
	export let page = 0;
	export let pageSize: number;
	export let rowsCount: number;

	$: pageCount = Math.ceil(rowsCount / pageSize) - 1;
	$: pageIndex = page * pageSize;
	$: pageItemsCount = pageIndex + pageSize;

	function onChange(event: MouseEvent, _page: number) {
		const detail: PaginationEventArgs = {
			originalEvent: event,
			page: _page,
			pageSize: pageSize
		};
		dispatch('pageChange', detail);
	}
</script>

<section class="pagination">
	<span
		>Showing {pageIndex} to {pageItemsCount > rowsCount ? rowsCount : pageItemsCount} of {rowsCount}
		entries</span
	>

	<ul>
		<li>
			<button disabled={page === 0} on:click={(e) => onChange(e, 0)}>
				{labels.first}
			</button>
		</li>
		<li>
			<button disabled={page === 0} on:click={(e) => onChange(e, page - 1)}>
				{labels.previous}
			</button>
		</li>
		{#each buttons as button}
			{@const buttonNumber = page + button}
			{#if buttonNumber >= 0 && buttonNumber <= pageCount}
				<li>
					<button class:active={page === buttonNumber} on:click={(e) => onChange(e, buttonNumber)}>
						{buttonNumber + 1}
					</button>
				</li>
			{/if}
		{/each}
		<li>
			<button disabled={page >= pageCount} on:click={(e) => onChange(e, page + 1)}>
				{labels.next}
			</button>
		</li>
	</ul>
</section>

<style>
	.active {
		background-color: rgb(150, 150, 235);
		color: white;
	}

	.pagination {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	ul {
		float: right;
		list-style: none;
	}

	li {
		float: left;
	}

	button {
		background: transparent;
		border: 1px solid #ccc;
		padding: 5px 10px;
		margin-left: 3px;
		float: left;
		cursor: pointer;
	}
</style>
