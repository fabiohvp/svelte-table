<script lang="ts">
	import Row from '$lib/Row.svelte';
	import Sort from '$lib/Sort.svelte';
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import Table from '$lib/Table.svelte';
	import { onMount } from 'svelte';
	import { getAll } from './server';
	import { sortString } from './sorting';

	let rows: any[] = [];
	let page = 0; //first page
	let pageSize = 3; //optional, 10 by default

	onMount(async () => {
		rows = await getAll();
	});

	function onCellClick(row: any) {
		alert(JSON.stringify(row));
	}

	function onSortString(event: CustomEvent) {
		event.detail.rows = sortString(event.detail.rows, event.detail.dir, event.detail.key);
	}

	function onSortNumber(event: CustomEvent) {
		event.detail.rows = sortString(event.detail.rows, event.detail.dir, event.detail.key);
	}
</script>

<Table {page} {pageSize} {rows} let:rows={rows2}>
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
		{#each rows2 as row, index (row)}
			<Row {index} on:click={() => onCellClick(row)}>
				<td data-label="Name">{row.name}</td>
				<td data-label="Lastname">{row.lastName}</td>
				<td data-label="Age">{row.age}</td>
			</Row>
		{/each}
	</tbody>
</Table>
