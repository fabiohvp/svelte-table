<script lang="ts">
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import Row from '$lib/Row.svelte';
	import Sort from '$lib/Sort.svelte';
	import Table from '$lib/Table.svelte';
	import type { PaginationEventArgs, SearchEventArgs, SortEventArgs } from '$lib/interfaces';
	import { sortNumberByKey, sortStringByKey } from '$lib/sort';
	import { createTableStore } from '$lib/tableStore';
	import { onMount } from 'svelte';
	import type { IRow } from './IRow';
	import { getAll } from './server';

	const tableStore = createTableStore<IRow>({ pageSize: 3 });

	let originalRows: IRow[] = [];
	let rows: IRow[] = [];

	onMount(async () => {
		originalRows = rows = await getAll();
		tableStore.setRows(originalRows);
	});

	function onCellClick(row: IRow) {
		alert(JSON.stringify(row));
	}

	function onPageChange(event: CustomEvent<PaginationEventArgs>) {
		tableStore.paginate(event.detail.page, event.detail.pageSize);
	}

	function onSearch(event: CustomEvent<SearchEventArgs>) {
		const text = event.detail.text;

		if (!text) {
			tableStore.setRows(originalRows);
		} else {
			tableStore.search(text);
		}
	}

	function onSortString(event: CustomEvent<SortEventArgs>) {
		tableStore.sort(event.detail.key, event.detail.dir, sortStringByKey);
	}

	function onSortNumber(event: CustomEvent<SortEventArgs>) {
		tableStore.sort(event.detail.key, event.detail.dir, sortNumberByKey);
	}
</script>

<Table {...$tableStore} let:visibleRows on:pageChange={onPageChange} on:search={onSearch}>
	<thead slot="head">
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
