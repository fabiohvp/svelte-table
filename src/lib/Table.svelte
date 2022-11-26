<script lang="ts">
	import { DEFAULT_TABLE_LABELS } from '$lib/constants';
	import Pagination from '$lib/Pagination.svelte';
	import Search from '$lib/Search.svelte';
	import { STATE_KEY, type TableLabels } from '$lib/state';
	import { createEventDispatcher, setContext } from 'svelte';
	const dispatch = createEventDispatcher();

	export let loading = false;
	export let page = 0;
	export let pageIndex = 0;
	export let pageSize = 10;
	export let responsive = true;
	export let rows: any[];
	export let serverSide = false;
	export let labels: TableLabels = DEFAULT_TABLE_LABELS;

	$: filteredRows = rows;
	$: visibleRows = filteredRows.slice(pageIndex, pageIndex + pageSize);

	setContext(STATE_KEY, {
		getState: () => ({
			page,
			pageIndex,
			pageSize,
			rows,
			filteredRows
		}),
		setPage: (_page: number, _pageIndex: number) => {
			page = _page;
			pageIndex = _pageIndex;
		},
		setRows: (_rows: any[]) => (filteredRows = _rows)
	});

	function onPageChange(event: CustomEvent) {
		dispatch('pageChange', event.detail);
	}

	function onSearch(event: CustomEvent) {
		dispatch('search', event.detail);
	}
</script>

<slot name="top">
	<div class="slot-top">
		<svelte:component this={Search} on:search={onSearch} />
	</div>
</slot>

<table class={'table ' + $$props.class} class:responsive>
	<slot name="head" />
	{#if loading}
		<tbody>
			<tr>
				<td class="center" colspan="100">
					<span>
						{@html labels.loading}
					</span>
				</td>
			</tr>
		</tbody>
	{:else if visibleRows.length === 0}
		<tbody>
			<tr>
				<td class="center" colspan="100">
					<span>
						{@html labels.empty}
					</span>
				</td>
			</tr>
		</tbody>
	{:else}
		<slot rows={visibleRows} />
	{/if}
	<slot name="foot" />
</table>

<slot name="bottom">
	<div class="slot-bottom">
		<svelte:component
			this={Pagination}
			{page}
			{pageSize}
			{serverSide}
			count={filteredRows.length - 1}
			on:pageChange={onPageChange}
		/>
	</div>
</slot>

<style>
	.table {
		width: 100%;
		border-collapse: collapse;
	}

	.table :global(th) {
		position: relative;
	}

	.table :global(td) {
		position: relative;
		padding: 0.3em 0.3em;
	}

	.center {
		text-align: center;
		font-style: italic;
	}

	.center > span {
		padding: 10px 10px;
		float: left;
		width: 100%;
	}

	.slot-top,
	.slot-bottom {
		float: left;
		width: 100%;
		margin-top: 1em;
	}

	@media screen and (max-width: 767px) {
		table.responsive {
			border: 0;
		}

		table.responsive :global(thead) {
			border: none;
			clip: rect(0 0 0 0);
			height: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
			width: 1px;
		}

		table.responsive :global(tr) {
			border-bottom: 2px solid #ddd;
			display: block;
			padding-bottom: 0.3em;
			margin-bottom: 0.3em;
		}

		table.responsive :global(td) {
			border-bottom: 1px solid #ddd;
			display: block;
			font-size: 0.8em;
			text-align: right;
		}

		table.responsive :global(td::before) {
			/*
	* aria-label has no advantage, it won't be read inside a table content: attr(aria-label);
	*/
			content: attr(data-label);
			float: left;
			font-weight: bold;
		}

		table.responsive :global(td[data-label-normal]::before) {
			font-weight: normal;
		}

		table.responsive :global(td[data-label-upper]::before) {
			text-transform: uppercase;
		}

		table.responsive :global(td:last-child) {
			border-bottom: 0;
		}
	}
</style>
