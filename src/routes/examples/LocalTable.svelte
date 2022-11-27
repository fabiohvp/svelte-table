<script lang="ts">
	import { filter } from '$lib/filter';
	import type { PaginationEventArgs, SearchEventArgs, SortEventArgs } from '$lib/interfaces';
	import Row from '$lib/Row.svelte';
	import Sort from '$lib/Sort.svelte';
	import { createTableStore } from '$lib/store';
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import Table from '$lib/Table.svelte';
	import { onMount } from 'svelte';
	import { sortNumber, sortString } from '../../lib/sort';
	import { getAll } from './server';

	interface SortHistory {
		[key: string]: () => void;
	}

	const store = createTableStore({ pageSize: 3 });
	const { filteredRows, page, rows, totalFilteredRows, totalRows } = store;
	const sortHistory: SortHistory = {};

	onMount(async () => {
		$rows = await getAll();
		$totalFilteredRows = $rows.length;
		$totalRows = $rows.length;
	});

	function onCellClick(row: any) {
		alert(JSON.stringify(row));
	}

	function onPageChange(event: CustomEvent<PaginationEventArgs>) {
		Object.keys(sortHistory).forEach((key) => sortHistory[key]());
	}

	function onSearch(event: CustomEvent<SearchEventArgs>) {
		$filteredRows = $rows.filter((row) => filter(row, event.detail.text));
		$totalFilteredRows = $filteredRows.length;

		Object.keys(sortHistory).forEach((key) => sortHistory[key]());
	}

	function onSortString(event: CustomEvent<SortEventArgs>) {
		const sort = () => ($filteredRows = sortString($filteredRows, event.detail));
		sortHistory[event.detail.key] = sort;
		sort();
	}

	function onSortNumber(event: CustomEvent<SortEventArgs>) {
		const sort = () => ($filteredRows = sortNumber($filteredRows, event.detail));
		sortHistory[event.detail.key] = sort;
		sort();
	}
</script>

<Table {store} let:visibleRows on:pageChange={onPageChange} on:search={onSearch}>
	<thead>
		<tr>
			<th>
				Name
				<Sort key="name" on:sort={onSortString} />
			</th>
			<th>
				Lastname
				<Sort key="lastName" on:sort={onSortString} />
			</th>
			<th>
				Age
				<Sort key="age" on:sort={onSortNumber} />
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
</Table>
