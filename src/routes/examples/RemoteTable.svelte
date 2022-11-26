<script lang="ts">
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import Table, { Pagination, Row, Search, Sort } from '$lib/Table.svelte';
	import { onMount } from 'svelte';
	import { getData } from './server';

	let rows: any[] = [];
	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 3; //optional, 10 by default

	let loading = true;
	let rowsCount = 0;
	let text: string;
	let sorting: { dir: string; key: string };

	onMount(async () => {
		await load(page);
	});

	async function load(_page: number) {
		loading = true;
		const data = await getData(_page, pageSize, text, sorting);
		rows = data.rows;
		rowsCount = data.rowsCount;
		loading = false;
	}

	function onCellClick(row: any) {
		alert(JSON.stringify(row));
	}

	function onPageChange(event: CustomEvent) {
		load(event.detail.page);
		page = event.detail.page;
	}

	async function onSearch(event: CustomEvent) {
		text = event.detail.text;
		await load(page);
		page = 0;
	}

	async function onSort(event: CustomEvent) {
		sorting = { dir: event.detail.dir, key: event.detail.key };
		await load(page);
	}
</script>

<Table {loading} {rows} {pageIndex} {pageSize} let:rows={rows2}>
	<div slot="top">
		<Search on:search={onSearch} />
	</div>
	<thead slot="head">
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
		{#each rows2 as row, index (row)}
			<Row {index} on:click={() => onCellClick(row)}>
				<td data-label="Name">{row.name}</td>
				<td data-label="Lastname">{row.lastName}</td>
				<td data-label="Age">{row.age}</td>
			</Row>
		{/each}
	</tbody>
	<div slot="bottom">
		<Pagination
			{page}
			{pageSize}
			count={rowsCount}
			serverSide={true}
			on:pageChange={onPageChange}
		/>
	</div>
</Table>
