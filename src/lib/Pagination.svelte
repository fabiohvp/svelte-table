<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { DEFAULT_TABLE_LABELS } from './constants';
	import type { PaginationEventArgs, PaginationLabels } from './interfaces';
	const dispatch = createEventDispatcher();

	export let buttons = [-2, -1, 0, 1, 2];
	export let labels: PaginationLabels = DEFAULT_TABLE_LABELS.pagination;
	export let page = 0;
	export let pageSize = 0;
	export let totalFilteredRows = 0;
	export let totalRows = 0;

	let pageCount = 0;
	let pageIndex = 0;
	let pageItemsCount = 0;

	$: {
		pageCount = Math.floor((totalFilteredRows - 1) / pageSize);
		pageIndex = page * pageSize;
		pageItemsCount = pageIndex + pageSize;
	}

	function onChange(event: MouseEvent, _page: number) {
		const detail: PaginationEventArgs = {
			originalEvent: event,
			page: _page
		};
		dispatch('pageChange', detail);

		if (!event.defaultPrevented) {
			page = _page;
		}
	}
</script>

<section class="pagination">
	<span
		>Showing {pageIndex} to {Math.min(pageItemsCount, totalFilteredRows)} of {totalFilteredRows}
		entries {#if totalFilteredRows !== totalRows}(filtered from {totalRows} total entries){/if}</span
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
			{#if page + button >= 0 && page + button <= pageCount}
				<li>
					<button
						class:active={page === page + button}
						on:click={(e) => onChange(e, page + button)}
					>
						{page + button + 1}
					</button>
				</li>
			{/if}
		{/each}
		<li>
			<button disabled={page > pageCount - 1} on:click={(e) => onChange(e, page + 1)}>
				{labels.next}
			</button>
		</li>
		<li>
			<button disabled={page >= pageCount} on:click={(e) => onChange(e, pageCount)}>
				{labels.last}
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
