<script lang="ts">
	import type { PaginationEventArgs, SearchEventArgs, SortEventArgs } from '$lib/interfaces';
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import Pagination from '$lib/Pagination.svelte';
	import Row from '$lib/Row.svelte';
	import Search from '$lib/Search.svelte';
	import Sort from '$lib/Sort.svelte';
	import { createTableStore } from '$lib/store';
	import Table from '$lib/Table.svelte';
	import { onMount } from 'svelte';
	import type { SortParams } from '../../lib/sort';
	import { getData } from './server';

	let store = createTableStore({ pageSize: 3, remote: true });
	const { loading, page, pageSize, rows, totalFilteredRows: totalFilteredRows, totalRows } = store;

	onMount(async () => {
		await load($page);
	});

	async function load(_page: number, sort?: SortParams, text?: string) {
		$loading = true;
		const data = await getData(_page, $pageSize, sort, text);

		$loading = false;
		$page = _page;
		$rows = data.rows;
		$totalFilteredRows = data.totalFilteredRows;
		$totalRows = data.totalRows;
	}

	function onCellClick(row: any) {
		alert(JSON.stringify(row));
	}

	function onPageChange(event: CustomEvent<PaginationEventArgs>) {
		load(event.detail.page);
	}

	async function onSearch(event: CustomEvent<SearchEventArgs>) {
		await load(0, undefined, event.detail.text);
	}

	async function onSort(event: CustomEvent<SortEventArgs>) {
		await load(0, event.detail);
	}
</script>

<Table {store} let:visibleRows>
	<div slot="top">
		<Search on:search={onSearch} />
	</div>
	<thead>
		<tr>
			<th>
				Name
				<Sort key="name" on:sort={onSort} />
			</th>
			<th>
				Lastname
				<Sort key="lastName" on:sort={onSort} />
			</th>
			<th>
				Age
				<Sort key="age" on:sort={onSort} />
			</th>
		</tr>
	</thead>
	<tbody>
		{#each visibleRows as row, index (row)}
			<Row {index} on:click={() => onCellClick(row)}>
				<td data-label="Name">{row.name}</td>
				<td data-label="Lastname">{row.lastName}</td>
				<td data-label="Age">{row.age}</td>
			</Row>
		{/each}
	</tbody>
	<div slot="bottom">
		<Pagination
			page={$page}
			pageSize={$pageSize}
			totalFilteredRows={$totalFilteredRows}
			totalRows={$totalRows}
			on:pageChange={onPageChange}
		/>
	</div>
</Table>
