<script lang="ts">
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import Pagination from '$lib/Pagination.svelte';
	import Row from '$lib/Row.svelte';
	import Search from '$lib/Search.svelte';
	import Sort from '$lib/Sort.svelte';
	import Table from '$lib/Table.svelte';
	import type { PaginationEventArgs, SearchEventArgs, SortEventArgs } from '$lib/interfaces';
	import { createTableStore } from '$lib/tableStore';
	import { onMount } from 'svelte';
	import type { IRow } from './IRow';
	import { getData } from './server';

	const tableStore = createTableStore<IRow>({ pageSize: 3 });

	let searchText: string;
	let sorting: SortEventArgs;

	onMount(async () => {
		load(0, searchText, sorting);
	});

	async function load(page: number, searchText: string, sorting: SortEventArgs) {
		tableStore.setLoading(true);

		const json = await getData(page, $tableStore.pageSize, searchText, sorting);
		tableStore.setRows(json.rows, json.rowsCount, false, page);
	}

	function onCellClick(row: IRow) {
		alert(JSON.stringify(row));
	}

	function onPageChange(event: CustomEvent<PaginationEventArgs>) {
		load(event.detail.page, searchText, sorting);
	}

	async function onSearch(event: CustomEvent<SearchEventArgs>) {
		searchText = event.detail.text;
		load(0, searchText, sorting);
	}

	async function onSort(event: CustomEvent<SortEventArgs>) {
		load($tableStore.page, searchText, event.detail);
	}
</script>

<Table local={false} {...$tableStore} let:visibleRows on:search={onSearch}>
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
		<Pagination {...$tableStore} on:pageChange={onPageChange} />
	</div>
</Table>
