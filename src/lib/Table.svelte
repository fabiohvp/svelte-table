<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { TableStore } from './interfaces';
	import Pagination from './Pagination.svelte';
	import Search from './Search.svelte';
	const dispatch = createEventDispatcher();

	export let store: TableStore<any>;
	const { labels, loading, page, pageSize, responsive, totalFilteredRows, totalRows, visibleRows } =
		store;

	function onPageChange(event: CustomEvent) {
		dispatch('pageChange', event.detail);
	}

	function onSearch(event: CustomEvent) {
		dispatch('search', event.detail);
	}
</script>

<slot name="top">
	<div class="slot-top">
		<svelte:component this={Search} labels={$labels.search} on:search={onSearch} />
	</div>
</slot>

<table class={'table ' + $$props.class} class:responsive={$responsive}>
	<slot name="head" />
	{#if $loading}
		<tbody>
			<tr>
				<td class="center" colspan="100">
					<span>
						{@html $labels.loading}
					</span>
				</td>
			</tr>
		</tbody>
	{:else if $visibleRows.length === 0}
		<tbody>
			<tr>
				<td class="center" colspan="100">
					<span>
						{@html $labels.empty}
					</span>
				</td>
			</tr>
		</tbody>
	{:else}
		<slot visibleRows={$visibleRows} />
	{/if}
	<slot name="foot" />
</table>

<slot name="bottom">
	<div class="slot-bottom">
		<svelte:component
			this={Pagination}
			bind:page={$page}
			pageSize={$pageSize}
			totalFilteredRows={$totalFilteredRows}
			totalRows={$totalRows}
			labels={$labels.pagination}
			on:pageChange={onPageChange}
		/>
	</div>
</slot>

<style>
	:root {
		--border-color: #eee;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
	}

	.table > :global(tbody) {
		border-bottom: 1px solid var(--border-color);
		border-top: 1px solid var(--border-color);
	}

	.table :global(th),
	.table :global(td) {
		position: relative;
		padding: 0.5rem 0.5rem;
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
