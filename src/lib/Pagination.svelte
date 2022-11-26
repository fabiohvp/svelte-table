<script lang="ts">
	import { DEFAULT_PAGINATION_LABELS } from '$lib/constants';
	import { STATE_KEY, type PaginationLabels, type State } from '$lib/state';
	import { createEventDispatcher, getContext } from 'svelte';
	const dispatch = createEventDispatcher();
	const stateContext = getContext<State>(STATE_KEY);

	export let buttons = [-2, -1, 0, 1, 2];
	export let count: number;
	export let page = 0;
	export let pageSize: number;
	export let labels: PaginationLabels = DEFAULT_PAGINATION_LABELS;

	$: pageCount = Math.floor(count / pageSize);
	$: pageIndex = page * pageSize;
	$: pageItemsCount = pageIndex + pageSize;

	function onChange(event: MouseEvent, page: number) {
		const state = stateContext.getState();
		const detail = {
			originalEvent: event,
			page,
			pageSize: state.pageSize,
			preventDefault: false
		};
		dispatch('pageChange', detail);

		if (detail.preventDefault !== true) {
			stateContext.setPage(detail.page);
		}
	}
</script>

<section class="pagination">
	<span
		>Showing {pageIndex} to {pageItemsCount > count ? count : pageItemsCount} of {count} entries</span
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
