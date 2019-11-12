# Svelte-table
the purpose of this component is to be a reausable html table wrapper without needing to coding too much javascript.

```
<script>
	import Table, { Row /*, Search */ } from "@fabiohvp/svelte-table";
	
	const rows = [
		{name: 'a', age:12}, 
		{name: 'b', age: 10}, 
		{name: 'c', age: 13}, 
		{name: 'd', age: 21}, 
		{name: 'e', age: 11}
	];
	
	let page = 0; //first page
	let pageSize = 2; //optional, 10 by default
	
	function cellOnClick(row) { //just sample
		console.log(row);
	}
</script>

<Table bind:page rows={rows} {pageSize} let:rows={rows2}>
	<thead slot="head">
		<tr>
			<td>Name</td>
			<td>Age</td>
		</tr>
	</thead>
	<tbody>
		{#each rows2 as row, index (row)}
			<Row {index} on:click={() => cellOnClick(row)}>
				<td>{row.name}</td>
				<td>{row.age}</td>
			</Row>
		{/each}
	</tbody>
</Table>
```

## Advanced
* You can add components to the top or bottom slots.
* Adding top slot will override the default content (Search component) but you can still use it adding the Search component inside your custom slot.
* You can change the default search method by adding an on:search event on Search component.
* Row component is optional and only serves to render odd/even row, you can use <tr> instead.
